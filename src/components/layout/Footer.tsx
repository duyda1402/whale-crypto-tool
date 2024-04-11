import { Text } from "@mantine/core";

type Props = {};

const Footer = ({}: Props) => {
  return (
    <Text fz="xs" color="gray.6">
      Built by {import.meta.env.VITE_AUTHOR} with version{" "}
      {import.meta.env.VITE_VERSION}
    </Text>
  );
};

export default Footer;
