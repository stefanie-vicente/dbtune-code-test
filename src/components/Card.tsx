import React from "react";
import styled from "styled-components";

interface CardProps {
  children: any;
}

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 50px;
  max-height: 500px;
  max-width: 1000px;
`;

const Card: React.FC<CardProps> = ({ children }) => {
  return <CardContainer>{children}</CardContainer>;
};

export default Card;
