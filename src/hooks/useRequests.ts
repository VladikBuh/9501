import { useState } from 'react';
import { RoomRequest, Priority, RequestCategory } from '../types';
import { initialRequests } from '../data/roomRequests';

let _requests = [...initialRequests];
let _listeners: Array<() => void> = [];

const notify = () => _listeners.forEach(fn => fn());

export const useRequests = () => {
  const [requests, setRequests] = useState<RoomRequest[]>(_requests);

  const subscribe = (fn: () => void) => {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter(l => l !== fn); };
  };

  const submitRequest = (
    category: RequestCategory,
    subject: string,
    description: string,
    priority: Priority,
  ): string => {
    const id = `REQ-2024-${String(_requests.length + 10).padStart(3, '0')}`;
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      + ' at ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const newReq: RoomRequest = {
      id,
      category: category.title,
      categoryIcon: category.icon,
      subject: subject || category.title,
      description,
      priority,
      status: 'Submitted',
      submittedAt: formatted,
      estimatedTime: category.estimatedTime,
    };
    _requests = [newReq, ..._requests];
    setRequests([..._requests]);
    notify();

    // Simulate status progression
    setTimeout(() => {
      _requests = _requests.map(r => r.id === id ? { ...r, status: 'Accepted' } : r);
      setRequests([..._requests]);
      notify();
    }, 8000);
    setTimeout(() => {
      _requests = _requests.map(r => r.id === id ? { ...r, status: 'In Progress', staffName: 'Maria S.' } : r);
      setRequests([..._requests]);
      notify();
    }, 20000);

    return id;
  };

  return { requests, submitRequest };
};
