import React from "react";
import { GripVertical } from "lucide-react";

interface DraggableProps {
  type: string;
  label: string;
}

export default function Draggable({ type, label }: DraggableProps) {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      className="w-full border p-4 cursor-pointer rounded-md bg-white flex items-center gap-2"
      draggable
      onDragStart={handleDragStart}
    >
      <GripVertical className="text-gray-400" />
      {label}
    </div>
  );
}
