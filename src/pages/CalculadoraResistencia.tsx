import { Header } from "../components/Header";
import { ProjectInfo } from "../components/ProjectInfo";
import "../assets/css/CalculadoraResistencia/CalculadoraResistencia.css"
import { useRef, useState } from "react";
import { ResistorCalculatorLayout } from "../components/CalculadoraResistencia/ResistorCalculatorLayout";
import { ResistorColorLayout } from "../components/CalculadoraResistencia/ResistorColorLayout";

export function CalculadorResistenica () {
  const [activeTab, setActiveTab] = useState<number>(0)
  const indicatorRef = useRef<HTMLSpanElement | null>(null)

  const handleActiveTab = (index: number) => {
    setActiveTab(index)
    if (indicatorRef.current) {
      indicatorRef.current.style.transform = `translateX(${index * 100}%)`;
    }
  }
  return (
    <>
      <Header/>
      <main>
        <ProjectInfo id="CE-2"/>
        <section className="cal-resistor">
          <ul className="cal-resistor__tabs">
            <li className={activeTab==0 ? "cal-resistor__tabs-items--active cal-resistor__tabs-items" : "cal-resistor__tabs-items"} onClick={() => handleActiveTab(0)}>Resistencias Serie</li>
            <li className={activeTab==1 ? "cal-resistor__tabs-items--active cal-resistor__tabs-items" : "cal-resistor__tabs-items"} onClick={() => handleActiveTab(1)}>Resistencia Paralelo</li>
            <li className={activeTab==2 ? "cal-resistor__tabs-items--active cal-resistor__tabs-items" : "cal-resistor__tabs-items"} onClick={() => handleActiveTab(2)}>Valor de Resistencia</li>
            <span ref={indicatorRef} className="cal-resistor__indicator"></span>
          </ul>
          {activeTab==0 && <ResistorCalculatorLayout typeCalculator={"serie"}/>}
          {activeTab==1 && <ResistorCalculatorLayout typeCalculator={"paralelo"}/>}
          {activeTab==2 && <ResistorColorLayout/>}
        </section>
      </main>
    </>
  );
};