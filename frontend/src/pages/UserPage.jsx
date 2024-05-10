import React, { useState, useEffect } from "react";
import UserHeader from "../components/UserHeader.jsx";
import UserPost from "../components/UserPost.jsx";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast.js";
import { Spinner } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User Not Found</h1>;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={613}
        replies={176}
        postImg="/post1.png"
        postTitle="How r u ?"
      />
      <UserPost
        likes={987}
        replies={356}
        postImg="/post2.png"
        postTitle="How r u ?"
      />
      <UserPost
        likes={783}
        replies={479}
        postImg="/post3.png"
        postTitle="How r u ?"
      />
      <UserPost likes={243} replies={190} postTitle="How r u ?" />
    </>
  );
};

export default UserPage;
