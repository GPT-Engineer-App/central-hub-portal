import React, { useState } from "react";
import { Box, Button, Flex, Heading, Image, Input, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Menu, MenuButton, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

const API_URL = "https://backengine-3wnl.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const { isOpen: isAppsOpen, onOpen: onAppsOpen, onClose: onAppsClose } = useDisclosure();
  const { isOpen: isUserOpen, onOpen: onUserOpen, onClose: onUserClose } = useDisclosure();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 204) {
        toast({
          title: "Signup Successful",
          description: "Please log in with your new account.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Signup Failed",
          description: errorData.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken("");
    onUserClose();
  };

  return (
    <Box>
      {!isLoggedIn ? (
        <Flex direction="column" align="center" justify="center" minHeight="100vh">
          <Image src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzYWFzJTIwcGxhdGZvcm0lMjBsb2dvfGVufDB8fHx8MTcxMDUzMDUwNXww&ixlib=rb-4.0.3&q=80&w=1080" alt="Logo" mb={8} />
          <Heading as="h1" size="xl" mb={8}>
            Welcome to CentralStation
          </Heading>
          <Box width="300px">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} mb={4} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} mb={4} />
            <Button colorScheme="blue" onClick={handleLogin} mb={4}>
              Login
            </Button>
            <Button onClick={handleSignup}>Sign Up</Button>
          </Box>
        </Flex>
      ) : (
        <Box>
          <Flex justify="space-between" align="center" p={4} bg="gray.100">
            <Heading as="h1" size="lg">
              CentralStation
            </Heading>
            <Flex>
              <Button leftIcon={<FaBars />} onClick={onAppsOpen} mr={4}>
                Apps
              </Button>
              <Menu>
                <MenuButton as={Button} leftIcon={<FaUser />}>
                  User
                </MenuButton>
                <MenuList>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
          <Box p={8}>
            <Heading as="h2" size="xl" mb={4}>
              Dashboard
            </Heading>
            <Text>Welcome to your CentralStation dashboard!</Text>
          </Box>
        </Box>
      )}

      <Drawer isOpen={isAppsOpen} placement="top" onClose={onAppsClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Available Apps</DrawerHeader>
            <DrawerBody>
              {/* Add your sub-apps here */}
              <Button mb={4}>App 1</Button>
              <Button mb={4}>App 2</Button>
              <Button>App 3</Button>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Index;
