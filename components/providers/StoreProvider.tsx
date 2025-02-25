'use client';

import { Provider } from 'react-redux';
import { store, persistedStore } from '@/lib/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        {children}
      </PersistGate>
    </Provider>);
}
