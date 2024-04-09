import { Avatar, AvatarGroup, Flex, Box, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions.jsx";

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/markzukerberg.post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Avatar size="md" name="mark zukerberg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>{" "}
          {/* for vertical line */}
          <Box position={"relative"} w={"full"}>
            {/* <Avatar 
                size={"xs"}
                name="mark zukerberg"
                src="/post1.png"
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
            />
            <Avatar 
                size={"xs"}
                name="mark zukerberg"
                src="/post2.png"
                position={"absolute"}
                bottom={"0px"}
                right="-5px"
                padding={"2px"}
            />
            <Avatar 
                size={"xs"}
                name="mark zukerberg"
                src="/post3.png"
                position={"absolute"}
                bottom={"0px"}
                left="4px"
                padding={"2px"}
            /> */}

            <AvatarGroup size="xs" max={2}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup>
          </Box>
        </Flex>

        {/* // right side */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            {/* start of username and verified image */}
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize="sm" fontWeight="bold">
                mark zukerbreg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={2} />
            </Flex>
            {/* end of username and verified image */}

            {/* ========== */}
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
            {/* ========== */}
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid "}
              borderColor={"gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"} color={"gray.light"}>
              {likes} likes
            </Text>
            <Box
              w={0.5}
              h={0.5}
              borderRadius={"full"}
              bgColor={"gray.light"}
            ></Box>
            <Text fontSize={"small"} color={"gray.light"}>
              {replies} replies
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default UserPost;
