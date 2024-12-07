// import { DCPower, Resistor } from "../../utils/IconsElectronic";
import "../../assets/css/SimuladorCircuitos/ElectronicComponent.css"

interface Props {
  Component: React.ElementType;
}

export function ElectronicComponent({Component}: Props) {
  return (
    <div className="electronic-component">
      <span className="conector__line conector__line--left"></span>
      <Component/>
      <span className="conector__line conector__line--right"></span>
    </div>
  );
}
