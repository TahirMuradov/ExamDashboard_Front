import Register from "@/components/Register"
import Link from "next/link"


const page = () => {
  return (<>
    <Register/>
  <Link href="/auth/login" className='bg-green-500 rounded p-1 inline-block my-3 text-center'>Go To Login</Link>
  </>
  )
}

export default page