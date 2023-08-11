import Mind from '../Mind';
import Operator from './components/Operator';

export default function App() {
  return (
    <div className="p-2">
      <Operator />
      <div className="mt-2">
        <Mind />
      </div>
    </div>
  );
}
