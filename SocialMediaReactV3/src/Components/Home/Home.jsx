import styled from "styled-components"
import Nav from "./Nav"
import GETPosts from "./GetPosts"
import POSTPost from "./POSTPost"

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
  }

`
const NavWrapper = styled.div `
    width: 100%;
    bottom: 0;
    position: fixed;
    z-index: 999;
`

const Home = () => {
    return (
    
<PageWrapper>
    <ContentWrapper>
        <POSTPost />
        <GETPosts />
    </ContentWrapper>

    <NavWrapper>
       <Nav /> 
    </NavWrapper>
    
</PageWrapper>  
     
    )
}

export default Home