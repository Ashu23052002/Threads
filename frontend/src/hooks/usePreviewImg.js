import { useState } from "react";
import useShowToast from "./useShowToast.js";

function usePreviewImg() {
  const [image, setImage] = useState(null);
  const showToast = useShowToast();
  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      showToast("Invalid file type", " Please select an image file", "error");
      setImage(null);
    }
  };

  return {handleImageChange, image, setImage}
}

export default usePreviewImg;
