import { BalanceTracker } from './BalanceTracker';

export default function App() {
  let date = new Date();
  return (
    <>
      <BalanceTracker />
      <footer style={{margin: '10px'}}>
        <p style={{textAlign: 'center'}}>© {date.getFullYear()} Rajwinder singh. All Rights Reserved.</p>
      </footer>
    </>
  );
}
