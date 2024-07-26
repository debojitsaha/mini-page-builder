import React from "react";

interface DraggableProps {
  type: string;
  label: string;
  setLabelType: (value: string) => void;
}

export default function Draggable({ type, label, setLabelType }: DraggableProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("componentType", type);
    setLabelType(type);
  };

  return (
    <div
      id={type}
      className="w-full border p-4 cursor-pointer rounded-md bg-white flex items-center gap-2"
      draggable
      onDragStart={handleDragStart}
    >
      {label}
    </div>
  );
}
