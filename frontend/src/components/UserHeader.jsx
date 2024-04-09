import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

const UserHeader = () => {
  const toast = useToast();
  const copyURL = () => {
    const currentURL = window.location.href;
    // console.log(currentURL);
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        // title: "Account created.",
        description: "Profile Link copied.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      // console.log("Copied to clipboard");
    });
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zukerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>zucketberg</Text>
            <Text
              fontSize={"xs"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="mark zukerberg"
            src="/zuck-avatar.png"
            size={{
              base: "md",
              md: "xl",
              lg: "md",
            }}
          />
        </Box>
      </Flex>

      <Text>This is for biography so write it here</Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2k follwer</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box
            borderRadius="50%"
            padding="8px"
            width="40px"
            height="40px"
            transition="background-color 0.3s ease-in-out"
            _hover={{ backgroundColor: "red" }}
          >
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box
            borderRadius="50%"
            padding="8px"
            width="40px"
            height="40px"
            transition="background-color 0.3s ease-in-out"
            _hover={{ backgroundColor: "red" }}
          >
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyURL}>
                  Copy Link
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={"full"}>
        <Flex
          flex={1}
          justifyContent={"center"}
          borderBottom={"1.5px solid white"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          justifyContent={"center"}
          borderBottom={"1.5px solid gray"}
          pb={3}
          cursor={"pointer"}
          color={"gray.light"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
