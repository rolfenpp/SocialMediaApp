import styled from "styled-components";
import Nav from "./Nav";
import GETPosts from "./WallPosts";
import POSTPost from "./POSTPost";
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of BrowserRouter
import Profile from "./Profile";
import WallPage from "./WallPage";

const PageWrapper = styled.div `
    display: flex;
    justify-content: center;

    @media (max-width: 600px) {
    width: 600px;
  }

`
const ContentWrapper = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    @media (min-width: 600px) {
    width: 550px;
  };
`

const Home = () => {
    return (
      <PageWrapper>
        <ContentWrapper>
          <Routes>
            <Route path="*" element={<WallPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ContentWrapper>
      </PageWrapper>  
    );
}

export default Home;
