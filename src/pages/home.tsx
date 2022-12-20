import React from "react";
import useApplication from "../hooks/useApplication";

import { useNavigate } from "react-router-dom";
import Search from "../components/Search";
import styled from "styled-components";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        <Search type="generic" />
      </HomeContent>
    </HomeContainer>
  );
};

export default Home;
