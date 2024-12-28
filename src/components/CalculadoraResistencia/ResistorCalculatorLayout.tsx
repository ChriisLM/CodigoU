import { useState } from "react";
import "../../assets/css/CalculadoraResistencia/ResistorCalculatorLayout.css";
import { ResistorInput } from "./ResistorInput";
import { AddIcon } from "../../utils/Icons";

interface Props {
  typeCalculator: "serie" | "paralelo";
}

interface Resistor {
  value: number;
  format: string;
}

export function ResistorCalculatorLayout({ typeCalculator }: Props) {
  const [resistors, setResistors] = useState(
    [{ resistencia: "R1", deleteInputButton: false },
     { resistencia: "R2", deleteInputButton: false }]
  );
  const [resistorValues, setResistorValues] = useState<
    Record<string, Resistor>
  >({});
  const [totalResistance, setTotalResistance] = useState<number | null>(null);

  const urlImageCircuit = {
    serie:
      "https://microchipotle.com/wp-content/uploads/2024/05/Resistencias-en-serie-y-paralelo-formula-resistencias-en-serie-768x349.png",
    paralelo:
      "https://microchipotle.com/wp-content/uploads/2024/05/Resistencias-en-serie-y-paralelo-formula-resistencias-en-paralelo-768x387.png",
  };

  const addResistorInput = () => {
    if (resistors.length < 10) {
      const newResistorIndex = resistors.length + 1;
      setResistors((prev) => [
        ...prev,
        { resistencia: `R${newResistorIndex}`, deleteInputButton: true },
      ]);
    }
  };

  const deleteResistorInput = (resistenciaRef: string) => {
    setResistors((prev) =>
      prev.filter((resistor) => resistor.resistencia !== resistenciaRef)
    );
    setResistorValues((prev) => {
      const updatedValues = { ...prev };
      delete updatedValues[resistenciaRef];
      return updatedValues;
    });
  };

  const handleChangeInput = (
    resistencia: string,
    value: number,
    format: string
  ) => {
    setResistorValues((prev) => ({
      ...prev,
      [resistencia]: { value, format },
    }));
    calculateTotalResistance({
      ...resistorValues,
      [resistencia]: { value, format },
    });
  };

  const calculateTotalResistance = (values: Record<string, Resistor>) => {
    let total = 0;

    if (typeCalculator === "serie") {
      total = Object.values(values).reduce((sum, { value, format }) => {
        const convertedValue = convertToOhms(value, format);
        return sum + convertedValue;
      }, 0);
    } else if (typeCalculator === "paralelo") {
      const reciprocal = Object.values(values).reduce(
        (sum, { value, format }) => {
          const convertedValue = convertToOhms(value, format);
          return sum + 1 / convertedValue;
        },
        0
      );
      total = reciprocal > 0 ? 1 / reciprocal : 0;
    }

    setTotalResistance(total);
  };

  const convertToOhms = (value: number, format: string): number => {
    switch (format) {
      case "kΩ":
        return value * 1000;
      case "MΩ":
        return value * 1_000_000;
      default:
        return value;
    }
  };

  return (
    <section className="rCalculator-layout">
      <aside className="rCalculator-layout__aside">
        <h3 className="rCalculator-layout__aside-title">Resistencias</h3>
        <div className="rCalculator-layout__inputs">
          {resistors.map((resistor,index) => (
            <ResistorInput
            key={index}
            resistencia={resistor.resistencia}
            deleteInputButton={resistor.deleteInputButton}
            deleteInput={deleteResistorInput}
            onChange={handleChangeInput}
          />
          ))}
        </div>
        {resistors.length < 10 && (
          <AddIcon
            className="rCalculator-layout__button-add"
            onClick={addResistorInput}
          />
        )}
      </aside>
      <div className="rCalculator-layout__container">
        <div className="rCalculator-layout__container-image">
          <img
            className="rCalculator-layout__image"
            src={urlImageCircuit[typeCalculator]}
            alt="resistencias en serie"
          />
        </div>
        <div className="rCalculator-layout__results">
          <div className="rCalculator-layout__results-info">
            <span className="rCalculator-layout__results-title">
              Resistencia Total
            </span>
            <span className="rCalculator-layout__results-value">
              {totalResistance !== null
                ? `${totalResistance.toFixed(2)} Ω`
                : ""}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
