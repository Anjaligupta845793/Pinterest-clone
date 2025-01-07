import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  useEffect(() => {
    MyProfile();
  }, []);

  const [user, setUser] = useState({});
  const [isAuth, setisAuth] = useState(false);
  const [btnLoading, setbtnLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const LoginUser = async (email, password, navigate) => {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/Login", { email, password });
      console.log(data);
      toast.success(data.message);
      setbtnLoading(false);
      setisAuth(true);
      setUser(data.user);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setbtnLoading(false);
    }
  };
  const RegisterUser = async (name, email, password, navigate) => {
    setbtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      console.log(data);

      setUser(data.user);

      setbtnLoading(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
      setbtnLoading(false);
    }
  };

  const MyProfile = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/Profile");
      setUser(data.user);
      setisAuth(true);
      setLoading(false);
      return data.user;
    } catch (error) {
      console.log("error while fetching for profile", error);
      setLoading(false);
    }
  };

  const Logout = async (navigate) => {
    try {
      const data = await axios.post("/api/user/Logout");
      toast.success("Logout");
      setisAuth(false);
      setUser({});
      location.reload();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong ");
    }
  };
  return (
    <userContext.Provider
      value={{
        LoginUser,
        btnLoading,
        RegisterUser,
        user,
        Loading,
        isAuth,
        MyProfile,
        Logout,
      }}
    >
      {children}
      <Toaster />
    </userContext.Provider>
  );
};
export const userData = () => useContext(userContext);
