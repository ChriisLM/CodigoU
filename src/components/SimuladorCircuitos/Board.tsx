import { useState, useRef } from "react";
import { DndContext, useDraggable, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "../../assets/css/SimuladorCircuitos/Board.css";
import { SideBar } from "./Sidebar";
import { ElectronicComponent } from "./ElectronicComponent";

interface Component {
  id: string;
  type: string;
  Component: React.ElementType;
  x: number;
  y: number;
  connections?: string[];
  valorResitencia?: string
  valorFuente?: string
  ValorVoltaje?: string
  ValorCorriente?: string
}

interface Connection {
  id: string;
  fromComponentId: string;
  toComponentId: string;
}

const initialComponents: Component[] = [];

export function Board() {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const countersRef = useRef<Record<string, number>>({});
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

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
      ...(type === "rtr" ? { ValorResistencia: "1K" } : {}),
      ...(type === "pdc" ? { ValorFuente: "5V" } : {}),
    };

    countersRef.current[type]++;
    setComponents((prev) => [...prev, newComponent]);
  };

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;

    setComponents((prev) =>
      prev.map((component) =>
        component.id === active.id
          ? {
              ...component,
              x: component.x + delta.x,
              y: component.y + delta.y,
            }
          : component
      )
    );
  };

  const handleAddConnection = () => {
    if (selectedComponents.length === 2) {
      const newConnection: Connection = {
        id: `connection-${selectedComponents[0]}-${selectedComponents[1]}`,
        fromComponentId: selectedComponents[0],
        toComponentId: selectedComponents[1]
      };

      // Actualizar componentes con referencias de conexión
      setComponents(prev => prev.map(comp => {
        if (selectedComponents.includes(comp.id)) {
          return {
            ...comp,
            connections: [...(comp.connections || []), newConnection.id]
          };
        }
        return comp;
      }));

      setConnections(prev => [...prev, newConnection]);
      setSelectedComponents([]);
    }
  };

  const renderConnectionLines = () => {
    return connections.map(conn => {
      const fromComp = components.find(c => c.id === conn.fromComponentId);
      const toComp = components.find(c => c.id === conn.toComponentId);

      if (!fromComp || !toComp) return null;

      return (
        <svg key={conn.id} style={{position: 'absolute', top: 0, left: 0, pointerEvents: 'none'}}>
          <line
            x1={fromComp.x + 50}
            y1={fromComp.y + 50}
            x2={toComp.x + 50}
            y2={toComp.y + 50}
            stroke="green"
            strokeWidth="2"
          />
        </svg>
      );
    });
  };

  return (
    <section className="board">
      <div className="board-controls">
        <button onClick={handleAddConnection}>
          Conectar Componentes Seleccionados
        </button>
      </div>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="board__container">
          <SortableContext
            items={components.map((comp) => comp.id)}
            strategy={verticalListSortingStrategy}
          >
            {components.map((component) => (
              <DraggableComponent
                key={component.id}
                id={component.id}
                Component={component.Component}
                positionX={component.x}
                positionY={component.y}
                selectedComponents={selectedComponents}
                setSelectedComponents={setSelectedComponents}
              />
            ))}
            {renderConnectionLines()}
          </SortableContext>
          <button onClick={() =>console.log(components)}>Ver components</button>
        </div>
        <aside className="board__aside">
          <SideBar addComponents={handleAddComponent} />
        </aside>
      </DndContext>
    </section>
  );
}

function DraggableComponent({
  id,
  Component,
  positionX,
  positionY,
  selectedComponents, 
  setSelectedComponents,
}: {
  id: string;
  Component: React.ElementType;
  positionX: number;
  positionY: number;
  selectedComponents: string[],
  setSelectedComponents: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const computedX = positionX + (transform?.x || 0);
  const computedY = positionY + (transform?.y || 0);

  const style = {
    transform: `translate(${computedX}px, ${computedY}px)`,
    position: "absolute" as const,
    border: selectedComponents.includes(id) ? '2px solid blue' : '1px solid gray'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={() => {
      setSelectedComponents(prev => 
        prev.includes(id) 
          ? prev.filter(id => id !== id)
          : [...prev, id]
      );
    }}>
      <ElectronicComponent Component={Component} inBoard={true} />
    </div>
  );
}
