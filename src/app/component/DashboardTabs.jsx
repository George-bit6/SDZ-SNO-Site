import { Tabs } from "@chakra-ui/react";

export default function DashboardTabs(){

    return <Tabs.Root lazyMount unmountOnExit bg={"bg.muted"} rounded={"full"} variant={"plain"} defaultValue="dashboard" css={{
          "--tabs-indicator-bg": "colors.red.600",
          "--tabs-indicator-shadow": "shadows.xl",
          "--tabs-indicator-color": "white",
        }}>
          <Tabs.List gap={"8"}  >
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="dashboard">Dashboard</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="tasks">Tasks</Tabs.Trigger>
            <Tabs.Trigger fontWeight={"semibold"} _selected={{color: "white"}} value="settings">Settings</Tabs.Trigger>
            <Tabs.Indicator rounded={"full"} color={"red"}/>
          </Tabs.List>
</Tabs.Root>
}

