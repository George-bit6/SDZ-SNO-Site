import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Crest } from "@/components/Crest";
import { StatusPill } from "@/components/StatusPill";
import { Plus, Search, Users, UserPlus, Trash2, Mail } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { adminDataService } from "@/services/adminDataService";
import UserCreationDialog from "@/components/UserCreationDialog";
import DashboardPageTitle from "@/components/dashboardComponents/DashboardPageTitle";
import StatisticCards from "@/components/dashboardComponents/StatisticCards";

// Helper function to calculate age from birthdate
const calculateAge = (birthdate) => {
  if (!birthdate) return "N/A";
  const birth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const AdminDashboard = () => {
  const { t } = useI18n();
  const { adminId } = useParams();
  const location = useLocation();
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [subgroups, setSubgroups] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const accentColor = '#4A7DFF'; // Admin uses standard blue
  
  // Determine current view based on route
  const currentView = location.pathname.includes('/users') ? 'users' : 
                      location.pathname.includes('/settings') ? 'settings' : 'dashboard';

  useEffect(() => {
    let isMounted = true;

    const loadAdminData = async () => {
      try {
        setLoading(true);

        // Load admin data (using the same structure as leaders for now)
        // In a real system, you'd have a specific admin table
        const adminData = {
          id: adminId,
          fullName: 'Admin User',
          initials: 'AU',
          primaryTitle: 'System Administrator',
          subgroupName: 'Saint Demetrios SNO'
        };
        
        if (isMounted) {
          setAdmin(adminData);
        }

        // Load all users
        const allUsers = await adminDataService.getAllUsers();
        console.log('All Users:', allUsers);
        
        if (isMounted && allUsers) {
          const formattedUsers = allUsers.map(user => adminDataService.formatUserData(user));
          console.log('Formatted Users:', formattedUsers);
          setUsers(formattedUsers);
        }

        // Load subgroups for dropdown
        const allSubgroups = await adminDataService.getAllSubgroups();
        console.log('All Subgroups:', allSubgroups);
        
        if (isMounted && allSubgroups) {
          setSubgroups(allSubgroups);
        }

        // Calculate statistics (handle dual roles)
        const memberCount = allUsers?.filter(u => u.isMember).length || 0;
        const leaderCount = allUsers?.filter(u => u.isLeader).length || 0;
        const bothCount = allUsers?.filter(u => u.isMember && u.isLeader).length || 0;
        const totalCount = allUsers?.length || 0;
        
        if (isMounted) {
          setStats([
            { label: "Total Users", value: totalCount.toString(), delta: "", color: accentColor },
            { label: "Scout Members", value: memberCount.toString(), delta: "", color: '#10B981' },
            { label: "Leaders", value: leaderCount.toString(), delta: "", color: '#F59E0B' },
          ]);
        }

      } catch (error) {
        console.error("Error loading admin data:", error);
        if (isMounted) {
          setAdmin(null);
          setUsers([]);
          setStats([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, [adminId]);

  const handleCreateUser = async (userData) => {
    try {
      const result = await adminDataService.createUser(userData);
      
      if (result.success) {
        // Refresh user list
        const allUsers = await adminDataService.getAllUsers();
        const formattedUsers = allUsers.map(user => adminDataService.formatUserData(user));
        setUsers(formattedUsers);
        
        // Update statistics
        const memberCount = allUsers?.filter(u => u.role === 'member').length || 0;
        const leaderCount = allUsers?.filter(u => u.role === 'leader').length || 0;
        const totalCount = allUsers?.length || 0;
        
        setStats([
          { label: "Total Users", value: totalCount.toString(), delta: "", color: accentColor },
          { label: "Scout Members", value: memberCount.toString(), delta: "", color: '#10B981' },
          { label: "Leaders", value: leaderCount.toString(), delta: "", color: '#F59E0B' },
        ]);
        
        return result;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const result = await adminDataService.deleteUser(userId);
      
      if (result.success) {
        // Refresh user list
        const allUsers = await adminDataService.getAllUsers();
        const formattedUsers = allUsers.map(user => adminDataService.formatUserData(user));
        setUsers(formattedUsers);
        
        // Update statistics
        const memberCount = allUsers?.filter(u => u.role === 'member').length || 0;
        const leaderCount = allUsers?.filter(u => u.role === 'leader').length || 0;
        const totalCount = allUsers?.length || 0;
        
        setStats([
          { label: "Total Users", value: totalCount.toString(), delta: "", color: accentColor },
          { label: "Scout Members", value: memberCount.toString(), delta: "", color: '#10B981' },
          { label: "Leaders", value: leaderCount.toString(), delta: "", color: '#F59E0B' },
        ]);
      } else {
        alert('Failed to delete user: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.email || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesRole = roleFilter === "all";
    if (!matchesRole) {
      if (roleFilter === "both") {
        matchesRole = user.isMember && user.isLeader;
      } else if (roleFilter === "member") {
        matchesRole = user.isMember;
      } else if (roleFilter === "leader") {
        matchesRole = user.isLeader;
      }
    }
    
    return matchesSearch && matchesRole;
  });

  const adminFullName = admin?.fullName || 'Admin';
  const adminRank = admin?.primaryTitle || 'System Administrator';
  const adminSubgroup = admin?.subgroupName || 'Saint Demetrios SNO';

  return (
    <div className="min-h-screen flex bg-[#F4F6FB]">
      {/* Left navigation panel for admin role. */}
      <AppSidebar role="admin" accentColor={accentColor}/>

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 lg:ml-0">
        {/* Top header bar with user name, rank, subgroup, and initials badge. */}
        <Topbar 
          name={adminFullName} 
          rank={adminRank} 
          subgroup={adminSubgroup} 
          initials={admin?.initials || "AD"} 
          accentColor={accentColor} 
        />

        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8">
          
          <DashboardPageTitle 
            title={currentView === 'users' ? "User Management" : currentView === 'settings' ? "Admin Settings" : "Admin Dashboard"} 
            subtitle={currentView === 'users' ? "Manage all system users and accounts" : currentView === 'settings' ? "Configure admin settings" : "System overview and statistics"} 
            accentColor={accentColor}
          >
            {currentView === 'users' && (
              <Button 
                variant="ds-primary" 
                size="sm"
                onClick={() => setIsUserDialogOpen(true)}
              >
                <UserPlus /> Add New User
              </Button>
            )}
          </DashboardPageTitle>

          {/* Top statistic cards showing user counts. */}
          <StatisticCards stats={stats} accentColor={accentColor} />

          {/* User management section - show on dashboard and users view */}
          {(currentView === 'dashboard' || currentView === 'users') && (
            <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
              <header className="px-6 py-4 border-b border-[#E8ECF4] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-[#4A7DFF]"/>
                  <h2 className="text-[18px] font-semibold text-[#253858]">All Users</h2>
                  <span className="text-xs text-[#8A94A6]">· {filteredUsers.length}</span>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Role Filter */}
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                  >
                    <option value="all">All Roles</option>
                    <option value="member">Scout Members Only</option>
                    <option value="leader">Leaders Only</option>
                    <option value="both">Both Roles</option>
                  </select>

                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute top-1/2 -translate-y-1/2 start-2.5 size-3.5 text-[#8A94A6]"/>
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
                      className="bg-[#F4F6FB] border border-[#E8ECF4] rounded-xl ps-8 pe-3 py-2 text-xs w-56 focus:outline-none focus:border-[#4A7DFF] focus:ring-1 focus:ring-[#4A7DFF]/40"
                    />
                  </div>
                </div>
              </header>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F4F6FB]/50">
                    <tr className="text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                      <th className="py-3 px-6 font-medium text-start">User</th>
                      <th className="py-3 px-2 font-medium text-start">Role</th>
                      <th className="py-3 px-2 font-medium text-start">Email</th>
                      <th className="py-3 px-2 font-medium text-start">Age</th>
                      <th className="py-3 px-2 font-medium text-start">Subgroup/Unit</th>
                      <th className="py-3 px-2 font-medium text-start">Created</th>
                      <th className="py-3 px-2 font-medium text-start">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t border-[#E8ECF4] hover:bg-[#F4F6FB]/40 transition-colors">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <Crest initials={user.initials} variant="muted" className="size-9"/>
                            <div className="min-w-0">
                              <p className="font-medium leading-tight text-[#1E2A45]">{user.fullName}</p>
                              <p className="text-xs text-[#8A94A6]">{user.city || 'Unknown'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <StatusPill 
                            status={user.role === 'both' ? 'active' : user.role === 'leader' ? 'active' : 'pending'}
                            label={user.role === 'both' ? 'Leader + Member' : user.role === 'leader' ? 'Leader' : 'Member'}
                          />
                        </td>
                        <td className="py-3 px-2 text-xs text-[#8A94A6]">{user.email || 'N/A'}</td>
                        <td className="py-3 px-2 text-xs text-[#8A94A6]">{user.birthdate ? calculateAge(user.birthdate) : 'N/A'}</td>
                        <td className="py-3 px-2 text-xs text-[#8A94A6]">
                          {user.subgroupName || user.unitName || 'Unassigned'}
                        </td>
                        <td className="py-3 px-2 text-xs text-[#8A94A6]">{user.createdAt ? formatDate(user.createdAt) : 'N/A'}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete user"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-sm text-[#8A94A6]">
                          {loading ? 'Loading users...' : 'No users found'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Settings section - only show on settings view */}
          {currentView === 'settings' && (
            <section className="rounded-[20px] border border-[#E8ECF4] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] p-6">
              <h2 className="text-[18px] font-semibold text-[#253858] mb-4">Admin Settings</h2>
              <p className="text-sm text-[#8A94A6]">Admin settings functionality coming soon.</p>
            </section>
          )}
        </main>
      </div>

      {/* User Creation Dialog */}
      <UserCreationDialog
        isOpen={isUserDialogOpen}
        onClose={() => setIsUserDialogOpen(false)}
        onSubmit={handleCreateUser}
        subgroups={subgroups}
      />
    </div>
  );
};

export default AdminDashboard;