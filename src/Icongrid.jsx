
import './Icongrid.css';

const Icongrid = () => {
  return (
    <div className="icon-grid">
      <div className="icon-card user-icon">
        <div className="icon user" />
      </div>
      <div className="icon-card trophy-icon glow">
        <div className="icon trophy" />
      </div>
      <div className="icon-card pair-icon glow">
        <div className="icon pair-coding" />
      </div>
      <div className="icon-card code-icon">
        <div className="icon code" />
      </div>
    </div>
  );
};

export default Icongrid;
