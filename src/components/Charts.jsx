import { Graph } from './Graph';
import { PiChart } from './PiChart';

export function Charts({ records , setSelectedDate , selectedDate}) {
  return (
    <div className="main__charts">
      <div className="chart__heading">
        <h2>Summary</h2>
      </div>
      <PiChart records={records} setSelectedDate={setSelectedDate} selectedDate={selectedDate} />
      <Graph records={records} />
    </div>
  );
}
