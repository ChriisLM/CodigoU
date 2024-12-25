import { useState } from "react";
import "../../assets/css/CalculadoraResistencia/ResistorCalculatorLayout.css";
import { ResistorInput } from "./ResistorInput";

interface Props {
  typeCalculator: string;
}

export function ResistorCalculatorLayout({ typeCalculator }: Props) {
  const resistorInputDefault = [
    <ResistorInput resistencia="R1" deleteInputButton={false} />,
    <ResistorInput resistencia="R2" deleteInputButton={false} />,
  ];
  const [resistors, setResistors] =
    useState<JSX.Element[]>(resistorInputDefault);

  const addResistorInput = () => {
    const newResistorIndex = resistors.length + 1;
    const newResistor = (
      <ResistorInput
        key={`R${newResistorIndex}`}
        resistencia={`R${newResistorIndex}`}
        deleteInputButton={true}
        deleteInput={deleteResistorInput}
      />
    );
    setResistors((prev) => [...prev, newResistor]);
  };

  const deleteResistorInput = (resistenciaRef: string) => {
    setResistors((prev) =>
      prev.filter((resistor) => resistor.props.resistencia !== resistenciaRef)
    );
  };

  return (
    <section>
      <aside>
        <div>{resistors}</div>
        <button onClick={addResistorInput}>+</button>
      </aside>
      <div>
        <span>{typeCalculator}</span>
      </div>
    </section>
  );
}
