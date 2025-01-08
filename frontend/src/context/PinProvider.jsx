import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";
import { FaLessThanEqual } from "react-icons/fa";

const PinContext = createContext();
export const PinProvider = ({ children }) => {
  const [pin, setpin] = useState([]);
  const [loading, setloading] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const [pinbtnLoading, setpinbtnLoading] = useState();

  useEffect(() => {
    AllPins();
  }, []);

  const AllPins = async () => {
    try {
      const { data } = await axios.get("/api/pin/");
      console.log(data.pins);
      setpin(data.pins);
    } catch (error) {
      console.log("error while fetching ", error);
    }
  };
  const SinglePin = async (id) => {
    try {
      const { data } = await axios.get(`/api/pin/${id}`);
      console.log(data);
      return data.pin;
    } catch (error) {
      console.log(error);
    }
  };

  const CreatePinHandler = async (name, discription, file, navigate) => {
    setbtnLoading(true);
    try {
      // Create FormData object

      const formData = new FormData();
      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("file", file);

      // Make a POST request with FormData
      const response = await axios.post("/api/pin/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Pin Created:", response.data);
      toast.success("Pin is Created 💫");
      setbtnLoading(false);
      location.reload();
    } catch (error) {
      console.error(
        "Error creating pin:",
        error.response?.data || error.message
      );
      setbtnLoading(false);
      toast.error("something went wrong ❌");
    }
  };

  const AddComments = async (id, comment, setcomment) => {
    setbtnLoading(true);
    try {
      const data = await axios.post(`/api/pin/comment/${id}`, { comment });
      console.log(data);
      setbtnLoading(false);
      toast.success("comment is added ✅");
      console.log(`updated pin `, data);
      setcomment("");
      location.reload();
    } catch (error) {
      console.log(error);
      setbtnLoading(false);
      toast.error("something went wrong ❌");
    }
  };

  const deletePin = async (id, navigate) => {
    try {
      const res = await axios.delete(`/api/pin/${id}`);
      console.log(res);
      toast.success("Pin is deleted ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ❌");
    }
  };

  const editPin = async (id, PinTitle, PinDescription) => {
    setpinbtnLoading(true);
    try {
      const data = await axios.post(`/api/pin//update/${id}`, {
        name: PinTitle,
        discription: PinDescription,
      });
      setpinbtnLoading(false);
      toast.success("pin is updated");
      location.reload();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ❌");
      setpinbtnLoading(false);
    }
  };

  const deleteComment = async (id, commentid) => {
    try {
      console.log("pin id", id);
      console.log("comment id", commentid);

      const data = await axios.post(
        `/api/pin/deleteComment/${id}?commentId=${commentid}`
      );
      toast.success("Comment is deleted ✅");
      location.reload();
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ❌");
    }
  };

  return (
    <PinContext.Provider
      value={{
        pin,
        loading,
        SinglePin,
        CreatePinHandler,
        AddComments,
        deletePin,
        btnLoading,
        editPin,
        pinbtnLoading,
        deleteComment,
      }}
    >
      {children}
      <Toaster />
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
