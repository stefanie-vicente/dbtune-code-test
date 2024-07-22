import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick?: () => void;
  children: any;
}

const StyledButton = styled.button<ButtonProps>`
  background: dodgerblue;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 15px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  flex: 1;
  justify-content: center;
  margin-bottom: 30px;
  max-width: 150px;

  &:hover {
    background: mediumblue;
  }
`;

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
