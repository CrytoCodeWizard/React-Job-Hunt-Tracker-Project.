import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type AppLayoutProps = BoxProps;

const AppLayout = ({ children }: AppLayoutProps) => {
  const [parent] = useAutoAnimate<HTMLInputElement>();
  const background = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      ref={parent}
      h="100vh"
      background={background}
      overflowY="auto"
      overflowX="hidden"
    >
      {children}
    </Box>
  );
};

export default AppLayout;
