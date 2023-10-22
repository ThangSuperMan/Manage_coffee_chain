import React from 'react';
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
  const { data, loading } = await getClient().query({ query });
  console.log('data: ', data);
  console.log('loading: ', loading);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setPosts(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  // return (
  //   <main>
  //     <h1>Welcome to Coffee</h1>
  //     {data.items.map((item: { title: string }) => (
  //       <div key={item.title}>Item: {item.title}</div>
  //     ))}
  //   </main>
  // );

  return (
    <main>
      <CarouselBanner />
      <TestimonialContainer />
    </main>
  );
}
