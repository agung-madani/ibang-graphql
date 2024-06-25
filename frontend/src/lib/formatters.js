// with error handling
const locale = navigator.language;
const mediumDateFormat = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
});
const longDateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "long" });

export function formatDate(isoString, style = "medium") {
  console.log("formatDate called with:", isoString); // Add this line
  const date = new Date(isoString);
  if (isNaN(date)) {
    console.error("Invalid date:", isoString); // Add this line
    return "Invalid date";
  }
  return style === "long"
    ? longDateFormat.format(date)
    : mediumDateFormat.format(date);
}
