import { Heading, Avatar,For, VStack, Checkbox, Fieldset, CheckboxGroup} from "@chakra-ui/react";
import Navigation from "./component/Navigation";
import DashboardTabs from "./component/DashboardTabs";
import TaskList from "./component/TaskList";

let User = {

  firstName: "George",
  lastName: "Bou Faysal",
  color: "red.700",

}

export default function App() {
  return (
    <>
      <Navigation></Navigation>
      <VStack height={"fit"} gap={"8"}>
      <VStack height={"240px"}  gap={"4"} justifyContent={"center"}>
          <Avatar.Root size="2xl" variant={"solid"}>
            <Avatar.Fallback  name={User.firstName + " " + User.lastName}/>
          </Avatar.Root>
          <Heading size = "3xl"> George Bou Faysal</Heading>          
          <Heading size = "2xl" color={User.color} fontWeight={"semibold"}> ROVER </Heading>
        </VStack>
      <DashboardTabs></DashboardTabs>
      <TaskList tasksTitle={"Scout Task"} taskList={["Build a Campfire", "Know the 16 directions", "Participate in 3 camps", "Know the organization of a camp"]} ></TaskList>
      
      
      
      
          
      
      </VStack>
    </>
  );
}
