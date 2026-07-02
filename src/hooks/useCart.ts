import { useState } from 'react';
import { CartItem, MenuItem } from '../types';

let _cart: CartItem[] = [];
let _listeners: Array<() => void> = [];
const notify = () => _listeners.forEach(fn => fn());

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(_cart);

  const addItem = (item: MenuItem, notes = '') => {
    const existing = _cart.find(c => c.item.id === item.id);
    if (existing) {
      _cart = _cart.map(c =>
        c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
      );
    } else {
      _cart = [..._cart, { item, quantity: 1, notes }];
    }
    setCart([..._cart]);
    notify();
  };

  const removeItem = (itemId: string) => {
    _cart = _cart.filter(c => c.item.id !== itemId);
    setCart([..._cart]);
    notify();
  };

  const updateQuantity = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    _cart = _cart.map(c =>
      c.item.id === itemId ? { ...c, quantity: qty } : c,
    );
    setCart([..._cart]);
    notify();
  };

  const clearCart = () => {
    _cart = [];
    setCart([]);
    notify();
  };

  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);
  const subtotal = cart.reduce((s, c) => s + c.item.price * c.quantity, 0);
  const serviceFee = parseFloat((subtotal * 0.12).toFixed(2));
  const taxes = parseFloat((subtotal * 0.13).toFixed(2));
  const total = parseFloat((subtotal + serviceFee + taxes).toFixed(2));

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    serviceFee,
    taxes,
    total,
  };
};
