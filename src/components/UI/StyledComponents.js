import styled from "styled-components";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

export const Container = styled.div`
  width:700px;
  position: absolute;
  left: 20%;
  //
  @media(max-width: 768px){
    left: 0;
    width:auto;
    padding: 10px;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  column-gap: 10px;
  width: 100%;

  @media(max-width: 768px){
    width:auto;
    column-gap: 5px;
    font-size: 20px;
  }
`

export const GridElementLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  
  &.hovered:hover{
    background-color: #fad0ec;
  }

  @media(max-width: 768px){
    width:auto;
  }
`

export const GridElementRight = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  text-align: right;
  //padding-top: 16px;
  //height: fit-content;
`

export const GridElementRightButtons = styled(GridElementRight)`
  padding-top: 16px;
`

export const HoverMessage = styled.div`
  display: none;
  ${Container}:hover & {
    display: block;
  }
`;

export const StyledButton = styled(Button)`
  margin-left: 2rem;

  @media(max-width: 768px){
    margin-left: 0.4rem;
  }
`

export const NavBar = styled.ul`

    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    height: 72px;
    
`

export const NavBarLink = styled.li`
    float: left;
    line-height: 72px;
    
    
`

export const NavBarLinkRight = styled.li`
    float: right;
`

export const StyledLink = styled(Link)`
  display: block;
  color: white;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
  

  &:hover {
    background-color: #111;
`
export const A = styled.a`

  display: block;
  color: white;
  text-align: center;
  padding: 8px 16px;
  text-decoration: none;
  
  &:hover {
  background-color: #111;
}
`

export const LoginP = styled.p`
  margin: 12px 0 0 0;
  color: white;
  @media(max-width: 768px){
    font-size: 15px;
  }
  
`

export const LoginAbsolute = styled.div`
  position: absolute;
  top: 19%;
  left: 39%;
  padding: 20px;
  border: groove;

  @media(max-width: 768px){
    left: 6px;
    border: none;
  }
`

