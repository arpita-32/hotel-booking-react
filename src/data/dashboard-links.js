export const ACCOUNT_TYPE = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};
export const profileOnlyLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  }
];
export const normalUserSidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Settings",
    path: "/dashboard/settings",
    icon: "VscSettingsGear",
  },
  // Add more normal user links as needed
];

export const adminSidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/admin/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Settings",
    path: "/admin/dashboard/settings",
    icon: "VscSettingsGear",
  },
  {
    id: 3,
    name: "Add Room",
    path: "/admin/dashboard/add-room",
    icon: "VscAdd",
  },
  {
    id: 4,
    name: "All Rooms",
    path: "/admin/dashboard/all-rooms",
    icon: "VscListFlat",
  },
];