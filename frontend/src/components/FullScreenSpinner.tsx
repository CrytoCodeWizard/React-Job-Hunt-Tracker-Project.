import { Container, Flex, Spinner } from "@chakra-ui/react";

const FullScreenSpinner = () => {
  return (
    <Flex
      background={"gray.100"}
      h="100vh"
      justify={"center"}
      alignItems="center"
    >
      <Container>
        <Flex justify={"center"} alignItems="center">
          <Spinner
            h="100px"
            w="100px"
            thickness="10px"
            speed="1.25s"
            emptyColor="gray.400"
            color="blue.500"
          />
        </Flex>
      </Container>
    </Flex>
  );
};

export default FullScreenSpinner;
