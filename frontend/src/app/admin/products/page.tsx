'use client';

import { useState } from 'react';
import { Box, Button, Heading, VStack, Text, Image, Flex, IconButton, FormControl, FormLabel, Input, Textarea, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedProducts = [...products];
      updatedProducts[editIndex] = { name, description, imageUrl };
      setProducts(updatedProducts);
      setEditIndex(-1);
    } else {
      const newProduct = { name, description, imageUrl };
      setProducts([...products, newProduct]);
    }
    setName('');
    setDescription('');
    setImageUrl('');
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setName(productToEdit.name);
    setDescription(productToEdit.description);
    setImageUrl(productToEdit.imageUrl);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      setImageUrl(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Product Page</Heading>
      <form onSubmit={handleAddProduct}>
        <VStack align="start" spacing={4}>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Heading as="h2" size="md">{editIndex !== -1 ? 'Edit Product' : 'Add Product'}</Heading>
            <FormControl mt={4}>
              <FormLabel htmlFor="name">Tên sản phẩm</FormLabel>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="description">Mô tả</FormLabel>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="image">Hình ảnh</FormLabel>
              <div
                id="image"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                style={{ border: '1px dashed gray', padding: '1rem' }}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="Product" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ) : (
                  <Text>Kéo và thả hình ảnh vào đây</Text>
                )}
              </div>
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              {editIndex !== -1 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md" w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tên sản phẩm</Th>
                  <Th>Mô tả</Th>
                  <Th>Hình ảnh</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={index}>
                    <Td>{product.name}</Td>
                    <Td>{product.description}</Td>
                    <Td>
                      <Image src={product.imageUrl} alt="Product" maxH="100px" maxW="100px" />
                    </Td>
                    <Td>
                      <Flex>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => handleEditProduct(index)}
                          mr={2}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDeleteProduct(index)}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </VStack>
      </form>
    </Box>
  );
};

export default ProductPage;
