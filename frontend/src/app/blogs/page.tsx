'use client';

import React from 'react';
import BlogArticles from '@/components/public/BlogArticles';

interface Blog {
  title: { rendered: string };
  content: {};
}

const BlogsPage: React.FC = () => {
  return (
    <main>
      <BlogArticles />
    </main>
  );
};

export default BlogsPage;
