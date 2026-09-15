import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nProvider";
import { UserRoleProvider } from "@/contexts/UserRoleContext";
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
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
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
                <UserRoleProvider>
                  <SidebarProvider>
                    <MemberDashboard />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              <Route path="/member/:memberId" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <MemberDashboard />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/member/:memberId/tasks" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <MemberTasks role="member"/>
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              
              <Route path="/member/:memberId/settings" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <MemberSettings role="member"/>
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/leader/:leaderId" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <LeaderDashboard />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/leader/:leaderId/tasks" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <LeaderTasks role="leader"/>
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/leader/:leaderId/members" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <Members />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
             
              <Route path="/leader/:leaderId/settings" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <LeaderSettings role="leader"/>
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/admin/:adminId" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <AdminDashboard />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/admin/:adminId/users" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <AdminDashboard />
                  </SidebarProvider>
                </UserRoleProvider>
              }/>
              
              <Route path="/admin/:adminId/settings" element={
                <UserRoleProvider>
                  <SidebarProvider>
                    <LeaderSettings role="admin"/>
                  </SidebarProvider>
                </UserRoleProvider>
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