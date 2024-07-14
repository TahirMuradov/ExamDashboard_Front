import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const LogOut = () => {
  const router = useRouter();
const session=useSession();
if(session){

      const handleLogout = async () => {
        await signOut({ redirect: false });
        router.push('/');
      };
  
      
  
  
    return (
      <button onClick={()=>handleLogout()}>Log out</button>
    );
}else{
    return null;
}
};

export default LogOut;
