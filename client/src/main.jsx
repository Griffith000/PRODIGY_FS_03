import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './redux/store.js'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.js'
import toast, { Toaster } from 'react-hot-toast';

export const signInValide= () => toast.success('Sign in successful');
export const signInError= () => toast.error('Sign in failed');
export const addSuccess= () => toast.success('Item added to cart');
export const addError= () => toast.error('could not add item to cart');
export const removeSuccess= () => toast.success('Item removed from cart');
export const removeError= () => toast.error('could not remove item from cart');
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
    <App />
    <Toaster />
    </PersistGate>
  </Provider>,
)
