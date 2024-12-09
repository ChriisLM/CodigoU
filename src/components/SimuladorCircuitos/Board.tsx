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

  return (
    <section className="board">
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
              />
            ))}
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
}: {
  id: string;
  Component: React.ElementType;
  positionX: number;
  positionY: number;
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
      <ElectronicComponent Component={Component} inBoard={true} />
    </div>
  );
}
