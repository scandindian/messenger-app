import { FC, useState } from "react";
import styled from "styled-components";
import FriendsList from "./FriendsList";

interface SideDrawerProps {
  $show: boolean;
}

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: #fff;
`;

const MenuToggle = styled.div`
  display: block;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SideDrawer = styled.div<SideDrawerProps>`
  position: fixed;
  left: ${(props) => (props.$show ? "0" : "-100%")};
  height: 100%;
  width: 250px;
  background-color: #444;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: left 0.3s ease;
  z-index: 1000;
`;

const Overlay = styled.div<SideDrawerProps>`
  display: ${(props) => (props.$show ? "block" : "none")};
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const NavigationBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>
      </NavbarContainer>
      <Overlay $show={menuOpen} onClick={closeMenu} />
      <SideDrawer $show={menuOpen}>
        <FriendsList />
      </SideDrawer>
    </>
  );
};

export default NavigationBar;
