import LoginPage from '@/components/Login'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (<>
    <LoginPage/>
  <Link href='/auth/register' className='bg-yellow-500 p-1 rounded my-3 inline-block'>Register</Link>
  </>
  )
}

export default page