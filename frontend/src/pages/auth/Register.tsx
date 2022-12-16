import { FormLabel, Input, useToast } from "@chakra-ui/react";

import axios from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../api/auth";
import { localStorageKeys } from "../../api/config";
import { UserRegister } from "../../api/interfaces/auth";

import FullScreenSpinner from "../../components/FullScreenSpinner";

import AuthLayout from "../../layouts/AuthLayout";
import useAppStore from "../../store/store";

import { verifyUser } from "../../utilities/auth";
import { transformErrorMessage } from "../../utilities/transform-text";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const setToken = useAppStore((state) => state.setToken);

  useEffect(() => () => toast.closeAll(), [toast]);

  const appStore = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (appStore.user.isVerified) {
      navigate("/");
    }
  }, [appStore.user.isVerified]);
  const onSubmit = async (data: UserRegister) => {
    try {
      setLoading(true);
      const response = await AuthAPI.register(data);

      if (response && response.data) {
        appStore.setAuthMethod(response.data.method);
        appStore.setName(data.name);

        localStorage.setItem(localStorageKeys.jwtToken, response.data.token);
        setToken(response.data.token);
      }

      if (await verifyUser(response.data.token)) {
        appStore.setIsVerified(true);
      }
    } catch (error) {
      appStore.setIsVerified(false);
      if (axios.isAxiosError(error)) {
        const message = error?.response?.data?.message;

        if (typeof message === "string") {
          let filteredErrorMessage = message;

          if (message.includes("key")) {
            filteredErrorMessage =
              "This email address is already taken, login or register with another email address!";
          } else {
            filteredErrorMessage =
              transformErrorMessage(filteredErrorMessage) ?? "";
          }

          if (!toast.isActive(filteredErrorMessage)) {
            toast({
              id: filteredErrorMessage,
              position: "top",
              title: "Error",
              description: filteredErrorMessage,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }
    }
    setLoading(false);
  };

  if (loading) {
    return <FullScreenSpinner />;
  }

  if (appStore.user.isVerified) {
    return null;
  }

  return (
    <AuthLayout
      method="Register"
      onClick={() => onSubmit({ name, email, password })}
      setPassword={setPassword}
      setEmail={setEmail}
    >
      <FormLabel w="100%" htmlFor="name">
        Name
        <Input
          onChange={(event) => {
            setName(event.target.value);
          }}
          borderColor="gray.400"
          _hover={{
            borderColor: "gray.500",
          }}
          isRequired
          id="email"
          type="email"
        />
      </FormLabel>
    </AuthLayout>
  );
};
export default Register;
