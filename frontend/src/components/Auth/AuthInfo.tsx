import { Link } from "react-router-dom";
import {
  Button,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

interface AuthInfoProps {
  method: "Log in" | "Register";
}

const AuthInfo = ({ method }: AuthInfoProps) => {
  const to = method === "Register" ? "/login" : "/register";

  return (
    <>
      <Heading
        as="h1"
        size={useBreakpointValue({ base: "md", sm: "lg" })}
        sx={{
          textAlign: ["left", "center"],
        }}
      >
        {method === "Log in"
          ? `${method} to your account`
          : `${method} an account`}
      </Heading>
      <HStack spacing="1" justify={["left", "center"]}>
        <Text color="muted">
          {method === "Log in" ? `Don't have an account?` : `Already an user?`}
        </Text>

        <Button as={Link} to={to} variant="link" colorScheme="blue">
          {method === "Log in" ? "Register" : "Log in"}
        </Button>
      </HStack>
    </>
  );
};

export default AuthInfo;
