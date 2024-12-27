import { useState } from "react";
import "../../assets/css/CalculadoraResistencia/ResistorCalculatorLayout.css";
import { ResistorInput } from "./ResistorInput";
import { AddIcon } from "../../utils/Icons";
import { Resistor } from "../../utils/IconsElectronic";

interface Props {
  typeCalculator: 'serie' | 'paralelo';
}

export function ResistorCalculatorLayout({ typeCalculator }: Props) {
  const resistorInputDefault = [
    <ResistorInput resistencia="R1" deleteInputButton={false} key={"R1"}/>,
    <ResistorInput resistencia="R2" deleteInputButton={false} key={"R2"}/>,
  ];
  const [resistors, setResistors] =
    useState<JSX.Element[]>(resistorInputDefault);

  const urlImageCircuit = {
    "serie": "https://microchipotle.com/wp-content/uploads/2024/05/Resistencias-en-serie-y-paralelo-formula-resistencias-en-serie-768x349.png",
    "paralelo": "https://microchipotle.com/wp-content/uploads/2024/05/Resistencias-en-serie-y-paralelo-formula-resistencias-en-paralelo-768x387.png"
  }
  const addResistorInput = () => {
    if (resistors.length < 10) {
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
    }
  };

  const deleteResistorInput = (resistenciaRef: string) => {
    setResistors((prev) =>
      prev.filter((resistor) => resistor.props.resistencia !== resistenciaRef)
    );
  };

  return (
    <section className="rCalculator-layout">
      <aside className="rCalculator-layout__aside">
        <h3 className="rCalculator-layout__aside-title">Resistencias</h3>
        <div className="rCalculator-layout__inputs">{resistors}</div>
        {resistors.length < 10 && (<AddIcon className="rCalculator-layout__button-add" onClick={addResistorInput}/>)}
      </aside>
      <div className="rCalculator-layout__container">
        <div className="rCalculator-layout__container-image">
          <img className="rCalculator-layout__image" src={urlImageCircuit[typeCalculator]} alt="resistencias en serie" />
        </div>
        <div className="rCalculator-layout__results">
          <div className="rCalculator-layout__results-info">
            <span className="rCalculator-layout__results-title">Resistencia Total</span>
            <span className="rCalculator-layout__results-value">ohmios</span>
          </div>
          <button className="rCalculator-layout__results-action">Calcular</button>
        </div>
      </div>
    </section>
  );
}
