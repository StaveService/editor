import React, { useEffect } from 'react';
import { Color, Titlebar } from 'custom-electron-titlebar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { persistor, store } from './store';
import './App.global.css';

export default function App() {
  useEffect(() => {
    const titleBar = new Titlebar({
      backgroundColor: Color.fromHex('#5B5B5B'),
    });
    titleBar.updateTitle('Stave Editor');
    return () => {
      titleBar.dispose();
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
