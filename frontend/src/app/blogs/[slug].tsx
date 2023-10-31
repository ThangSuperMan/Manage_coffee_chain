'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { constants } from '@/constants';
import BlogArticles from '@/components/public/BlogArticles';
import { usePathname } from 'next/navigation';

const LAST_PATH_SEGMENT_INDEX = 2;

interface Blog {
  title: { rendered: string };
  content: {};
}

const BlogDetailPage: React.FC = () => {
  const pathname = usePathname();
  const slug = pathname.split('/')[LAST_PATH_SEGMENT_INDEX];

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

  return <h1>Hello</h1>;
};

export default BlogDetailPage;
