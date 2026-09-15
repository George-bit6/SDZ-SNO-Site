import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { useI18n } from "@/i18n/I18nProvider";
import { useState, useEffect } from "react";

export default function UserCreationDialog({
  isOpen,
  onClose,
  onSubmit,
  subgroups = []
}) {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    // Basic user info
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    phone: '',
    city: '',
    country: 'Lebanon',
    
    // Role assignment - support dual roles
    isMember: true,
    isLeader: false,
    
    // Member-specific fields
    subgroupId: '',
    unitName: '',

    // Leader-specific fields
    leaderTitle: 'subgroup_leader',
    leaderSubgroupId: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthdate: '',
        gender: '',
        phone: '',
        city: '',
        country: 'Lebanon',
        isMember: true,
        isLeader: false,
        subgroupId: '',
        unitName: '',
        leaderTitle: 'subgroup_leader',
        leaderSubgroupId: ''
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    // At least one role must be selected
    if (!formData.isMember && !formData.isLeader) {
      newErrors.role = 'At least one role must be selected';
    }

    // Member-specific validation
    if (formData.isMember) {
      if (!formData.birthdate) newErrors.birthdate = 'Birthdate is required for members';
      if (!formData.gender) newErrors.gender = 'Gender is required for members';
    }

    // Leader-specific validation
    if (formData.isLeader) {
      if (!formData.leaderTitle) newErrors.leaderTitle = 'Leader title is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to create user. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#253858]">
            Add New User
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#253858]">
              User Roles *
            </Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isMember"
                  checked={formData.isMember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#4A7DFF] focus:ring-[#4A7DFF]"
                />
                <span className="text-sm text-[#253858]">Scout Member</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isLeader"
                  checked={formData.isLeader}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#4A7DFF] focus:ring-[#4A7DFF]"
                />
                <span className="text-sm text-[#253858]">Leader</span>
              </label>
            </div>
            {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
          </div>

          {/* Basic Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#253858] border-b border-[#E8ECF4] pb-2">
              Basic Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-[#253858]">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                  required
                />
                {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-[#253858]">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                  required
                />
                {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#253858]">
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                required
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-[#253858]">
                  Password *
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                  required
                />
                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-[#253858]">
                  Confirm Password *
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                  required
                />
                {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-[#253858]">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+961 XX XXX XXX"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-[#253858]">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                />
              </div>
            </div>
          </div>

          {/* Member-Specific Fields */}
          {formData.isMember && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#253858] border-b border-[#E8ECF4] pb-2">
                Member Information
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="text-sm font-medium text-[#253858]">
                    Birthdate *
                  </Label>
                  <Input
                    id="birthdate"
                    name="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                    required
                  />
                  {errors.birthdate && <p className="text-xs text-red-500">{errors.birthdate}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium text-[#253858]">
                    Gender *
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-red-500">{errors.gender}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subgroupId" className="text-sm font-medium text-[#253858]">
                  Subgroup
                </Label>
                <Select
                  value={formData.subgroupId}
                  onValueChange={(value) => handleSelectChange('subgroupId', value)}
                >
                  <SelectTrigger className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20">
                    <SelectValue placeholder="Select subgroup" />
                  </SelectTrigger>
                  <SelectContent>
                    {subgroups.map(subgroup => (
                      <SelectItem key={subgroup.subgrp_id} value={subgroup.subgrp_id}>
                        {subgroup.subgrp_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitName" className="text-sm font-medium text-[#253858]">
                    Unit Name
                  </Label>
                  <Input
                    id="unitName"
                    name="unitName"
                    value={formData.unitName}
                    onChange={handleChange}
                    placeholder="Unit name"
                    className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Leader-Specific Fields */}
          {formData.isLeader && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[#253858] border-b border-[#E8ECF4] pb-2">
                Leader Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="leaderTitle" className="text-sm font-medium text-[#253858]">
                  Leader Title *
                </Label>
                <Select
                  value={formData.leaderTitle}
                  onValueChange={(value) => handleSelectChange('leaderTitle', value)}
                >
                  <SelectTrigger className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20">
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subgroup_leader">Subgroup Leader</SelectItem>
                    <SelectItem value="group_leader">Group Leader</SelectItem>
                    <SelectItem value="subgroup_leader_assistant">Subgroup Leader Assistant</SelectItem>
                    <SelectItem value="group_leader_assistant">Group Leader Assistant</SelectItem>
                    <SelectItem value="logistics_coordinator">Logistics Coordinator</SelectItem>
                    <SelectItem value="program_manager">Program Manager</SelectItem>
                    <SelectItem value="general_secretary">General Secretary</SelectItem>
                    <SelectItem value="financial_officer">Financial Officer</SelectItem>
                    <SelectItem value="media_officer">Media Officer</SelectItem>
                  </SelectContent>
                </Select>
                {errors.leaderTitle && <p className="text-xs text-red-500">{errors.leaderTitle}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="leaderSubgroupId" className="text-sm font-medium text-[#253858]">
                  Assign to Subgroup
                </Label>
                <Select
                  value={formData.leaderSubgroupId}
                  onValueChange={(value) => handleSelectChange('leaderSubgroupId', value)}
                >
                  <SelectTrigger className="border-[#E8ECF4] focus:border-[#4A7DFF] focus:ring-[#4A7DFF]/20">
                    <SelectValue placeholder="Select subgroup (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {subgroups.map(subgroup => (
                      <SelectItem key={subgroup.subgrp_id} value={subgroup.subgrp_id}>
                        {subgroup.subgrp_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
              {errors.submit}
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#E8ECF4] text-[#8A94A6] hover:bg-[#F4F6FB]"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#4A7DFF] text-white hover:bg-[#3B6BDD]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating User...' : 'Create User'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}