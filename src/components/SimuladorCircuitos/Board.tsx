import { useState, useRef } from "react";
import "../../assets/css/SimuladorCircuitos/Board.css";
import { SideBar } from "./Sidebar";
import { ElectronicComponent } from "./ElectronicComponent";

interface Component {
  id: string;
  type: string;
  Component: React.ElementType;
  x: number;
  y: number;
}

const initialComponents: Component[] = [];

export function Board() {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const countersRef = useRef<Record<string, number>>({});

  const handleAddComponent = (type: string, Component: React.ElementType) => {
    if (!countersRef.current[type]) {
      countersRef.current[type] = 1;
    }

    const newComponent: Component = {
      id: `${type}-${countersRef.current[type]}`,
      type,
      Component,
      x: 0,
      y: 0,
    };

    countersRef.current[type]++;
    setComponents((prev) => [...prev, newComponent]);
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
        <SideBar addComponents={handleAddComponent}/>
        </aside>
    </section>
  );
}
