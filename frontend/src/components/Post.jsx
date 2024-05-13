import { Avatar, AvatarGroup, Flex, Box, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions.jsx";
import useShowToast from "../hooks/useShowToast.js";

import {formatDistanceToNow} from "date-fns"

const Post = ({ post, postedBy }) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
        }
        setUser(data);
      } catch (error) {
        showToast("Error in getUser in Post.jsx", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy]);

  return (
    <Link to={`${user?.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Avatar
            size="md"
            name={user?.username}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user?.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>{" "}
          {/* for vertical line */}
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
              <Text textAlign={"center"}>Boring</Text>
            )}

            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name="mark zukerberg"
                src={post.replies[0].ProfilePic}
                position={"absolute"}
                top={"0px"}
                left="15px"
                padding={"2px"}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="mark zukerberg"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="-5px"
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="mark zukerberg"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left="4px"
                padding={"2px"}
              />
            )}

            {/* <AvatarGroup size="xs" max={2}>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </AvatarGroup> */}
          </Box>
        </Flex>

        {/* // right side */}
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            {/* start of username and verified image */}
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize="sm"
                fontWeight="bold"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user?.username}`);
                }}
              >
                {user?.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={2} />
            </Flex>
            {/* end of username and verified image */}

            {/* ========== */}
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              <BsThreeDots />
            </Flex>
            {/* ========== */}
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid "}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}

          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"small"} color={"gray.light"}>
              {post.likes.length} likes
            </Text>
            <Box
              w={0.5}
              h={0.5}
              borderRadius={"full"}
              bgColor={"gray.light"}
            ></Box>
            <Text fontSize={"small"} color={"gray.light"}>
              {post.replies.length} replies
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
