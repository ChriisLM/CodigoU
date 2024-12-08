import { useRef, useState } from "react";
import "../../assets/css/SimuladorCircuitos/Board.css"
import { SideBar } from "./Sidebar";
import { ElectronicComponent } from "./ElectronicComponent";

interface Component{
  type: string;
  Component: React.ElementType;
}

const initialComponents: Component[] = [];
export function Board () {
  const [components,setComponents] = useState<Component[]>(initialComponents)
  const countersRef = useRef<Record<string, number>>({});

  const handleComponentsBoard = ({ type, Component }: Component) => {
    if (!countersRef.current[type]) {
      countersRef.current[type] = 1;
    }

    const componentData = {
      id: `${type}${countersRef.current[type]}`,
      type,
      Component,
    };

    countersRef.current[type]++;
    setComponents((prev) => [...prev, componentData]);
  };

  return (
    <section className="board">
      <div className="board__container">
        {components.map((component,index) => {
          return (
            <ElectronicComponent key={index} Component={component.Component} inBoard={true}/>
          )
        })}
      </div>
      <aside className="board__aside">
        <SideBar addComponents={handleComponentsBoard}/>
      </aside>
    </section>
  );
};