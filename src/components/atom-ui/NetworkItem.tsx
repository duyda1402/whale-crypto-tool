import { ActionIcon, Avatar, Group, Text, ThemeIcon } from "@mantine/core";
import { IconCheck, IconLockCog, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { NetworkIF } from "../../common/types";
import { RootState } from "../../libs/store";

type NetworkItemProps = {
  network: NetworkIF;
  onSelect?: () => void;
  uidActive?: string;
  onDelete?: () => void;
};
const NetworkItem = ({
  network,
  onSelect,
  uidActive,
  onDelete,
}: NetworkItemProps) => {
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const selector = useSelector((state: RootState) => state.selector);
  return (
    <Group
      px="xl"
      pos="relative"
      noWrap
      onMouseEnter={() => setIsShowDelete(true)}
      onMouseLeave={() => setIsShowDelete(false)}
    >
      {selector.network?.uid === network.uid && (
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
      <Group onClick={onSelect} noWrap sx={{ cursor: "pointer" }}>
        <Avatar src={network?.icon} radius="xl" size="sm">
          {network?.networkName?.at(0)?.toLocaleUpperCase()}
        </Avatar>
        <Text fw={network.uid === uidActive ? 600 : 400} color="gray.7">
          {network?.networkName}
        </Text>
        {network?.isSystem && (
          <ThemeIcon variant="outline" color="gray" sx={{ borderWidth: 0 }}>
            <IconLockCog size="1rem" />
          </ThemeIcon>
        )}
      </Group>
      {/* Delete network item */}
      {!network.isSystem && isShowDelete && onDelete && (
        <ActionIcon color="red" onClick={onDelete}>
          <IconTrash size="1.125rem" />
        </ActionIcon>
      )}
    </Group>
  );
};

export default NetworkItem;
