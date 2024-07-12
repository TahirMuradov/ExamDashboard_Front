'use client'

import Loader from '@/components/Loader/Loader';
import SideBar from '@/components/Sidebar/SideBar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status]);

  if (status === 'loading') {
    return <Loader />;
  }

  if (session) {
    return (
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="">
            <div className="flex h-screen overflow-hidden">
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
             
              <SideBar />
                <div class="p-4 sm:ml-64">
  
                {loading ? <Loader /> : children}
</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return null;
};

export default Layout;
