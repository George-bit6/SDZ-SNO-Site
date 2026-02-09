import Navigation from "../component/Navigation"
import UserCreds from "../component/UserCreds"
import DashboardTabs from "../component/DashboardTabs"
import TaskList from "../component/TaskList"
import { VStack } from "@chakra-ui/react"

export default function UserProfile({User, tasks}){

    return <>
            <Navigation></Navigation>
            <VStack height={"fit"} gap={"8"}>
            <UserCreds {...User}></UserCreds>
            <DashboardTabs></DashboardTabs>
            <TaskList {...tasks}></TaskList>
            </VStack>
    </>

}
