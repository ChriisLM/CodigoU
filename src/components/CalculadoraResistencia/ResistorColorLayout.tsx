import { useState } from "react";
import "../../assets/css/CalculadoraResistencia/ResistorColorLayout.css";
import { ResistorColor } from "./ResistorColor";

type ResistorColorKey = 
  | "black" | "brown" | "red" | "orange" | "yellow" 
  | "green" | "blue" | "violet" | "gray" | "white" 
  | "gold" | "silver";

interface ResistorColor {
  hex: string;
  value?: number;
  multiplier?: number;
  tolerance?: number;
}

const resistorColors: Record<ResistorColorKey, ResistorColor> = {
  black: { hex: "#000000", value: 0 },
  brown: { hex: "#8B4513", value: 1 },
  red: { hex: "#FF0000", value: 2 },
  orange: { hex: "#FFA500", value: 3 },
  yellow: { hex: "#FFFF00", value: 4 },
  green: { hex: "#008000", value: 5 },
  blue: { hex: "#0000FF", value: 6 },
  violet: { hex: "#EE82EE", value: 7 },
  gray: { hex: "#808080", value: 8 },
  white: { hex: "#FFFFFF", value: 9 },
  gold: { hex: "#FFD700", multiplier: 0.1, tolerance: 5 },
  silver: { hex: "#C0C0C0", multiplier: 0.01, tolerance: 10 },
};

export function ResistorColorLayout() {

  const [selectedColors, setSelectedColors] = useState<ResistorColorKey[]>([]);

  const handleSelectColor = (color: ResistorColorKey) => {
    if (selectedColors.length < 4) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  const handleReset = () => {
    setSelectedColors([]);
  };

  const calculateResistance = () => {
    if (selectedColors.length < 3) return null;

    const band1 = resistorColors[selectedColors[0]].value ?? 0;
    const band2 = resistorColors[selectedColors[1]].value ?? 0;
    const multiplier = resistorColors[selectedColors[2]].multiplier ?? 1;
    const tolerance = resistorColors[selectedColors[3]]?.tolerance ?? null;

    const resistance = (band1 * 10 + band2) * multiplier;
    return { resistance, tolerance };
  };

  const result = calculateResistance();

  return (
    <section className="resistor-color-layout">
      <aside className="resistor-color-layout__colors">
        {Object.entries(resistorColors).map(([color, { hex }]) => (
          <button
            key={color}
            className="resistor-color"
            style={{ backgroundColor: hex }}
            onClick={() => handleSelectColor(color as ResistorColorKey)}
            title={color}
          >
            {color.charAt(0).toUpperCase()}
          </button>
        ))}
      </aside>
      <div className="resistor-color-layout__preview">
        <div className="resistor-color-layout__band-preview">
          {selectedColors.map((color, index) => (
            <div
              key={index}
              className={`resistor-color-layout__band resistor-color-layout__band--${index + 1}`}
              style={{ backgroundColor: resistorColors[color].hex }}
            />
          ))}
        </div>
        <button onClick={handleReset} className="resistor-color-layout__reset">
          Reset
        </button>
      </div>
      <div className="resistor-color-layout__result">
        {result ? (
          <>
            <p>
              Resistencia: {result.resistance.toFixed(2)} Ω
              {result.resistance >= 1000 ? " (kΩ)" : ""}
            </p>
            {result.tolerance && <p>Tolerancia: ±{result.tolerance}%</p>}
          </>
        ) : (
          <p>Selecciona al menos 3 colores.</p>
        )}
      </div>
    </section>
  );
}
