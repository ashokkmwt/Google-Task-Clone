import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';

export default function Login() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result.user);
      navigate('/dashboard')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div onClick={GoogleLogin}>hello</div>
  )
}
