'use client';

import React from 'react';
import Providers from '@/redux/provider';
import { Center, ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import UserLayout from '@/common/layouts/user';
import 'react-quill/dist/quill.snow.css';
import Category from '@/components/public/Category';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/modules/common/Layout';

const theme = extendTheme({
  colors: {
    primary: '#EA8025',
  },
});

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const pathsToCheck = ['/signin', '/signup'];
  const isApplyCommonLayout: boolean = pathsToCheck.some((path: string) => pathname.includes(path));
  const isProductsPage: boolean = pathname.includes('/collections');
  const isAdminPage: boolean = pathname.includes('/admin');
  const isHomePage: boolean = pathname.includes('/');
  console.log('pathname: ', pathname);

  //   <ChakraProvider>
  //   {isApplyCommonLayout ? (
  //     <Providers>{children}</Providers>
  //   ) : (
  //     <Providers>
  //       <Layout>{children}</Layout>
  //     </Providers>
  //   )}
  // </ChakraProvider>

  return (
    <html lang="en">
      <head />
      <body>
        <ChakraProvider theme={theme}>
          {isProductsPage && (
            <Providers>
              <UserLayout>
                <main>
                  <Center marginBottom="200px">
                    <Flex width="1200px" marginY="10">
                      <Category />
                      {children}
                    </Flex>
                  </Center>
                </main>
              </UserLayout>
            </Providers>
          )}
          {isHomePage && (
            <Providers>
              <UserLayout>{children}</UserLayout>
            </Providers>
          )}
          {isAdminPage ? (
            <Providers>
              <UserLayout>{children}</UserLayout>
            </Providers>
          ) : undefined}
          <ToastContainer />
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
