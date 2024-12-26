import "../../assets/css/CalculadoraResistencia/ResistorInput.css"
import { RemoveIcon } from "../../utils/Icons";

interface Props {
  resistencia: string;
  deleteInputButton: boolean;
  deleteInput?: (resistenciaRef: string) => void
}

export function ResistorInput ({resistencia,deleteInputButton,deleteInput}: Props) {

  return (
    <div className="resistorInput">
      <span className="resistorInput__title">{resistencia}</span>
      <div className="resistorInput__deleteSection">
        {deleteInputButton && <RemoveIcon className="resistorInput__button-remove" onClick={() => deleteInput?.(resistencia)}/>}
      </div>
      <div className="resistorInput__inputSection">
        <input type="number" className="resistorInput__input"/>
        <select name="resistor" id="resistor" className="resistorInput__selector">
          <option value="Ω">Ω</option>
          <option value="kΩ">kΩ</option>
          <option value="MΩ">MΩ</option>
        </select>
      </div>
    </div>
  );
};