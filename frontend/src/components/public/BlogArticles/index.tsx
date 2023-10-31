import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { constants } from '@/constants';
import {
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Text,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  VStack,
} from '@chakra-ui/react';
import cheerio from 'cheerio';

const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps['marginTop'];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag: any) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogArticleItem {
  title: string;
  imageUrl: string;
  paragraphs: string[];
}

const BlogArticleItem: React.FC<BlogArticleItem> = (props) => {
  const { title, imageUrl, paragraphs } = props;

  return (
    <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
      <Box w="100%">
        <Box borderRadius="lg" overflow="hidden">
          <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Image
              transform="scale(1.0)"
              src={imageUrl}
              alt="some text"
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: 'scale(1.05)',
              }}
            />
          </Box>
        </Box>
        <BlogTags tags={['Engineering', 'Product']} marginTop={3} />
        <Heading fontSize="xl" marginTop="2">
          <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
            {title}
          </Text>
        </Heading>
        {paragraphs.map((paragraph: string, index: number) => (
          <Text key={index} as="p" fontSize="md" marginTop="2">
            {paragraph}
          </Text>
        ))}
        <BlogAuthor name="John Doe" date={new Date('2021-04-06T19:01:27Z')} />
      </Box>
    </WrapItem>
  );
};

const BlogArticles: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: `${constants.wordpressURL}/wp-json/wp/v2/posts`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  const getImageUrlBasedOnHTML = (html: string): string => {
    const $ = cheerio.load(html);
    const imgTagEl = $('img');
    const imageUrl = imgTagEl.attr('src');

    return imageUrl ? imageUrl : '';
  };

  const getParagraphsBasedOnHTML = (html: string): string[] => {
    const $ = cheerio.load(html);
    const paragraphs: string[] = [];
    $('p').each((index: any, element: any) => {
      paragraphs.push($(element).text());
    });

    return paragraphs;
  };

  useEffect(() => {
    console.log('Loaded in BlogArticles compo');
    if (response) {
      console.log(response);
      const blogArticles = response.data.map((blog: any) => {
        return {
          title: blog.title.rendered,
          imageUrl: getImageUrlBasedOnHTML(blog.content.rendered),
          paragraphs: getParagraphsBasedOnHTML(blog.content.rendered),
        };
      });

      console.log('blogArticles: ', blogArticles);

      setBlogs(blogArticles);
    }
  }, [response]);

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h2" marginTop="5">
        Các bài viết mới nhất
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {blogs.map((blog: any, index: number) => (
          <BlogArticleItem key={index} {...blog} />
        ))}
      </Wrap>
    </Container>
  );
};

export default BlogArticles;
