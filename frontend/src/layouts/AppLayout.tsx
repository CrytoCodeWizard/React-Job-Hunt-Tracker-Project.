import { Box, BoxProps } from "@chakra-ui/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type AppLayoutProps = BoxProps;

const AppLayout = ({ children }: AppLayoutProps) => {
  const [parent] = useAutoAnimate<HTMLInputElement>();

  return (
    <Box
      ref={parent}
      h="100vh"
      background={"gray.100"}
      overflowY="auto"
      overflowX="hidden"
    >
      {children}
    </Box>
  );
};

export default AppLayout;
