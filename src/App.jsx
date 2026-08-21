import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/i18n/I18nProvider";
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
              <Route path="/member/tasks" element={<MemberTasks role="member"/>}/>
              <Route path="/member/:memberId/tasks" element={<MemberTasks role="member"/>}/>
              <Route path="/member/leaderboard" element={<MemberLeaderboard role="member"/>}/>
              <Route path="/member/:memberId/leaderboard" element={<MemberLeaderboard role="member"/>}/>
              <Route path="/member/settings" element={<MemberSettings role="member"/>}/>
              <Route path="/member/:memberId/settings" element={<MemberSettings role="member"/>}/>
              <Route path="/leader" element={<LeaderDashboard />}/>
              <Route path="/leader/:leaderId" element={<LeaderDashboard />}/>
              <Route path="/leader/tasks" element={<LeaderTasks role="leader"/>}/>
              <Route path="/leader/:leaderId/tasks" element={<LeaderTasks role="leader"/>}/>
              <Route path="/leader/leaderboard" element={<LeaderLeaderboard role="leader"/>}/>
              <Route path="/leader/:leaderId/leaderboard" element={<LeaderLeaderboard role="leader"/>}/>
              <Route path="/leader/members" element={<Members />}/>
              <Route path="/leader/:leaderId/members" element={<Members />}/>
              <Route path="/leader/settings" element={<LeaderSettings role="leader"/>}/>
              <Route path="/leader/:leaderId/settings" element={<LeaderSettings role="leader"/>}/>
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nProvider>
);
export default App;
