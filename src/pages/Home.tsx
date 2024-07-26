import { useEffect, useState } from "react";

import Draggable from "@/components/Draggable";
import DroppableArea from "@/components/DroppableArea";
import Modal from "@/components/Modal";
import { ComponentProps } from "@/interface";
import { nanoid } from "nanoid";

import Button from "@/ui/button/button";

export default function Home() {
  const [components, setComponents] = useState<ComponentProps[]>(
    JSON.parse(localStorage.getItem("components") || "[]")
  );
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<any>(null);
  const [deleteComponent, setDeleteComponent] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const handleDrop = (component: any, x: number, y: number) => {
    setShowModal(true);
    setModalProps({ component, x, y, id: nanoid() });
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
    if (deleteComponent) {
      setComponents(
        components.filter((component) => component.id !== deleteComponent)
      );
      setDeleteComponent(null);
    }
  };

  const handleExportJSON = () => {
    if (components.length === 0) {
      return;
    }
    const json = JSON.stringify(components);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mini-page.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <h1 className="text-2xl font-bold mb-4">
          Mini Page
          <span className="text-blue-700"> Builder</span>
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-fit">
          <Button variant="ghost" onClick={() => setComponents([])}>
            Clear
          </Button>
          <Button onClick={handleExportJSON}>Export JSON</Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse">
        <div className="bg-gray-900 px-3 py-6 flex flex-col gap-4 mx-auto min-w-[300px]">
          <div className="mb-4">
            <h1 className="text-3xl text-white">Blocks</h1>
            <p className="text-md text-gray-300">
              Drag the elements to the canvas
            </p>
          </div>
          <Draggable type="label" label="Label" />
          <Draggable type="input" label="Input" />
          <Draggable type="button" label="Button" />
        </div>
        <DroppableArea
          components={components}
          onDrop={handleDrop}
          onUpdatePosition={handleUpdatePosition}
          setDeleteComponent={setDeleteComponent}
          handleDelete={handleDelete}
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
