import {
  Center,
  Image,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";

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
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

const NavbarRoot = () => {
  const { classes } = useStyles();
  const [active, setActive] = useState(0);

  const links = mockMenu.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      isActive={active === index}
      onClick={() => setActive(index)}
    />
  ));
  return (
    <nav className={classes.navbar}>
      <Center>
        <Image height={40} width={40} src={myLogo} alt="logo" />
      </Center>

      <div className={classes.navbarMenu}>
        <Stack justify="center" spacing={rem(4)}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" spacing={rem(4)}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
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
