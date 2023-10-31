'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { constants } from '@/constants';
import BlogArticles from '@/components/public/BlogArticles';

interface Blog {
  title: { rendered: string };
  content: {};
}

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `${constants.wordpressURL}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  useEffect(() => {
    if (response) {
    }
  }, []);

  return (
    <h1>
      <BlogArticles />
    </h1>
  );
};

export default BlogsPage;
