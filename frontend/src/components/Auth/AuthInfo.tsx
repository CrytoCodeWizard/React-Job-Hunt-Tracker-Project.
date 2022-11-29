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
        color="blue.600"
        as="h1"
        textAlign={["left", "center"]}
        fontSize={["2rem", "3rem"]}
      >
        Job Hunt Tracker
      </Heading>

      <Heading
        as="h2"
        size={useBreakpointValue({ base: "md", sm: "lg" })}
        textAlign={["left", "center"]}
      >
        {method === "Log in"
          ? `${method} to your account`
          : `${method} an account`}
      </Heading>
      <HStack spacing="1" justify={["left", "center"]}>
        <Text color="muted">
          {method === "Log in" ? `Don't have an account?` : `Already a user?`}
        </Text>

        <Button as={Link} to={to} variant="link" colorScheme="blue">
          {method === "Log in" ? "Register" : "Log in"}
        </Button>
      </HStack>
    </>
  );
};

export default AuthInfo;
