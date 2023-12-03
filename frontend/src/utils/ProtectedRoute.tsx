import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { getLocalStorageItem } from '@/shared/localStorageHelper';

const ProtectedRoute: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkUserToken =()=>{
    const userToken = getLocalStorageItem('access_token');
    if (!userToken | userToken === 'undefined') {
      setIsLoggedIn(false);
      return router.push('/signin')
    } else {
      setIsLoggedIn(true);
    }
  }
  }

  return <div>Something</div>
};

export default ProtectedRoute;
