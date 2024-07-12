'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
      return null;
    }
  }, [status]);

  const handleSubmit = async (event) => {
    event.preventDefault();
   let siningResponse= await signIn('credentials', {
      username,
      password,
      redirect: false,
    });
    console.log(siningResponse)
    if (!siningResponse.ok) {
      swal({
icon:"error",
text:`${siningResponse.status}`,
title:"Error",
      })
    }
  };

  if (session) {
 router.push("/dashboard")
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
           className='text-black'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className='text-black'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='bg-green-500 rounded p-1'>Login</button>
        
      </form>
    );
  }
};

export default LoginPage;


