import React from 'react';
import styled from 'styled-components';


const StyledSideBar = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: rgba(0, 0, 0, 0.87);
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const SideBar = ({open}) => {
  return (
    <StyledSideBar open={open}>
      <li>Notifications</li>
      <li>Success Stories</li>
      <li>Technology</li>
      <li>Press</li>
      <li>Careers</li>
      <li>Schedule A Demo</li>
    </StyledSideBar>
  )
}

export default SideBar;