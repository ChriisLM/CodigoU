import "../../assets/css/CalculadoraResistencia/ResistorCalculatorLayout.css"
import { ResistorInput } from "./ResistorInput";

interface Props {
  typeCalculator: string;
}

export function ResistorCalculatorLayout ({typeCalculator}: Props) {
  return (
    <section>
      <aside>
        <div>
          <ResistorInput resistencia="R1" deleteInput={false}/>
          <ResistorInput resistencia="R2" deleteInput={false}/>
        </div>
        <button>+</button>
      </aside>
      <div>
        <span>{typeCalculator}</span>
      </div>
    </section>
  );
};