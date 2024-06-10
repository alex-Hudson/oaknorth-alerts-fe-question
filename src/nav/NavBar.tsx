import * as React from "react";
import {
  Link,
  Box,
  Flex,
  FlexProps,
  Text,
  TextProps,
  Stack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../theme/ColorModeSwitcher";

interface NavBarProps extends NavBarContainerProps {}

function NavBar({ ...props }: NavBarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <Text>ONci</Text>
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
}

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="primary.700"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="primary.700"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
}

function MenuToggle({ toggle, isOpen }: MenuToggleProps) {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
}

interface MenuItemProps extends Omit<TextProps, "display"> {
  children: React.ReactNode;
  isLast?: boolean;
  to: string;
}

function MenuItem({ children, isLast, to = "/", ...rest }: MenuItemProps) {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
}

interface MenuLinksProps {
  isOpen?: boolean;
}

function MenuLinks({ isOpen }: MenuLinksProps) {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">
          <Text>Home</Text>
        </MenuItem>
        <MenuItem to="/borrowers">
          <Text>Borrowers</Text>
        </MenuItem>
        <MenuItem to="/alerts" isLast>
          <Text>Alerts</Text>
        </MenuItem>
        <ColorModeSwitcher />
      </Stack>
    </Box>
  );
}

interface NavBarContainerProps extends FlexProps {
  children?: React.ReactNode;
}

function NavBarContainer({ children, ...props }: NavBarContainerProps) {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      {...props}
    >
      {children}
    </Flex>
  );
}

export default NavBar;
