import {
  Box,
  ButtonProps,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import AuthInfo from "../components/Auth/AuthInfo";
import AuthButton from "../components/Auth/AuthButton";
import PasswordField from "../components/PasswordField";

interface AuthLayoutProps extends ButtonProps {
  method: "Log in" | "Register";
  setEmail: (value: React.SetStateAction<string>) => void;
  setPassword: (value: React.SetStateAction<string>) => void;
}
const AuthLayout = ({
  method,
  setEmail,
  setPassword,
  children,
  ...otherProps
}: AuthLayoutProps) => {
  const background = useColorModeValue("white", "gray.700");
  return (
    <Flex pt={["1em", 0]} alignItems={["start", "center"]} h="100%">
      <Container maxW="lg">
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <AuthInfo method={method} />
            </Stack>
          </Stack>
          <Box
            py={{ base: "4", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={useBreakpointValue({ base: background })}
            boxShadow={{ base: "sm", sm: useColorModeValue("lg", "dark-lg") }}
            borderRadius={{ base: "xl", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl mb={-6}>
                  {children}
                  <FormLabel w="100%" htmlFor="email">
                    Email
                    <Input
                      onChange={(event) => setEmail(event.target.value)}
                      borderColor="gray.400"
                      _hover={{
                        borderColor: "gray.500",
                      }}
                      isRequired
                      id="email"
                      type="email"
                    />
                  </FormLabel>
                </FormControl>
                <PasswordField
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Stack>
            </Stack>
            <Stack mt={5}>
              <AuthButton
                name={method === "Register" ? "Sign up" : method}
                {...otherProps}
              />
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Flex>
  );
};

export default AuthLayout;
