import React from "react";
import UserHeader from "../components/UserHeader.jsx";
import UserPost from "../components/UserPost.jsx";

const UserPage = () => {
  return (
    <>
      <UserHeader />
      <UserPost likes={613} replies={176} postImg="/post1.png" postTitle="How r u ?"/>
      <UserPost likes={987} replies={356} postImg="/post2.png" postTitle="How r u ?"/>
      <UserPost likes={783} replies={479} postImg="/post3.png" postTitle="How r u ?"/>
      <UserPost likes={243} replies={190}  postTitle="How r u ?"/>
    </>
  );
};

export default UserPage;
