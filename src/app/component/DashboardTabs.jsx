import { Tabs } from "@chakra-ui/react";

export default function DashboardTabs(){

    return <Tabs.Root lazyMount unmountOnExit bg={"bg.muted"} variant={"plain"} defaultValue="dashboard" rounded={"full"} width={"clamp(400px, 60vw, 600px)"} css={{
          "--tabs-indicator-bg": "colors.red.600",
          "--tabs-indicator-shadow": "shadows.xl",
          "--tabs-indicator-color": "white",
        }}>
          <Tabs.List display={"flex"} justifyContent={"space-evenly"}>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="tasks">Tasks</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="troop">Troop</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="dashboard">Dashboard</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="content">Content</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="settings">Settings</Tabs.Trigger>
            <Tabs.Indicator rounded={"full"} color={"red"}/>
          </Tabs.List>
</Tabs.Root>
}

