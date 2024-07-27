import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { ComponentProps, ModalProps } from "@/interface";

interface DroppedProps {
  component: ComponentProps;
  onUpdatePosition: (id: number, x: number, y: number) => void;
  setDeleteComponent: (id: string) => void;
  handleDelete: () => void;
}

export default function Dropped({
  component,
  onUpdatePosition,
  setDeleteComponent,
  handleDelete,
}: DroppedProps) {
  const [showModal, setShowModal] = useState(false);
  const [labelProps, setLabelProps] = useState({
    text: component.text,
    fontWeight: component.fontWeight || 400,
    fontSize: component.fontSize || 16,
    labelType: component.type || "label",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: component.x, y: component.y });
  const [isSelected, setIsSelected] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handleDoubleClick = () => {
    setShowModal(true);
  };

  const handleSave = (props: ModalProps) => {
    setLabelProps(props);
    setShowModal(false);
  };

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
    onUpdatePosition(Number(component.id), position.x, position.y);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsSelected(true);
  };

  const handleDeselect = () => {
    setIsSelected(false);
  };

  useEffect(() => {
    if (isSelected) {
      document.addEventListener("click", handleDeselect);
    } else {
      document.removeEventListener("click", handleDeselect);
    }

    return () => {
      document.removeEventListener("click", handleDeselect);
    };
  }, [isSelected]);

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
      id={component.type}
      ref={componentRef}
      className={`absolute p-2 border-2 ${
        isSelected ? "border-red-500" : "border-transparent"
      } cursor-pointer`}
      style={{ left: position.x, top: position.y }}
      tabIndex={0}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={(event) => {
        if (event.key === "Delete" || event.key === "Backspace") {
          setDeleteComponent((component.id));
          handleDelete();
        } else if (event.key === "Enter") {
          setShowModal(true);
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
        <div
          style={{
            fontWeight: labelProps.fontWeight,
            fontSize: `${labelProps.fontSize}px`,
          }}
        >
          {labelProps.text}
        </div>
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
      {showModal && (
        <Modal
          onSave={handleSave}
          initialProps={labelProps as any}
          setShowModal={setShowModal}
          coordinates={position}
        />
      )}
    </div>
  );
}
