import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/UserPage.jsx";
import PostPage from "./pages/PostPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Header from "./components/Header.jsx";
import userAtom from "./atoms/userAtom";
import LogoutButton from "./components/LogoutButton.jsx";
import UpdateProfilePage from "./pages/updateProfilePage.jsx";
import { useRecoilValue } from "recoil";
import CreatePost from "./components/CreatePost.jsx";
const App = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      <Container maxW="620px">
        <Header />
        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>

        {user && <LogoutButton />}
        {user && <CreatePost />}
      </Container>
    </>
  );
};

export default App;
