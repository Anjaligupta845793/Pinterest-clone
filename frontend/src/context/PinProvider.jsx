import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const PinContext = createContext();
export const PinProvider = ({ children }) => {
  const [pin, setpin] = useState([]);
  const [loading, setloading] = useState(false);
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

  const CreatePinHandler = async (name, discription, file) => {
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
      toast.success("Pin is Created");
    } catch (error) {
      console.error(
        "Error creating pin:",
        error.response?.data || error.message
      );
    }
  };

  const AddComments = async (id, comment) => {
    try {
      const data = await axios.post(`/api/pin/comment/${id}`, { comment });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePin = async (id) => {
    try {
      const res = await axios.delete(`/api/pin/${id}`);
      console.log(res);
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
      <Toaster />
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
