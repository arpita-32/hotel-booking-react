export const formattedDate = (date) => {
  if (!date) return "Add Date Of Birth"

  try {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return "Invalid Date"
    }

    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch (error) {
    console.error("Date formatting error:", error)
    return "Invalid Date"
  }
}
