import { Tabs } from "@chakra-ui/react";
import "../../styles/fonts.css";


const styles = {

  fontSize: "md",
  color: "white"
}

const sdzStyles = {

  color: "white",
  fontSize:"3xl", 
  fontWeight:"medium"

}

const rootStyles = {

  bg:"gray.900", 
  fontFamily:"Bebas", 
  backdropBlur:"3xl",
  display:"flex",  
  size:"md", 
  width:"full",
  height: "60px", 
  variant:"ghost"

}

const listStyles = {

  width:"full", 
  alignItems:"center", 
  justifyContent:"space-evenly"

}



export default function Navigation() {
  return (
            <header>
              <Tabs.Root {...rootStyles}>
                <Tabs.List {...listStyles}>
                  <Tabs.Trigger {...styles} value="church">Church</Tabs.Trigger>
                  <Tabs.Trigger {...styles} value="sections">Sections</Tabs.Trigger>
                  <Tabs.Trigger {...sdzStyles} value="home">SDZ</Tabs.Trigger>
                  <Tabs.Trigger {...styles} value="contactUs">Contact Us</Tabs.Trigger>
                  <Tabs.Trigger {...styles} value="logOut">Log Out</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            
          </header>
  );
}
