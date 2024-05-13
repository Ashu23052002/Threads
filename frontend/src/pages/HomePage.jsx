import React, { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { Spinner,Flex } from "@chakra-ui/react";
import Post from "../components/Post.jsx"

const HomePage = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("GetFeedPost", data.error, "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error in GetFeedPost", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPost(); // Call the function inside useEffect
  }, []); // Include showToast in the dependency array if it's used inside getFeedPost

  return (
    <> 
      {!loading && posts.length === 0 && <h1>Follow some user to see feed</h1>}

      {loading && (
        <Flex justify='center'>
          <Spinner size={'xl'}/>
        </Flex>
      )}


      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  );
};

export default HomePage;
