import React from "react";
import useApplication from "../hooks/useApplication";

import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 5px #aaa;
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home = () => {
  const app = useApplication();
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HomeContent>
        <Search />
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;
