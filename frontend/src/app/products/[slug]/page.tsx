'use client';

import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { usePathname } from 'next/navigation';
import Product from '@/types/product';
import { Box, Spinner, Image, Center, Flex, Heading, Text, Input, Button, HStack, Avatar } from '@chakra-ui/react';
import { CoffeeIcon } from '@/components/Icons';

interface User {
  id: number;
  email: string;
  encrypted_password: string;
  reset_password_token: string;
  reset_password_sent_at: Date;
  remember_created_at: Date;
  created_at: Date;
  updated_at: Date;
  role: number;
}

interface Comment {
  id: number;
  user_id: number;
  product_id: number;
  body: string;
  created_at: Date;
  updated_at: Date;
  product: Product;
  user: User;
  replies: Reply[];
}

interface Reply {
  id: number;
  comment_id: number;
  user_id: number;
  body: string;
  created_at: Date;
  updated_at: Date;
  comment: Comment;
  user: User;
}

const Comment = ({ comment, replies, handleReplySubmit }) => {
  const [newReply, setNewReply] = useState('');

  const handleReply = (e) => {
    e.preventDefault();
    if (newReply.trim() !== '') {
      handleReplySubmit(newReply);
      setNewReply('');
    }
  };

  return (
    <Box bg="white" p={4} mb={4} borderRadius="md" boxShadow="md">
      <HStack spacing={4}>
        <Avatar name="User" size="sm" />
        <Text fontWeight="bold">User</Text>
      </HStack>
      <Text mt={2}>{comment}</Text>

      {replies.length > 0 && (
        <Box mt={4} pl={10} borderLeft="2px" borderColor="gray.300">
          {replies.map((reply, index) => (
            <Flex key={index} alignItems="center" marginTop="2">
              <Avatar name="User" size="sm" />
              <Text marginLeft="2">{reply}</Text>
            </Flex>
          ))}
        </Box>
      )}

      <form onSubmit={handleReply}>
        <Input placeholder="Write a reply..." value={newReply} onChange={(e) => setNewReply(e.target.value)} mt={4} />
        <Button type="submit" colorScheme="blue" size="sm" mt={2}>
          Reply
        </Button>
      </form>
    </Box>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, { comment: newComment, replies: [] }]);
  };

  const handleReplySubmit = (newReply, commentIndex) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.push(newReply);
    setComments(updatedComments);
  };

  return (
    <Box marginBlock="8">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Bình luận
      </Text>

      {comments.length === 0 ? (
        <Text>No comments yet.</Text>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment.comment}
            replies={comment.replies}
            handleReplySubmit={(newReply) => handleReplySubmit(newReply, index)}
          />
        ))
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommentSubmit(e.target.comment.value);
          e.target.comment.value = '';
        }}
      >
        <Input name="comment" placeholder="Write a comment..." mb={4} />
        <Button type="submit" colorScheme="blue">
          Post Comment
        </Button>
      </form>
    </Box>
  );
};

const LAST_PATH_SEGMENT_INDEX = 2;

const ProductDetailPage: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const pathname = usePathname();
  const slug = pathname.split('/')[LAST_PATH_SEGMENT_INDEX];
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: `/api/v1/products/${slug}`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  useEffect(() => {
    if (response) {
      // console.log('data: ', response.data.data.attributes);
      setProduct(response.data.data.attributes);
    }
  }, [response]);

  return (
    <Center width="full" marginTop="20">
      <Box maxWidth="1200px">
        {loading && (
          <Center width="100vh" height="100vh">
            <Spinner thickness="4px" speed="0.8s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        )}
        <Flex>
          <Image
            width="570px"
            height="570px"
            borderRadius="xl"
            paddingX="15px"
            objectFit="cover"
            src={product?.image_url}
            alt="logo"
          />
          <Box width="570px" paddingX="15px">
            <Heading as="h3" fontSize="26px">
              {product?.title}
            </Heading>
            <Text color="primary" fontSize="26px" fontWeight="bold">
              {product?.price}
            </Text>
            <Text color="blackAlpha.800" marginTop="10" marginBottom="15px">
              Chọn size (bắt buộc)
            </Text>
            <Flex gap="4">
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="12px" height="16px" />
                <Text marginLeft="5px" cursor="pointer">
                  Nhỏ + 0 đ
                </Text>
              </Flex>
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="15px" height="20px" />
                <Text marginLeft="5px" cursor="pointer">
                  Vừa + 0 đ
                </Text>
              </Flex>
              <Flex
                paddingX="5"
                alignItems="center"
                height="10"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
              >
                <CoffeeIcon width="19px" height="24px" />
                <Text marginLeft="5px" cursor="pointer">
                  Lớn + 0 đ
                </Text>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        <Box width="570px">
          <CommentSection />
        </Box>
      </Box>
    </Center>
  );
};

export default ProductDetailPage;
