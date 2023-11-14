'use client';

import React, { Suspense } from 'react';
import { getClient } from '@/lib/client';
import { gql } from '@apollo/client';
import CarouselBanner from '@/components/public/CarouselBanner';
import TestimonialContainer from '@/components/public/Testimonial';

const query = gql`
  query {
    items {
      id
      title
      description
      artist {
        firstName
        lastName
        email
        createdAt
      }
    }
  }
`;

export default async function Home() {
  const CypressWrapper = () => {
    return (
      <Suspense>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(window.location.pathname === '/') { window.location.replace('http://localhost:4000') }`,
          }}
        ></script>
        <style dangerouslySetInnerHTML={{ __html: `body { color: #676 }` }}></style>
        <main>
          <CarouselBanner />
          <TestimonialContainer />
        </main>
      </Suspense>
    );
  };

  return (
    <main>
      <CarouselBanner />
      <TestimonialContainer />
    </main>
  );
}
