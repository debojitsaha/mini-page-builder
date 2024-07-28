import Button from "@/ui/button/button";
import { capitaliseFirstLetter } from "@/utils";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  onSave: (props: any) => void;
  initialProps: {
    text: string;
    fontWeight: string;
    fontSize: string;
    labelType: string;
  };
  setShowModal: (value: boolean) => void;
  coordinates?: { x: number; y: number };
}

export default function Modal({
  onSave,
  initialProps,
  setShowModal,
  coordinates,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(initialProps.text);
  const [fontWeight, setFontWeight] = useState(initialProps.fontWeight);
  const [fontSize, setFontSize] = useState(initialProps.fontSize);
  const [labelType] = useState<string>(initialProps.labelType);
  const [position, setPosition] = useState({
    x: coordinates?.x || 0,
    y: coordinates?.y || 0,
  });

  useEffect(() => {
    setText(initialProps.text);
    setFontWeight(initialProps.fontWeight);
    setFontSize(initialProps.fontSize);
  }, [initialProps]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        event.stopPropagation(); // Stop event from bubbling up
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onSave({ text, fontWeight, fontSize, labelType });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="w-96 bg-white rounded shadow">
        <div className="flex items-start justify-between gap-2 p-4 border-b-2">
          <h1 className="text-xl font-semibold">
            Edit Config
            <span className="text-sm text-blue-500">
              {" "}
              ({capitaliseFirstLetter(labelType)})
            </span>
          </h1>
          <div className="cursor-pointer" onClick={() => setShowModal(false)}>
            X
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="">
            <label className="block mb-1 text-sm">Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Backspace" || event.key === "Delete") {
                  event.stopPropagation();
                }
              }}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <div className="w-1/2">
              <label className="block mb-1 text-sm">X</label>
              <input
                type="number"
                value={position.x}
                onChange={(e) =>
                  setPosition({ ...position, x: Number(e.target.value) })
                }
                onKeyDown={(event) => {
                  if (event.key === "Backspace" || event.key === "Delete") {
                    event.stopPropagation();
                  }
                }}
                className="border p-2 w-full rounded-md"
                readOnly
                disabled
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm">Y</label>
              <input
                type="number"
                value={position.y}
                onChange={(e) =>
                  setPosition({ ...position, y: Number(e.target.value) })
                }
                onKeyDown={(event) => {
                  if (event.key === "Backspace" || event.key === "Delete") {
                    event.stopPropagation();
                  }
                }}
                className="border p-2 w-full rounded-md"
                readOnly
                disabled
              />
            </div>
          </div>
          <div className="">
            <label className="block mb-1 text-sm">Font Weight</label>
            <input
              type="number"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Backspace" || event.key === "Delete") {
                  event.stopPropagation();
                }
              }}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="">
            <label className="block mb-1 text-sm">Font Size</label>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Backspace" || event.key === "Delete") {
                  event.stopPropagation();
                }
              }}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="w-full mt-2">
            <Button onClick={(event) => handleSave(event)}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
