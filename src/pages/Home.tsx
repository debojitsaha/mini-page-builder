import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

import Draggable from "@/components/Draggable";
import DroppableArea from "@/components/DroppableArea";
import Dropped from "@/components/Dropped";
import Modal from "@/components/Modal";
import useToast from "@/hooks/useToast";
import { ComponentProps, ModalProps } from "@/interface";

import Button from "@/ui/button/button";
import ToastContainer from "@/ui/toast/ToastContainer";

export default function Home() {
  const { toasts, addToast } = useToast();
  const [components, setComponents] = useState<ComponentProps[]>(
    JSON.parse(localStorage.getItem("components") || "[]")
  );
  const [labelType, setLabelType] = useState("label");
  const [showModal, setShowModal] = useState(false);
  const [modalProps, setModalProps] = useState<any>(null);
  const [deleteComponent, setDeleteComponent] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("components", JSON.stringify(components));
  }, [components]);

  const handleDrop = (component: any, x: number, y: number) => {
    setShowModal(true);
    setModalProps({ component, x, y, id: nanoid() });
  };

  const handleModalSave = (props: ModalProps) => {
    setComponents([
      ...components,
      {
        text: props.text,
        type: props.labelType,
        fontWeight: props.fontWeight,
        fontSize: props.fontSize,
        x: modalProps.x,
        y: modalProps.y,
        id: nanoid(),
      },
    ]);
    setShowModal(false);
  };

  const handleUpdatePosition = (id: string | number, x: number, y: number) => {
    setComponents(
      components.map((component) =>
        component.id === id ? { ...component, x, y } : component
      )
    );
  };

  const handleDelete = () => {
    if (components.length === 0) {
      addToast("No components to clear", "error");
      return;
    }
    if (deleteComponent) {
      setComponents(
        components.filter((component) => component.id !== deleteComponent)
      );
      setDeleteComponent(null);
    } else {
      addToast("Component Selected, press Delete", "info");
    }
  };

  const handleExportJSON = () => {
    if (components.length === 0) {
      addToast("No components to export", "info");
      return;
    }
    addToast("Preparing JSON..", "success");
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
      <ToastContainer toasts={toasts} />
      <div className="flex flex-col sm:flex-row items-center justify-between p-4">
        <h1 className="text-2xl font-bold mb-4">
          Mini Page
          <span className="text-blue-700"> Builder</span>
        </h1>
        <div className="flex items-center gap-2 w-full sm:w-fit">
          <Button
            variant="ghost"
            onClick={() => {
              if (components.length === 0) {
                addToast("No components to clear", "error");
                return;
              }
              setComponents([]);
              localStorage.setItem("components", "[]");
            }}
          >
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
          <Draggable type="label" label="Label" setLabelType={setLabelType} />
          <Draggable type="input" label="Input" setLabelType={setLabelType} />
          <Draggable type="button" label="Button" setLabelType={setLabelType} />
        </div>
        <DroppableArea
          components={components}
          onDrop={handleDrop}
          onUpdatePosition={handleUpdatePosition}
          setDeleteComponent={setDeleteComponent}
          handleDelete={handleDelete}
        />
      </div>
      <div className="relative border border-dashed border-gray-300 min-h-[400px]">
        {components.map((component) => (
          <Dropped
            key={component.id}
            component={component}
            onUpdatePosition={handleUpdatePosition}
            setDeleteComponent={setDeleteComponent}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      {showModal && (
        <Modal
          onSave={handleModalSave}
          initialProps={{
            text: "Sample",
            fontWeight: "400",
            fontSize: "16",
            labelType: labelType,
          }}
          setShowModal={setShowModal}
          coordinates={modalProps}
        />
      )}
    </div>
  );
}
