"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Loader from './Loader/Loader';

const Register = () => {

  let {data:session,status}=useSession();
  const route=useRouter();
    if (status=="loading") {
      return (<Loader/>)
    }else if(status=="authenticated"){

      history.back();
      return null;
    }

        const handleRegister = async () => {
            try {
              
                const formData = new FormData(document.getElementById('registerForm'));
                const registerData = {
                    firstname: formData.get('firstname'),
                    lastname: formData.get('lastname'),
                    email: formData.get('email'),
                    username: formData.get('username'),
                    password: formData.get('password'),
                    confirmPassword: formData.get('confirmPassword')
                };
    
                const response = await fetch('https://localhost:7268/api/Auth/Register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${your_access_token}`
                    },
                    body: JSON.stringify(registerData)
                });
    
           
    
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to create exam');
                }
    
                swal({
                    title: 'Qeyydiyyatdan Kecdiniz!',
                    text: '',
                    icon: 'success',
                }).then((action)=>{
                    if  (action){
                        route.push('/auth/login')
                        document.getElementById('registerForm').reset();
                    }
                                });
    
            } catch (error) {
                swal({
                    title: 'Yaradila bilmədi!',
                    text: error.message,
                    icon: 'error',
                }).then((action)=>{
    if  (action){
        document.getElementById('registerForm').reset();
    }
                });
            }
        };
   
  return (
    <form id='registerForm' className='text-center p-3' onSubmit={handleRegister}>
           <div className='my-4'>
      <label>First Name:</label>
      <input
        className='bg-slate-600'
        type="text"       
       name='firstname'
        required
      />
    </div>
           <div className='my-4'>
      <label>Last Name:</label>
      <input
            className='bg-slate-600'
        type="text"       
       name='lastname'
        required
      />
    </div>
         <div className='my-4'>
      <label>Email:</label>
      <input
     className='bg-slate-600'
        type="email"       
       name='email'
        required
      />
    </div>
    <div className='my-4'>
      <label>Username:</label>
      <input
            className='bg-slate-600'
        type="text"       
       name='username'
        required
      />
    </div>
    <div className='my-4'>
      <label>Password:</label>
      <input
        className='bg-slate-600'
        type="password"
           name='password'
        required
      />
    </div>
    <div className='my-4'>
      <label>Confirm Password:</label>
      <input
      name='confirmPassword'
       className='bg-slate-600'
        type="password"
             
        required
      />
    </div>
    <button className='bg-green-500 p-1 rounded' type="submit">Register</button>
  </form>
  )
}

export default Register