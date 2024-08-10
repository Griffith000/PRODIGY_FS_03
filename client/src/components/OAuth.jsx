import React from 'react'
import { GoogleAuthProvider, signInWithPopup ,getAuth} from 'firebase/auth'
import{app} from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'
 const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOAuth = async () => {
        try{
           const provider = new GoogleAuthProvider()
           const auth = getAuth(app)
           const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL
                })
            })
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/')
        }
        catch(error){
            console.log("Could not sign in with Google")
        }
    }
  return (
        <button type='button' onClick={handleOAuth} className='w-full mb-4 py-3 px-8 rounded  bg-red-600 uppercase text-white hover:opacity-85 hover:transition'>Sign in with Google</button>
  )

}
export default OAuth