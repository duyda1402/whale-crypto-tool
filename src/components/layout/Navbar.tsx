import {
  Center,
  Image,
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
  IconSettingsFilled,
  IconVersionsFilled,
} from "@tabler/icons-react";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { KEY_MENU_ACTIVE } from "../../common";
import myLogo from "/logo.svg";

const useStyles = createStyles((theme) => ({
  navbar: {
    width: rem(80),
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
  { icon: IconAppsFilled, label: "Home", link: "/" },
  { icon: IconAffiliateFilled, label: "Network", link: "/network" },
  { icon: IconFileFilled, label: "Contract", link: "/contract" },
  { icon: IconVersionsFilled, label: "ABI", link: "/abi" },
  { icon: IconSettingsFilled, label: "Settings", link: "/setting" },
];

const NavbarRoot = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(
    localStorage.getItem(KEY_MENU_ACTIVE) || "$home"
  );
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
        <NavbarLink icon={IconLogout} label="Logout" />
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
