import { Pin } from "../model/pin.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

export const createPin = async (req, res) => {
  const { name, discription } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Add retries for resilience
    let retries = 3;
    let uploadResult;

    while (retries > 0) {
      try {
        uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "pins",
          resource_type: "auto",
          timeout: 10000, // 10 second timeout per attempt
        });
        break; // Success! Exit the retry loop
      } catch (uploadError) {
        retries--;
        if (retries === 0) throw uploadError;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds before retry
      }
    }

    await fs.unlink(req.file.path);
    // Create pin with the upload result
    const newPin = await Pin.create({
      name,
      discription,
      user: req.user._id,
      image: {
        id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
      cloudinary_id: uploadResult.public_id,
    });

    res.status(201).json({ success: true, pin: newPin });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload image",
      details: error.message,
    });
  }
};

export const getAllPin = async (req, res) => {
  try {
    const pins = await Pin.find().sort({ createdAt: -1 });
    res.json({
      pins,
    });
  } catch (error) {
    res.json({
      message: "something went wrong",
    });
  }
};

export const getSinglePin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id).populate("user", "-password");
    res.json({
      pin,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const deletepin = async (req, res) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(402).json({
        message: "pin doesn't exit",
      });
    }
    if (pin.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }
    await cloudinary.uploader.destroy(pin.image.id);
    await pin.deleteOne();
    res.status(200).json({
      message: "Pin is deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const upddatePin = async (req, res) => {
  try {
    const { name, discription } = req.body;
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(400).json({
        message: "pin doesn't exite",
      });
    }
    if (!name || !discription) {
      return res.status(400).json({
        message: "All fields were not provided",
      });
    }
    console.log("userid", req.user._id);
    console.log(pin);
    if (pin.user.toString() !== req.user._id.toString()) {
      return res.status(402).json({
        message: "Unauthorized",
      });
    }
    pin.name = name;
    pin.discription = discription;
    await pin.save();
    res.status(201).json({
      message: "Pin is Updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const commentOnPin = async (req, res) => {
  try {
    const { comment } = req.body;
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      return res.status(400).json({
        message: "pin doesn't exit",
      });
    }
    pin.comments.push({
      user: req.user._id.toString(),
      name: req.user.name,
      comment,
    });

    await pin.save();
    res.status(200).json({
      pin,
      message: "comment added",
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  const pin = await Pin.findById(req.params.id);
  const commentid = req.query.commentId.toString();
  if (!commentid) {
    return res.status(400).json({
      message: "comment id is not provided",
    });
  }

  if (!pin) {
    return res.status(400).json({
      message: "pin doesn't exit",
    });
  }

  const commentIndex = pin.comments.findIndex(
    (item) => item._id.toString() === commentid
  );

  const comment = pin.comments[commentIndex];

  if (!comment) {
    return res.status(400).json({
      message: "comment is not fined",
    });
  }
  if (comment.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  if (comment.user === req.user._id.toString()) {
    console.log(" comment is deleting");

    pin.comments.splice(commentIndex, 1);
  }
  await pin.save();
  return res.status(200).json({
    message: "comment is deleted",
  });
};
