import styled from "styled-components";

const Footer = () => {
  return <Root>All rights reserved.</Root>;
};

const Root = styled.div`
  background: #e53e3e;
  display: grid;
  height: 50px;
  place-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
`;

export default Footer;
