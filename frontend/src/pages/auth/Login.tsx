import { useToast } from "@chakra-ui/react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthAPI } from "../../api/auth";
import { localStorageKeys } from "../../api/config";
import { UserLogin } from "../../api/interfaces/auth";

import AuthLayout from "../../layouts/AuthLayout";
import useAppStore from "../../store/store";
import { verifyUser } from "../../utilities/auth";
import FullScreenSpinner from "../../components/FullScreenSpinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toast = useToast();
  const appStore = useAppStore();

  useEffect(() => () => toast.closeAll(), [toast]);

  const userState = useAppStore((state) => state.user);

  useEffect(() => {
    if (userState.isVerified) {
      navigate("/");
    }
  }, [userState.isVerified]);

  const onSubmit = async (data: UserLogin) => {
    try {
      const response = await AuthAPI.login(data);

      if (response && response.data) {
        setLoading(true);
        localStorage.setItem(localStorageKeys.jwtToken, response.data.token);

        appStore.setToken(response.data.token);
        appStore.setName(response.data.user.name);
        appStore.setAuthMethod(response.data.method);

        if (await verifyUser()) {
          appStore.setIsVerified(true);
        }
      }
    } catch (error) {
      appStore.setIsVerified(false);

      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message;

        if (!toast.isActive(errorMessage)) {
          toast({
            id: errorMessage,
            position: "top",
            title: "Error",
            description: errorMessage,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (userState.isVerified) {
    return null;
  }

  return (
    <AuthLayout
      method="Log in"
      onClick={(e) => {
        e.preventDefault();
        onSubmit({ email, password });
      }}
      setPassword={setPassword}
      setEmail={setEmail}
    />
  );
};
export default Login;
