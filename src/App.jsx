import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nProvider";
import { useState, createContext, useContext } from "react";
import HomePage from "./pages/HomePage.jsx";
import Donations from "./pages/Donations.jsx";
import Login from "./pages/Login.jsx";
import MemberDashboard from "./pages/member/MemberDashboard.jsx";
import LeaderDashboard from "./pages/leader/LeaderDashboard.jsx";
import MemberTasks from "./pages/member/Tasks.jsx";
import LeaderTasks from "./pages/leader/Tasks.jsx";
import MemberLeaderboard from "./pages/member/Leaderboard.jsx";
import LeaderLeaderboard from "./pages/leader/Leaderboard.jsx";
import Members from "./pages/leader/Members.jsx";
import MemberSettings from "./pages/member/Settings.jsx";
import LeaderSettings from "./pages/leader/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

// Create Sidebar Context
const SidebarContext = createContext();

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    // Return default functions if context is not available (for pages without sidebar)
    return {
      isOpen: false,
      setIsOpen: () => {},
      toggleSidebar: () => {},
      closeSidebar: () => {},
      openSidebar: () => {}
    };
  }
  return context;
};

const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prev => !prev);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const App = () => (<I18nProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/donations" element={<Donations />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/member" element={
                <SidebarProvider>
                  <MemberDashboard />
                </SidebarProvider>
              }/>
              <Route path="/member/:memberId" element={
                <SidebarProvider>
                  <MemberDashboard />
                </SidebarProvider>
              }/>
              <Route path="/member/tasks" element={
                <SidebarProvider>
                  <MemberTasks role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/member/:memberId/tasks" element={
                <SidebarProvider>
                  <MemberTasks role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/member/leaderboard" element={
                <SidebarProvider>
                  <MemberLeaderboard role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/member/:memberId/leaderboard" element={
                <SidebarProvider>
                  <MemberLeaderboard role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/member/settings" element={
                <SidebarProvider>
                  <MemberSettings role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/member/:memberId/settings" element={
                <SidebarProvider>
                  <MemberSettings role="member"/>
                </SidebarProvider>
              }/>
              <Route path="/leader" element={
                <SidebarProvider>
                  <LeaderDashboard />
                </SidebarProvider>
              }/>
              <Route path="/leader/:leaderId" element={
                <SidebarProvider>
                  <LeaderDashboard />
                </SidebarProvider>
              }/>
              <Route path="/leader/tasks" element={
                <SidebarProvider>
                  <LeaderTasks role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="/leader/:leaderId/tasks" element={
                <SidebarProvider>
                  <LeaderTasks role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="/leader/leaderboard" element={
                <SidebarProvider>
                  <LeaderLeaderboard role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="/leader/:leaderId/leaderboard" element={
                <SidebarProvider>
                  <LeaderLeaderboard role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="/leader/members" element={
                <SidebarProvider>
                  <Members />
                </SidebarProvider>
              }/>
              <Route path="/leader/:leaderId/members" element={
                <SidebarProvider>
                  <Members />
                </SidebarProvider>
              }/>
              <Route path="/leader/settings" element={
                <SidebarProvider>
                  <LeaderSettings role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="/leader/:leaderId/settings" element={
                <SidebarProvider>
                  <LeaderSettings role="leader"/>
                </SidebarProvider>
              }/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
);
export default App;
export { useSidebar };
