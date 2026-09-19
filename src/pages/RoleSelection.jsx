import { useNavigate } from "react-router-dom";
import { Shield, Users } from "lucide-react";
import { Crest } from "@/components/Crest";
import { useI18n } from "@/i18n/I18nProvider";

const RoleSelection = ({ userId, userName }) => {
  const { t } = useI18n();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === 'leader') {
      navigate(`/leader/${userId}`);
    } else if (role === 'member') {
      navigate(`/member/${userId}`);
    }
  };

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Crest initials={userName?.substring(0, 2).toUpperCase() || "US"} variant="default" className="size-20" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {userName || 'User'}!
          </h1>
          <p className="text-gray-600 text-lg">
            You have both Leader and Member roles. Please select how you'd like to access the system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Leader Option */}
          <button
            onClick={() => handleRoleSelect('leader')}
            className="h-auto p-6 flex flex-col items-center gap-4 bg-white hover:bg-blue-50 text-gray-900 border-2 border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-xl transition-all rounded-xl cursor-pointer"
          >
            <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Shield className="size-8 text-blue-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Access as Leader</h3>
              <p className="text-sm text-gray-600">
                Manage your subgroup, assign tasks, and oversee member progress
              </p>
            </div>
          </button>

          {/* Member Option */}
          <button
            onClick={() => handleRoleSelect('member')}
            className="h-auto p-6 flex flex-col items-center gap-4 bg-white hover:bg-green-50 text-gray-900 border-2 border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl transition-all rounded-xl cursor-pointer"
          >
            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="size-8 text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Access as Member</h3>
              <p className="text-sm text-gray-600">
                View your tasks, track progress, and manage your personal achievements
              </p>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>You can logout and switch roles at any time</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;