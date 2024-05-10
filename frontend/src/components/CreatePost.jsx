import { AddIcon } from "@chakra-ui/icons";
import { BsFillImageFill } from "react-icons/bs";
import {
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormControl,
  Text,
  Input,
  CloseButton,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import usePreviewImg from "../hooks/usePreviewImg.js";
import userAtom from "../atoms/userAtom.js";
import { useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast.js";

const createPost = () => {
  const MAX_CHAR = 500;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const [remainingChar, setRemainingChar] = useState(0);
  const [loading,setLoading] = useState(false)

  const showToast = useShowToast();

  const user = useRecoilValue(userAtom);

  const fileRef = useRef(null);
  const { handleImageChange, image, setImage } = usePreviewImg();

  const handleTextChange = (e) => {
    const inputText = e.target.value;

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR);
      setPostText(truncatedText);
      setRemainingChar(MAX_CHAR);
    } else {
      setPostText(inputText);
      setRemainingChar(inputText.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "COntent-Type": "application/json",
        },
        body: JSON.stringify({ postedBy: user._id, text: postText, img: image }),
      });
  
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
  
      showToast("Success", "Post created successfully", "success");
      setRemainingChar(0);
      setPostText("");
      setImage("");
      onClose();
    } catch (error) {
      showToast("Error", error, "error");
    }finally{
      setLoading(false)
    }
  };
  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        Post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post Content goes here"
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={"right"}
                m={"1"}
                color={"gray.800"}
              >
                {remainingChar}/{MAX_CHAR}
              </Text>

              <Input
                type="file"
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => fileRef.current.click()}
              />
            </FormControl>

            {image && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={image} alt="Selected Img" />
                <CloseButton
                  onClick={() => {
                    setImage("");
                  }}
                  right={2}
                  top={2}
                  position={"absolute"}
                  bg={"gray.800"}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default createPost;
