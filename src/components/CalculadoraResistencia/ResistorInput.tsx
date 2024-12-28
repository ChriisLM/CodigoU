import "../../assets/css/CalculadoraResistencia/ResistorInput.css";
import { RemoveIcon } from "../../utils/Icons";

interface Props {
  resistencia: string;
  deleteInputButton: boolean;
  deleteInput?: (resistenciaRef: string) => void;
  onChange: (resistencia: string, value: number, format: string) => void;
}

export function ResistorInput({
  resistencia,
  deleteInputButton,
  deleteInput,
  onChange,
}: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    const format = (e.target.nextSibling as HTMLSelectElement).value;
    onChange(resistencia, value, format);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value =
      parseFloat((e.target.previousSibling as HTMLInputElement).value) || 0;
    const format = e.target.value;
    onChange(resistencia, value, format);
  };

  return (
    <div className="resistorInput">
      <span className="resistorInput__title">{resistencia}</span>
      <div className="resistorInput__deleteSection">
        {deleteInputButton && (
          <RemoveIcon
            className="resistorInput__button-remove"
            onClick={() => deleteInput?.(resistencia)}
          />
        )}
      </div>
      <div className="resistorInput__inputSection">
        <input
          type="number"
          className="resistorInput__input"
          onChange={handleInputChange}
        />
        <select
          name="resistor"
          id="resistor"
          className="resistorInput__selector"
          onChange={handleSelectChange}
        >
          <option value="Ω">Ω</option>
          <option value="kΩ">kΩ</option>
          <option value="MΩ">MΩ</option>
        </select>
      </div>
    </div>
  );
}
