import React, { useState } from "react";
import Dropped from "./Dropped";
import { ComponentProps } from "@/interface";

interface DroppableAreaProps {
  components: ComponentProps[];
  onDrop: (component: any, x: number, y: number) => void;
  onUpdatePosition: (id: number, x: number, y: number) => void;
  setDeleteComponent: (id: number) => void;
  handleDelete: () => void;
}

export default function DroppableArea({
  components,
  onDrop,
  onUpdatePosition,
  setDeleteComponent,
  handleDelete,
}: DroppableAreaProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const componentType = event.dataTransfer.getData("componentType");
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    onDrop({ type: componentType }, x, y);
  };

  return (
    <div
      className={`w-full h-screen bg-gray-200 border-2 ${
        dragOver ? "border-blue-500" : "border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {components.map((component) => (
        <Dropped
          key={component.id}
          component={component}
          onUpdatePosition={onUpdatePosition}
          setDeleteComponent={setDeleteComponent}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
