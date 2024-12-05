
export function DatePicker({ selectedDate ,setSelectedDate }) {

  return (
    <>
      <label htmlFor="inputDate">Change date:</label>

      <input
        type="date"
        className="inputDate"
        id="date"
        name="trip-start"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        // min="2018-01-01"
        // max="2018-12-31"
      />
    </>
  );
}
