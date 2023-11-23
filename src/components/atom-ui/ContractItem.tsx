import { ActionIcon, Box, Group, ThemeIcon, Text } from "@mantine/core";
import { ContractIF } from "../../common/types";
import { IconCheck, IconLockCog, IconTrash } from "@tabler/icons-react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import { useSelector } from "react-redux";
import { RootState } from "../../libs/store";
import { useState } from "react";

type ContractItemProps = {
  contract: ContractIF;
  onSelect?: () => void;
  uidActive?: string;
  onDelete?: () => void;
};
const ContractItem = ({
  contract,
  onSelect,
  uidActive,
  onDelete,
}: ContractItemProps) => {
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.selector);
  return (
    <Box
      px="xl"
      pos="relative"
      onMouseEnter={() => setIsShowDelete(true)}
      onMouseLeave={() => setIsShowDelete(false)}
    >
      {selector.network?.uid === contract.uid && (
        <ThemeIcon
          pos="absolute"
          top={0}
          left={-8}
          variant="outline"
          color="green"
          sx={{ borderWidth: 0 }}
        >
          <IconCheck size="1.25rem" />
        </ThemeIcon>
      )}
      {/* View network item */}
      <Group onClick={onSelect} spacing="sm" noWrap sx={{ cursor: "pointer" }}>
        <Box>
          <Jazzicon diameter={38} seed={jsNumberForAddress(contract.address)} />
        </Box>
        <Box>
          <Text fw={contract.uid === uidActive ? 600 : 400} color="gray.7">
            {contract?.name}
          </Text>
          <Text fz="sm" color="gray.5" lineClamp={1}>
            {contract?.address}
          </Text>
        </Box>

        {contract?.isSystem && (
          <ThemeIcon variant="outline" color="gray" sx={{ borderWidth: 0 }}>
            <IconLockCog size="1rem" />
          </ThemeIcon>
        )}
      </Group>
      {/* Delete network item */}
      {!contract.isSystem && isShowDelete && (
        <ActionIcon
          color="red"
          onClick={onDelete}
          pos="absolute"
          top={0}
          right={-8}
        >
          <IconTrash size="1.125rem" />
        </ActionIcon>
      )}
    </Box>
  );
};

export default ContractItem;
