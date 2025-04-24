import './DistanceSlider.css';

export default function DistanceSlider({ value, onChange }) {
  return (
    <div className="slider-container">
      <label className="slider-label">
        Distancia máxima: <span className="slider-value">{value} km</span>
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
