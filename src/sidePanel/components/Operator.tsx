import './operator.css';

export default function Operator() {
  return (
    <div className="side-panel-header">
      <div>color panel</div>
      <div className="header-buttons-stack">
        <div className="buttons-item">
          <button>Cursor</button>
        </div>
        <div className="buttons-item">
          <button>Delete All</button>
          <button>Copy All</button>
        </div>
      </div>
    </div>
  );
}
