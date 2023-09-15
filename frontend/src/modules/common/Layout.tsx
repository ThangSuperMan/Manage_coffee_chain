'use client'

import React, { useState } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

interface Props {
  children: React.ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {children}
    </div>
  );
};

export default Layout;
