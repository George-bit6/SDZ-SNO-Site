import { Tabs } from "@chakra-ui/react";

export default function Navigation() {
  return (
            <header>
              <Tabs.Root display={"flex"} justifyContent={"center"} size={"md"} variant={"ghost"}>
                <Tabs.List gap={2}>
                  <Tabs.Trigger value="church">Church</Tabs.Trigger>
                  <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
                  <Tabs.Trigger value="home" fontSize={"xl"} fontWeight={"bold"}>SDZ</Tabs.Trigger>
                  <Tabs.Trigger value="contactUs">Contact Us</Tabs.Trigger>
                  <Tabs.Trigger value="logOut">Log Out</Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            
          </header>
  );
}
