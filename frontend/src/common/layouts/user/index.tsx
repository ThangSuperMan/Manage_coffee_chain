import React from 'react';
import PublicNavbar from '@/components/public/PublicNavbar';
import Footer from '@/components/shared/Footer';

interface Props {
  children: React.ReactNode;
}

const UserLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="user-layout">
      <PublicNavbar />
      {children}
      <Footer />
    </div>
  );
};

export default UserLayout;
