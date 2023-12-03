'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  VStack,
  Heading,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import useAxios from '@/hooks/useAxios';
import { constants } from '@/constants';
import axios from 'axios';
import { notififyError, notifySuccess } from '@/shared/toastNotificationHelper';
import { getLocalStorageItem } from '@/shared/localStorageHelper';

interface Profile {
  name: string;
  email: string;
}

const CozyProfilePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });
  const { response, loading, error } = useAxios({
    method: 'GET',
    url: '/api/v1/profile',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
    },
    body: null,
  });

  const user = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Web Developer | Coffee Enthusiast | Cat Lover',
    email: 'john.doe@example.com',
    avatarUrl: 'https://placekitten.com/200/200',
  };

  const handleEditProfile = async () => {
    console.log('profile :>> ', profile);

    try {
      const response: any = await axios.patch(
        `${constants.baseURL}/api/v1/profile`,
        { profile: profile },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getLocalStorageItem('access_token')}`,
          },
        },
      );

      notifySuccess('Cập nhật thông tin cá nhân thành công!');
    } catch (error: any) {
      console.log('error: ', error);
      notififyError('Cập nhật thông tin cá nhân thất bại!');
    }

    onClose();
  };

  useEffect(() => {
    if (response) {
      console.log('data: ', response);
      console.log('response.data.data.attributes :>> ', response.data.data.attributes);
      setProfile(response.data.data.attributes);
    }
  }, [response]);

  return (
    <main>
      <Box bg="gray.100" minH="100vh" p={4}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          maxW="400px"
          mx="auto"
          bg="white"
          p={8}
          rounded="lg"
          boxShadow="lg"
        >
          <Avatar size="2xl" name={user.name} src={user.avatarUrl} mb={4} />
          <VStack spacing={2} align="center">
            <Heading fontSize="xl">{profile.name !== '' ? profile.name : 'Chưa có tên'}</Heading>
            <Text fontSize="sm" color="gray.600">
              @{profile.name}
            </Text>
          </VStack>
          <Text mt={4} fontSize="md" textAlign="center">
            {user.bio}
          </Text>
          <Button mt={4} colorScheme="teal" onClick={onOpen}>
            Chỉnh sửa thông tin cá nhân
          </Button>
        </Flex>
      </Box>

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cập nhật thông tin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Tên"
              value={profile.name}
              onChange={(e) =>
                setProfile((prev: any) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
            <Input
              mt={2}
              placeholder="Email"
              value={profile.email}
              onChange={(e) =>
                setProfile((prev: any) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleEditProfile}>
              Lưu
            </Button>
            <Button onClick={onClose}>Thoát</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

export default CozyProfilePage;
