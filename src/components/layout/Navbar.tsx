import {
  Avatar,
  Center,
  Image,
  Menu,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconAffiliateFilled,
  IconAppsFilled,
  IconFileFilled,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSettingsFilled,
  IconVersionsFilled,
} from "@tabler/icons-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { KEY_MENU_ACTIVE, NAVBAR_WIDTH } from "../../common";
import { PATH_ROUTER_BASE } from "../../common/enum/base";
import useAuthFirebase from "../../hooks/useAuthFirebase";
import myLogo from "/logo.svg";

const useStyles = createStyles((theme) => ({
  navbar: {
    width: rem(NAVBAR_WIDTH),
    height: "100vh",
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    borderWidth: rem(1),
    borderStyle: "solid",
    borderColor: theme.colors.gray[3],
  },

  itemMenu: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.colors.gray[7],
    //  "light-dark(var(--mantine-color-gray-7), var(--mantine-color-dark-0))",

    "&:hover": {
      backgroundColor: theme.colors.gray[1],
      //    "light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-5))",
    },
  },
  active: {
    backgroundColor: theme.colors.blue[0],
    color: theme.colors.blue[5],
  },

  navbarMenu: {
    flex: 1,
    marginTop: rem(50),
  },
}));

const mockMenu = [
  { icon: IconAppsFilled, label: "Home", link: PATH_ROUTER_BASE.HOME_PAGE },
  {
    icon: IconAffiliateFilled,
    label: "Network",
    link: PATH_ROUTER_BASE.NETWORK_PAGE,
  },
  {
    icon: IconFileFilled,
    label: "Contract",
    link: PATH_ROUTER_BASE.CONTRACT_PAGE,
  },
  { icon: IconVersionsFilled, label: "ABI", link: PATH_ROUTER_BASE.ABI_PAGE },
  {
    icon: IconSettingsFilled,
    label: "Settings",
    link: PATH_ROUTER_BASE.SETTING_PAGE,
  },
];

const NavbarRoot = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(
    localStorage.getItem(KEY_MENU_ACTIVE) || "$home"
  );
  const authFirebase = useAuthFirebase();
  const menus = mockMenu.map((menu, index) => (
    <NavbarLink
      {...menu}
      key={index}
      isActive={active === (menu.link.split("/")[1] || "$home")}
      onClick={() => {
        setActive(menu.link.split("/")[1] || "$home");
        return navigate(menu.link);
      }}
    />
  ));

  return (
    <Navbar className={classes.navbar}>
      <Center>
        <Link to={"/"}>
          <Image height={40} width={40} src={myLogo} alt="logo" />
        </Link>
      </Center>

      <div className={classes.navbarMenu}>
        <Stack justify="center" spacing={rem(4)}>
          {menus}
        </Stack>
      </div>

      <Stack justify="center" spacing={rem(4)}>
        <Menu shadow="md" width={200} position="right-end">
          <Menu.Target>
            <Tooltip
              label={authFirebase?.user?.displayName}
              position="right-start"
            >
              <Avatar radius={999} src={authFirebase?.user?.photoURL}>
                {authFirebase?.user?.displayName?.at(0)}
              </Avatar>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{authFirebase?.user?.displayName}</Menu.Label>
            <Menu.Item
              onClick={() => navigate("/personal")}
              icon={<IconSettings size={14} />}
            >
              Settings
            </Menu.Item>

            {/* <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Transfer my data
            </Menu.Item> */}
            <Menu.Item
              color="red"
              icon={<IconLogout size={14} />}
              onClick={authFirebase.logoutFirebase}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    </Navbar>
  );
};

export default NavbarRoot;

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  isActive?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, isActive, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.itemMenu, { [classes.active]: isActive })}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}
