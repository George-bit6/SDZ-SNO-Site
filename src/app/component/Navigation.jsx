import { Tabs } from "@chakra-ui/react";
import "../../styles/fonts.css";

export default function Navigation() {
  return (
            <header>
              <Tabs.Root fontFamily={"Bebas"} backdropBlur={"3xl"} display={"flex"} justifyContent={"center"}  size={"md"} variant={"ghost"}>
                <Tabs.List gap={2}>
                  <Tabs.Trigger fontSize={"md"} value="church">Church</Tabs.Trigger>
                  <Tabs.Trigger fontSize={"md"} value="sections">Sections</Tabs.Trigger>
                  <Tabs.Trigger  value="home" fontSize={"3xl"} fontWeight={"medium"}>SDZ</Tabs.Trigger>
                  <Tabs.Trigger fontSize={"md"} value="contactUs">Contact Us</Tabs.Trigger>
                  <Tabs.Trigger fontSize={"md"} value="logOut">Log Out</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            
          </header>
  );
}
