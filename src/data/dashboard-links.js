export const ACCOUNT_TYPE = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
};

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount", // User icon
  },
  {
    id: 2,
    name: "Admin Dashboard",
    path: "/dashboard/admin",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Manage Rooms",
    path: "/dashboard/manage-rooms",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscHome", // Room icon
  },
  {
    id: 4,
    name: "Add Room",
    path: "/dashboard/add-room",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "My Bookings",
    path: "/dashboard/my-bookings",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscCalendar", // Bookings icon
  },
  {
    id: 6,
    name: "Book a Room",
    path: "/dashboard/book-room",
    type: ACCOUNT_TYPE.CUSTOMER,
    icon: "VscCreditCard", // Payment icon
  },
];