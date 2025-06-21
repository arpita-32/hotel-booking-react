// Create a constants file for user roles and other app constants
export const USER_ROLES = {
  ADMIN: "Admin",
  CUSTOMER: "Customer",
}

// Alternative export for backward compatibility
export const USER_ROLE = USER_ROLES

// Other useful constants
export const API_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
  IDLE: "idle",
}

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  PROFILE: "/dashboard/my-profile",
  SETTINGS: "/dashboard/settings",
}
