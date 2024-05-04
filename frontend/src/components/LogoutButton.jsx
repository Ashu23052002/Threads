import { Button } from "@chakra-ui/react";
import React from "react";
import useShowToast from "../hooks/useShowToast";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { LuLogOut } from "react-icons/lu";

const LogoutButton = () => {
  const showToast = useShowToast();

  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async (req, res) => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application.json",
        },
      });

      const data = await res.json();

      console.log(data);

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.removeItem("user-threads");
      setUser(null);
    } catch (error) {
      showToast("Error", error, "error");
    }
  };
  return (
    <Button
      position={"fixed"}
      top={"10px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
    >
      <LuLogOut />
    </Button>
  );
};

export default LogoutButton;
