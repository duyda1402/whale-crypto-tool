import { Center, Image, Stack } from "@mantine/core";
import myLogo from "/logo.svg";
import "./style.css";

const LoadingOverlaySystem = () => {
  return (
    <Center h="100vh" w="100vw">
      <Stack align="center" spacing={0}>
        <Image src={myLogo} height={44} width={44} />
        <div className="loader"></div>
      </Stack>
    </Center>
  );
};

export default LoadingOverlaySystem;
