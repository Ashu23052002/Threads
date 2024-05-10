import {
  VStack,
  Box,
  Flex,
  Avatar,
  Text,
  Link,
  useToast,
  Button,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Link as RouterLink } from "react-router-dom";
import userAtom from "../atoms/userAtom.js";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast.js";

const UserHeader = ({ user }) => {
  const currentUser = useRecoilValue(userAtom);
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);

  const [following, setFollowing] = useState(currentUser._id ? user.followers.includes(currentUser._id) : false);

  console.log(following);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }

    if(updating)return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Context-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("Success", `Unfollow ${user.name}`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Follow ${user.name}`, "success");
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };

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
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
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
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
                lg: "md",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
                lg: "md",
              }}
            />
          )}
        </Box>
      </Flex>

      <Text>{user.bio}</Text>

      {currentUser._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}

      {currentUser._id !== user._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}

      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} follower</Text>
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
