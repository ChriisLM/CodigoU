import "../../assets/css/SimuladorCircuitos/SiderBar.css"
import { Amperemeter, DCPower, Resistor, SwitchClosed, SwitchOpen, Voltmeter } from "../../utils/IconsElectronic";
import { ElectronicComponent } from "./ElectronicComponent";

export function SideBar () {
  return (
    <div className="sidebar">
      <ElectronicComponent Component={Resistor}/>
      <hr className="sidebar__divider"/>
      <ElectronicComponent Component={DCPower}/>
      <hr className="sidebar__divider"/>
      <ElectronicComponent Component={SwitchOpen}/>
      <hr className="sidebar__divider"/>
      <ElectronicComponent Component={SwitchClosed}/>
      <hr className="sidebar__divider"/>
      <ElectronicComponent Component={Amperemeter}/>
      <hr className="sidebar__divider"/>
      <ElectronicComponent Component={Voltmeter}/>
    </div>
  );
};