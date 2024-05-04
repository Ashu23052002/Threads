import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import userAtom from "../atoms/userAtom.js";
import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import usePreviewImg from "../hooks/usePreviewImg.js";
import useShowToast from "../hooks/useShowToast.js";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);

  const [input, setInput] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const fileRef = useRef(null);

  const showToast = useShowToast();

  const { handleImageChange, image } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...input, profilePic: image }),
      });

      const data = await res.json();
      if (data.error) {
        showToast("Error", data.message, "error");
        return;
      }
      showToast("Suucess", "Profile Updated Successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data)); 
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          // my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={image || user.profilePic}></Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Ashu Srivastava"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="ashusri"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your Bio..."
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
