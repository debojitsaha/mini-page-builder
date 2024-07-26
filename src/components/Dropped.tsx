import React, { useEffect, useRef, useState } from "react";

interface DroppedProps {
  component: any;
  onUpdatePosition: (id: number, x: number, y: number) => void;
  setDeleteComponent: (id: number) => void;
  handleDelete: () => void;
}

export default function Dropped({
  component,
  onUpdatePosition,
  setDeleteComponent,
  handleDelete,
}: DroppedProps) {
  const [labelProps] = useState({
    text: component.text,
    fontWeight: component.fontWeight || 400,
    fontSize: component.fontSize || "16px",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: component.x, y: component.y });
  const [isSelected, setIsSelected] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (isDragging && componentRef.current) {
      const rect = componentRef.current.parentElement?.getBoundingClientRect();
      const x = event.clientX - (rect?.left || 0);
      const y = event.clientY - (rect?.top || 0);
      setPosition({ x, y });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onUpdatePosition(component.id, position.x, position.y);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsSelected(true);
    setDeleteComponent(component.id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsSelected(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className={`absolute p-2 border-2 ${
        isSelected ? "border-red-500" : "border-transparent"
      } cursor-pointer`}
      style={{ left: position.x, top: position.y }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Delete" || event.key === "Backspace") {
          handleDelete();
        }
      }}
      draggable
    >
      {component.type === "input" && (
        <input
          type="text"
          className="border px-4 py-2 rounded-md"
          style={{
            fontWeight: labelProps.fontWeight,
            fontSize: `${labelProps.fontSize}px`,
          }}
          value={labelProps.text}
          readOnly
        />
      )}
      {component.type === "label" && (
        <label
          style={{
            fontWeight: labelProps.fontWeight,
            fontSize: `${labelProps.fontSize}px`,
          }}
        >
          {labelProps.text}
        </label>
      )}
      {component.type === "button" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          style={{
            fontWeight: labelProps.fontWeight,
            fontSize: `${labelProps.fontSize}px`,
          }}
        >
          {labelProps.text}
        </button>
      )}
    </div>
  );
}
