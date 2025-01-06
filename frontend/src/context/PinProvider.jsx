import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

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
  return (
    <PinContext.Provider value={{ pin, loading, SinglePin }}>
      {children}
    </PinContext.Provider>
  );
};

export const PinData = () => useContext(PinContext);
