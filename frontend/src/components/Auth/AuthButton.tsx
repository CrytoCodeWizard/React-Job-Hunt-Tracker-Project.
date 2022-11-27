import { Button, ButtonProps } from "@chakra-ui/react";

interface AuthButtonProps extends ButtonProps {
  name: string;
}

const AuthButton = ({ name, ...otherProps }: AuthButtonProps) => {
  return (
    <Button
      bg="blue.300"
      _hover={{
        background: "blue.200",
      }}
      variant="solid"
      type="submit"
      {...otherProps}
    >
      {name}
    </Button>
  );
};

export default AuthButton;
