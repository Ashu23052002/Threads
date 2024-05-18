import { Avatar, AvatarGroup, Flex, Box, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions.jsx";
import useShowToast from "../hooks/useShowToast.js";
import { DeleteIcon } from "@chakra-ui/icons";

import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();
        // console.log(data);
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

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault();
      if (!window.confirm("Are you sure you want to delete this post ?"))
        return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      showToast("Success", "Post Deleted Successfully", "success");
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <Link /*to={`${user?.username}/post/${post._id}`}*/>
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
                src={post.replies[0].userProfilePic}
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
              <Text
                fontSize={"xs"}
                width={36}
                align={"right"}
                color={"gray.light"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user?._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
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
            <Actions post={post} />
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

export default Post;
