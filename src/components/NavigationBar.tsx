import { FC, useState } from "react";
import styled from "styled-components";

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
  width: 10vw;
  background-color: #444;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: left 0.3s ease;
  z-index: 1000;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  font-size: 1.5rem;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const NavigationBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <NavbarContainer>
        <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>
      </NavbarContainer>
      <SideDrawer $show={menuOpen}>
        <CloseButton onClick={closeMenu}>&times;</CloseButton>
      </SideDrawer>
    </>
  );
};

export default NavigationBar;
