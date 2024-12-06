export function Charts({ children }) {
  return (
    <div className="main__charts">
      <div className="chart__heading">
        <h2>Summary</h2>
      </div>
      {children}
    </div>
  );
}
