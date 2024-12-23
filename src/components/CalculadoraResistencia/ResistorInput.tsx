import "../../assets/css/CalculadoraResistencia/ResistorInput.css"

interface Props {
  resistencia: string;
  deleteInput: boolean;
}

export function ResistorInput ({resistencia,deleteInput}: Props) {
  return (
    <div className="resistorInput">
      <span className="resistorInput__title">{resistencia}</span>
      <div className="resistorInput__deleteSection">
        {deleteInput ? <span>❌</span>:<span></span>}
      </div>
      <div className="resistorInput__inputSection">
        <input type="number" className="resistorInput__input"/>
        <select name="resistor" id="resistor" className="resistorInput__selector">
          <option value="" className="resistorInput__selector-option">Ω</option>
          <option value="" className="resistorInput__selector-option">kΩ</option>
          <option value="" className="resistorInput__selector-option">MΩ</option>
        </select>
      </div>
    </div>
  );
};