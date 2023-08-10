import Mind from '../Mind';
import Operator from './components/Operator';

export default function App() {
  return (
    <div className="p-1">
      <div>
        <Operator />
      </div>
      <div>
        <Mind />
      </div>
    </div>
  );
}
