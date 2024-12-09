import "../../assets/css/SimuladorCircuitos/SideBar.css"
import { Amperemeter, DCPower, Resistor, SwitchOpen, Voltmeter } from "../../utils/IconsElectronic";
import { ElectronicComponent } from "./ElectronicComponent";

interface Props {
  addComponents: any
}

export function SideBar ({addComponents}: Props) {
  const electronicComponents = [
    {type: "rtr",Component : Resistor},
    {type: "pdc",Component: DCPower},
    {type: "swto",Component: SwitchOpen},
    {type: "amp",Component: Amperemeter},
    {type: "vlt",Component: Voltmeter}
  ]
  return (
    <div className="sidebar">
      {electronicComponents.map(({type,Component},index) => (
        <div key={index} className="sidebar__item">
          <ElectronicComponent onclick={() => addComponents(type,Component)} Component={Component} inBoard={false}/>
          <hr className="sidebar__divider"/>
        </div>
      ))}
    </div>
  );
};