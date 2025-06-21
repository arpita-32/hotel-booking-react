// Run this once to clean up any malformed tokens
export const cleanupLocalStorage = () => {
  try {
    console.log("🧹 Cleaning up localStorage...")

    const token = localStorage.getItem("token")

    // If token exists and starts with a quote, it was JSON.stringify'd incorrectly
    if (token && token.startsWith('"') && token.endsWith('"')) {
      // Remove the quotes and store as plain string
      const cleanToken = token.slice(1, -1)
      localStorage.setItem("token", cleanToken)
      console.log("✅ Cleaned up malformed token in localStorage")
    }

    // Verify user data is valid JSON
    const user = localStorage.getItem("user")
    if (user) {
      try {
        JSON.parse(user)
        console.log("✅ User data is valid JSON")
      } catch  {
        console.log("❌ Invalid user data in localStorage, removing...")
        localStorage.removeItem("user")
      }
    }

    console.log("🎉 localStorage cleanup completed")
  } catch (error) {
    console.error("Error cleaning up localStorage:", error)
    // If there's any issue, clear everything
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    console.log("🗑️ Cleared all localStorage due to errors")
  }
}
