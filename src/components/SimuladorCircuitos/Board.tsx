import { useState, useRef } from "react";
import { DndContext, useDraggable, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import "../../assets/css/SimuladorCircuitos/Board.css";
import { SideBar } from "./Sidebar";
import { ElectronicComponent } from "./ElectronicComponent";
import { Connection } from "../../utils/IconsElectronic";

interface Component {
  id: string;
  type: string;
  Component: React.ElementType;
  x: number;
  y: number;
  valorResitencia?: string;
  valorFuente?: string;
  ValorVoltaje?: string;
  ValorCorriente?: string;
}

type Connection = {
  id: string;
  positionX: number;
  positionY: number;
};

interface ConnectionData {
  from: Connection;
  to: Connection;
}

const initialComponents: Component[] = [];

export function Board() {
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const countersRef = useRef<Record<string, number>>({});
  const [connections, setConnections] = useState<ConnectionData[]>([]);
  const [selectedConnector, setSelectedConnector] = useState<Connection[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

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

  const handleInfoConnector = ({ id, positionX, positionY }: Connection) => {
    console.log("Informacion llego aqui1");
    
    const connectionData: Connection = { id, positionX, positionY };
    setSelectedConnector((prev) => {
      if (prev.length === 1) {
        console.log("Informacion llego aqui2");
        handleConnections(prev[0], connectionData);
        return [];
      } else {
        console.log("Informacion llego aqui3");
        return [connectionData];
      }
    });
  };

  const handleConnections = (
    connectionFrom: Connection,
    connectionTo: Connection
  ) => {
    const isDuplicate = connections.some(
      (connec) =>
        (connec.from.id === connectionFrom.id &&
          connec.to.id === connectionTo.id) ||
        (connec.from.id === connectionTo.id &&
          connec.to.id === connectionFrom.id)
    );

    if (!isDuplicate) {
      setConnections((prev) => [
        ...prev,
        { from: connectionFrom, to: connectionTo },
      ]);
    }
  };

  return (
    <section className="board" ref={boardRef}>
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
                onConnectorClick={handleInfoConnector}
                boardRef={boardRef}
              />
            ))}
          </SortableContext>
          <button onClick={() => console.log(components)}>
            Ver components
          </button>
          <button onClick={() => console.log(connections)}>
            Ver conecciones
          </button>
          <svg className="connections-layer">
            {connections.map((connection, index) => (
              <line
                key={index}
                x1={connection.from.positionX}
                y1={connection.from.positionY}
                x2={connection.to.positionX}
                y2={connection.to.positionY}
                stroke="black"
                fill="black"
                strokeWidth="2"
              />
            ))}
          </svg>
          <div className="board__connection">
            <Connection />
          </div>
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
  boardRef,
  onConnectorClick,
}: {
  id: string;
  Component: React.ElementType;
  positionX: number;
  positionY: number;
  boardRef: React.RefObject<HTMLDivElement>;
  onConnectorClick: (conection: Connection) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const computedX = positionX + (transform?.x || 0);
  const computedY = positionY + (transform?.y || 0);

  const style = {
    transform: `translate(${computedX}px, ${computedY}px)`,
    position: "absolute" as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ElectronicComponent
        id={id}
        Component={Component}
        inBoard={true}
        onConnectorClick={onConnectorClick}
        boardRef={boardRef}
      />
    </div>
  );
}
