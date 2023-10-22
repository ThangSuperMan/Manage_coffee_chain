import React from 'react';
import type { Metadata } from 'next';
import Providers from '@/redux/provider';
import Layout from '@/modules/common/Layout';
import { ChakraProvider } from '@chakra-ui/react';
import { headers } from 'next/headers';
import './globals.css';
import UserLayout from '@/common/layouts/user';

export const metadata: Metadata = {
  title: 'Coffee morning',
  description: 'Generated by create next app',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({ children }) => {
  const headersList = headers();
  const header_url = headersList.get('x-url') || '';
  const pathsToCheck = ['/signin', '/signup'];
  const isApplyCommonLayout: boolean = pathsToCheck.some((path: string) => header_url.includes(path));

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
        <ChakraProvider>
          <Providers>
            <UserLayout>{children}</UserLayout>
          </Providers>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
