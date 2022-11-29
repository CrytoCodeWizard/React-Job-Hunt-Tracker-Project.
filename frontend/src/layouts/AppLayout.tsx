import { Box, BoxProps } from "@chakra-ui/react";

type AppLayoutProps = BoxProps;

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Box h="100vh" background={"gray.100"} overflowY="auto">
      {children}
    </Box>
  );
};

export default AppLayout;
