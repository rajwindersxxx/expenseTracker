// import { Graph } from './Graph';
import { PiChart } from './PiChart';
/* eslint react/prop-types: 0 */

export function Charts({ records }) {
  return (
    <div className="main__charts">
      <div className="chart__heading">
        <h2>Summary</h2>
      </div>
      <PiChart records={records} />
      {/* <Graph records={records}/> */}
    </div>
  );
}
