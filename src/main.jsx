import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import './index.css'
import store from './store'
import { verifyToken } from './store/actions/thunks'
import { setUser } from './store/reducers/clientReducer'

// Check if there's a token in localStorage and verify it
const token = localStorage.getItem('token')
if (token) {
  store.dispatch(verifyToken())
    .then(userData => {
      if (userData) {
        store.dispatch(setUser(userData.user))
      }
    })
    .catch(() => {
      // Token is invalid, it was already removed in the thunk
      console.log('Token verification failed')
      // Kullanıcıya bilgi ver
      setTimeout(() => {
        toast.info('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.', {
          position: "top-center",
          autoClose: 5000
        });
      }, 1000);
    })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </Provider>
  </React.StrictMode>,
) 