import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return <div className="admin-layout">{children}</div>;
};

export default AdminLayout;
