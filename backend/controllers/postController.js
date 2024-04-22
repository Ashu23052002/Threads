import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
  try {
    const { postedBy, text, img } = req.body;

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ message: "Please provide Postedby and Text" });
    }

    const user = await User.findById(postedBy);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("aaaaa", user._id.toString());
    console.log("bbbbb", req.user._id.toString());
    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "Create your own post not others" });
    }

    const maxLength = 500;
    if (text.length > maxLength) {
      return res
        .status(400)
        .json({ message: "Text should be less than ${maLength} characters" });
    }

    const newPost = new Post({
      postedBy,
      text,
      img,
    });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in createPost : ", error.message);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found!!" });
    }

    res.status(200).json({ message: "Post found", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getPost : ", error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    // console.log("aaaaa", post.postedBy);
    // console.log("bbbbb", req.user._id);
    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Unauthorize post delete" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in deletePost : ", error.message);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // unLike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // like post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in likeUnlikePost : ", error.message);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;
    const postId = req.params.id;
    const userProfilePic = req.user.profilePic;
    const username = req.body.username;

    if (!text) {
      return res.status(400).json({ message: "Text field required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const reply = { text, userId, userProfilePic, username };

    post.replies.push(reply);
    await post.save();

    res.status(200).json({ messgae: "Reply added successfully", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in replyToPost : ", error.message);
  }
};

const getFeedPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    res.status(200).json({ feedPosts });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in getFeedPost : ", error.message);
  }
};
export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPost,
};
