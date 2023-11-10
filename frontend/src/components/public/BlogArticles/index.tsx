import React, { useState, useEffect, useMemo } from 'react';
import useAxios from '@/hooks/useAxios';
import { constants, httpMethods } from '@/constants';
import { Box, Container, Divider, HStack, Heading, Image, Text, Tag, Wrap, WrapItem, Center } from '@chakra-ui/react';
import cheerio from 'cheerio';
import axios from 'axios';

interface BlogTagsProps {
  tags: any[];
}

const BlogTags: React.FC<BlogTagsProps> = (props) => {
  const { tags } = props;

  return (
    <HStack spacing="2">
      {tags.map((tag: any, index: number) => {
        return (
          <Tag marginTop="3" size="md" variant="solid" colorScheme="orange" key={index}>
            {tag.name}
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
  tags: any[];
}

const BlogArticleItem: React.FC<BlogArticleItem> = (props) => {
  const { title, imageUrl, paragraphs, tags } = props;

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
        <BlogTags tags={tags} />
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
      </Box>
    </WrapItem>
  );
};

const BlogArticles: React.FC = () => {
  const [filterWord, setFilterWord] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const filterdBlogs = useMemo(() => {
    console.log('memo');
    return filterWord.length > 0
      ? blogs.filter((blog) => {
          const tagNames: string[] = blog.tags.map((tag: any) => tag.name);

          return filterWord.every((filter: string) => tagNames.includes(filter));
        })
      : blogs;
  }, [blogs, filterWord]);
  const [tags, setTags] = useState<string[]>([]);

  console.log('redrender BlogArticles');

  const filterLabel = (tag: any, index: number) => {
    const isSelected = selectedIndex.includes(index);

    if (isSelected) {
      setSelectedIndex(selectedIndex.filter((id) => id !== index));
      setFilterWord(filterWord.filter((filter) => filter != tag.innerText));
    } else {
      setSelectedIndex([...selectedIndex, index]);
      setFilterWord([...filterWord, tag.innerText]);
    }
  };

  const { response, loading, error } = useAxios({
    method: httpMethods.GET,
    url: `${constants.wordpressURL}/wp-json/wp/v2/posts`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: null,
  });

  const getAllTags = async () => {
    try {
      const response = await axios.get(`${constants.wordpressURL}/wp-json/wp/v2/tags`);
      const tags = response.data;

      return tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

  const getTagsByIds = async (tagIds: number[]) => {
    try {
      const response = await axios.get(`${constants.wordpressURL}/wp-json/wp/v2/tags?include=${tagIds.join(',')}`);
      const tags = response.data;

      return tags;
    } catch (error) {
      console.error('Error fetching tags:', error);
      return [];
    }
  };

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
    if (response) {
      const mapBlogArticles = () => {
        return response.data.map((blog: any) => {
          return {
            id: blog.id,
            title: blog.title.rendered,
            imageUrl: getImageUrlBasedOnHTML(blog.content.rendered),
            paragraphs: getParagraphsBasedOnHTML(blog.content.rendered),
            tagIds: blog.tags,
          };
        });
      };

      const fetchTags = async (blog: any) => {
        const isEmptyTags: boolean = blog.tagIds.length === 0;
        const tags = isEmptyTags ? [] : await getTagsByIds(blog.tagIds);

        return {
          ...blog,
          tags: tags,
        };
      };

      const processBlogArticles = async () => {
        const mappedBlogArticles = mapBlogArticles();
        const updatedBlogArticles = await Promise.all(mappedBlogArticles.map(fetchTags));
        const tags = await getAllTags();

        setTags(tags);
        setBlogs(updatedBlogArticles);
      };

      processBlogArticles();
    }
  }, [response, selectedIndex, filterWord]);

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h2" marginTop="5">
        Các bài viết mới nhất
      </Heading>
      <Divider marginTop="5" />
      <Center>
        {tags.map((tag: any, index: number) => (
          <Tag
            onClick={(e: any) => filterLabel(e.target, index)}
            my="3"
            mr="3"
            size="md"
            variant="solid"
            background={`${selectedIndex.includes(index) ? 'orange.600' : 'orange.400'}`}
            key={index}
          >
            {tag.name}
          </Tag>
        ))}
      </Center>
      <Wrap spacing="30px" marginTop="5">
        {filterdBlogs.map((blog: any, index: number) => (
          <BlogArticleItem key={index} {...blog} />
        ))}
      </Wrap>
    </Container>
  );
};

export default BlogArticles;
