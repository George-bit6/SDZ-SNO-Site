import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nProvider";
import HomePage from "./pages/HomePage.jsx";
import Donations from "./pages/Donations.jsx";
import Login from "./pages/Login.jsx";
import MemberDashboard from "./pages/MemberDashboard.jsx";
import LeaderDashboard from "./pages/LeaderDashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";
import Members from "./pages/Members.jsx";
import Settings from "./pages/Settings.jsx";
import NotFound from "./pages/NotFound.jsx";
const queryClient = new QueryClient();
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
              <Route path="/member" element={<MemberDashboard />}/>
              <Route path="/member/:memberId" element={<MemberDashboard />}/>
              <Route path="/member/tasks" element={<Tasks role="member"/>}/>
              <Route path="/member/leaderboard" element={<Leaderboard role="member"/>}/>
              <Route path="/leader" element={<LeaderDashboard />}/>
              <Route path="/leader/:leaderId" element={<LeaderDashboard />}/>
              <Route path="/leader/tasks" element={<Tasks role="leader"/>}/>
              <Route path="/leader/leaderboard" element={<Leaderboard role="leader"/>}/>
              <Route path="/leader/members" element={<Members />}/>
              <Route path="/settings" element={<Settings />}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
);
export default App;
