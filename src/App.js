import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { login, logout } from './features/userSlice'
import { auth, onAuthStateChanged } from './firebase'
import SignInSide from './views/LoginForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Unauthorized from './views/Unauthorized'
import Home from './views/Home'
import Logs from './views/Logs'
import RequireAuth from './components/RequireAuth'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            role: 'admin',
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    console.log('page loaded')
  }, [dispatch])

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/login' element={<SignInSide />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path='/' element={<Home />} />
            <Route path='/logs' element={<Logs />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
