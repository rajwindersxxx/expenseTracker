export function formattedDate() {
  const date = new Date();
  const tzOffset = -date.getTimezoneOffset(); // Offset in minutes
  const adjustedDate = new Date(date.getTime() + tzOffset * 60 * 1000);
  return adjustedDate.toISOString().slice(0, 10); // Keep only date and time
}

export function sortRecords(Array, field, sortDirection, typeString = false) {
  const sortedRecords = Array.slice().sort((a, b) => {
    if (typeString) {
      return sortDirection
        ? b[field].localeCompare(a[field])
        : a[field].localeCompare(b[field]);
    } else {
      return sortDirection ? b[field] - a[field] : a[field] - b[field];
    }
  });
  return sortedRecords;
}
