import { useState } from "react";

import Draggable from "@/components/Draggable";
import DroppableArea from "@/components/DroppableArea";
import Modal from "@/components/Modal";

import { Trash } from "lucide-react";
import { cn } from "@/utils";

export default function Home() {
  const [components, setComponents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<any>(null);
  const [deleteComponent, setDeleteComponent] = useState<number | null>(null);

  const handleDrop = (component: any, x: number, y: number) => {
    if (component.type === "label") {
      setShowModal(true);
      setModalProps({ component, x, y });
    } else {
      setComponents([...components, { ...component, x, y, id: Date.now() }]);
    }
  };

  const handleModalSave = (props: any) => {
    setComponents([
      ...components,
      {
        ...modalProps.component,
        ...props,
        x: modalProps.x,
        y: modalProps.y,
        id: Date.now(),
      },
    ]);
    setShowModal(false);
  };

  const handleUpdatePosition = (id: number, x: number, y: number) => {
    setComponents(
      components.map((component) =>
        component.id === id ? { ...component, x, y } : component
      )
    );
  };

  const handleDelete = () => {
    console.log("hello");

    if (deleteComponent) {
      setComponents(
        components.filter((component) => component.id !== deleteComponent)
      );
      setDeleteComponent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold mb-4">Mini Page Builder</h1>
        <button
          className={cn(
            deleteComponent === null ? "bg-red-300" : "bg-red-500",
            "px-6 py-3 sm:px-8 sm:py-4 bg-red-500 text-white rounded-md flex items-center gap-2 font-semibold"
          )}
          onClick={handleDelete}
          disabled={deleteComponent === null}
        >
          <Trash />
          Delete
        </button>
      </div>
      <div className="flex flex-col md:flex-row-reverse">
        <div className="bg-gray-900 px-3 py-6 flex flex-col gap-4 mx-auto min-w-[300px]">
          <h1 className="text-3xl text-white">Blocks</h1>
          <Draggable type="label" label="Label" />
          <Draggable type="input" label="Input" />
          <Draggable type="button" label="Button" />
        </div>
        <DroppableArea
          components={components}
          onDrop={handleDrop}
          onUpdatePosition={handleUpdatePosition}
          setDeleteComponent={setDeleteComponent}
        />
      </div>
      {showModal && (
        <Modal
          onSave={handleModalSave}
          initialProps={{ text: "", fontWeight: "normal", fontSize: "16px" }}
        />
      )}
    </div>
  );
}
