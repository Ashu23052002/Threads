import React, { useState } from "react";
import {
  Avatar,
  Flex,
  Image,
  Text,
  Box,
  Divider,
  Button,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions.jsx";
import Comment from "../components/Comment.jsx";

const PostPage = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zukerbarg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzukerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={3} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my={3}>Lets talk about threads</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid "}
        borderColor={"gray.light"}
      >
        <Image src="/post1.png" w={"full"} />
      </Box>

      <Flex gap={3} my={1}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap={2} alignItems={"center"}>
        <Text fontSize={"small"} color={"gray.light"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bgColor={"gray.light"}></Box>
        <Text fontSize={"small"} color={"gray.light"}>
          234 replies
        </Text>
      </Flex>

      <Divider my={3} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like , reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={3} />
      <Comment
        comment="looks like it very much"
        createdAt="2d"
        likes={100}
        username="asusri23"
        userAvatar="http://bit.ly/dan-abramov"
      />
      <Comment
        comment="yo yo honey sighn"
        createdAt="7d"
        likes={56}
        username="kojhg12"
        userAvatar="http://bit.ly/dan-abramov"
      />
      <Comment
        comment="ooa badshaah sdjfhdkuf"
        createdAt="4d"
        likes={21}
        username="wert456"
        userAvatar="http://bit.ly/dan-abramov"
      />
    </>
  );
};

export default PostPage;
