import "../../assets/css/SimuladorCircuitos/ElectronicComponent.css"

interface Props {
  Component: React.ElementType;
  onclick?: React.FunctionComponent
  inBoard: boolean
  style?: any
}

export function ElectronicComponent({Component,onclick, inBoard, style}: Props) {
  return (
    <div onClick={onclick} style={style} className={`electronic-component ${inBoard ? "electronic-component--board" : ""}`}>
      <span className="conector__line conector__line--left"></span>
      <Component/>
      <span className="conector__line conector__line--right"></span>
    </div>
  );
}
