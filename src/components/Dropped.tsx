import React, { useEffect, useRef, useState } from "react";

interface DroppedProps {
  component: any;
  onUpdatePosition: (id: number, x: number, y: number) => void;
  setDeleteComponent: (id: number) => void;
}

export default function Dropped({
  component,
  onUpdatePosition,
  setDeleteComponent,
}: DroppedProps) {
  const [labelProps] = useState({
    text: component.text,
    fontWeight: component.fontWeight || "normal",
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
    console.log("clicked");

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
      draggable
    >
      {component.type === "input" && (
        <input type="text" className="border p-2" />
      )}
      {component.type === "label" && (
        <label
          style={{
            fontWeight: labelProps.fontWeight === "bold" ? 600 : 400,
            fontSize: `${labelProps.fontSize}px`,
          }}
        >
          {labelProps.text}
        </label>
      )}
      {component.type === "button" && (
        <button className="bg-blue-500 text-white p-2">Button</button>
      )}
    </div>
  );
}
