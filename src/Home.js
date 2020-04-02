import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Papa = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 150px;
  height: 100px;
  color: white;
  background-color: black;
`;

const Home = () => {
  return (
    <div>
      <Papa>
        <h1>Welcome to Lambda Pizza! </h1>
      </Papa>
      <Papa>
        <p> Welcome to where legends come to refuel!</p>
      </Papa>
      <Papa>
        <Link to={`/Pizza`}>
          <Button> Click to order!</Button>
        </Link>
      </Papa>
    </div>
  );
};

export default Home;
