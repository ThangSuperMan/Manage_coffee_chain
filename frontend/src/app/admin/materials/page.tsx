'use client';

import { useState } from 'react';
import { Box, Button, Heading, VStack, Text, Flex, IconButton, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const MaterialPage = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddMaterial = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedMaterials = [...materials];
      updatedMaterials[editIndex] = { name, quantity };
      setMaterials(updatedMaterials);
      setEditIndex(-1);
    } else {
      const newMaterial = { name, quantity };
      setMaterials([...materials, newMaterial]);
    }
    setName('');
    setQuantity('');
  };

  const handleEditMaterial = (index) => {
    const materialToEdit = materials[index];
    setName(materialToEdit.name);
    setQuantity(materialToEdit.quantity);
    setEditIndex(index);
  };

  const handleDeleteMaterial = (index) => {
    const updatedMaterials = [...materials];
    updatedMaterials.splice(index, 1);
    setMaterials(updatedMaterials);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Quản lý Nguyên Vật liệu</Heading>
      <form onSubmit={handleAddMaterial}>
        <VStack align="start" spacing={4}>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Heading as="h2" size="md">{editIndex !== -1 ? 'Chỉnh sửa Nguyên Vật liệu' : 'Thêm Nguyên Vật liệu'}</Heading>
            <FormControl mt={4}>
              <FormLabel htmlFor="name">Tên Nguyên Vật liệu</FormLabel>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="quantity">Số lượng</FormLabel>
              <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              {editIndex !== -1 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md" w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tên Nguyên Vật liệu</Th>
                  <Th>Số lượng</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {materials.map((material, index) => (
                  <Tr key={index}>
                    <Td>{material.name}</Td>
                    <Td>{material.quantity}</Td>
                    <Td>
                      <Flex>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => handleEditMaterial(index)}
                          mr={2}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDeleteMaterial(index)}
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

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    if (editIndex !== -1) {
      const updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = { name, ingredients };
      setRecipes(updatedRecipes);
      setEditIndex(-1);
    } else {
      const newRecipe = { name, ingredients };
      setRecipes([...recipes, newRecipe]);
    }
    setName('');
    setIngredients('');
  };

  const handleEditRecipe = (index) => {
    const recipeToEdit = recipes[index];
    setName(recipeToEdit.name);
    setIngredients(recipeToEdit.ingredients);
    setEditIndex(index);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = [...recipes];
    updatedRecipes.splice(index, 1);
    setRecipes(updatedRecipes);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>Quản lý Công thức</Heading>
      <form onSubmit={handleAddRecipe}>
        <VStack align="start" spacing={4}>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md">
            <Heading as="h2" size="md">{editIndex !== -1 ? 'Chỉnh sửa Công thức' : 'Thêm Công thức'}</Heading>
            <FormControl mt={4}>
              <FormLabel htmlFor="name">Tên Công thức</FormLabel>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="ingredients">Nguyên liệu</FormLabel>
              <Input id="ingredients" type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            </FormControl>
            <Button mt={4} colorScheme="teal" type="submit">
              {editIndex !== -1 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="md" w="100%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tên Công thức</Th>
                  <Th>Nguyên liệu</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {recipes.map((recipe, index) => (
                  <Tr key={index}>
                    <Td>{recipe.name}</Td>
                    <Td>{recipe.ingredients}</Td>
                    <Td>
                      <Flex>
                        <IconButton
                          icon={<EditIcon />}
                          colorScheme="teal"
                          variant="ghost"
                          onClick={() => handleEditRecipe(index)}
                          mr={2}
                        />
                        <IconButton
                          icon={<DeleteIcon />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleDeleteRecipe(index)}
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

export default function App() {
  return (
    <>
      <MaterialPage />
      <RecipePage />
    </>
  );
}
