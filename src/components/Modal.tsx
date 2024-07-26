import Button from "@/ui/button/button";
import { useEffect, useState } from "react";

interface ModalProps {
  onSave: (props: any) => void;
  initialProps: {
    text: string;
    fontWeight: string;
    fontSize: string;
    labelType: string;
  };
  setShowModal: (value: boolean) => void;
}

export default function Modal({
  onSave,
  initialProps,
  setShowModal,
}: ModalProps) {
  const [text, setText] = useState(initialProps.text);
  const [fontWeight, setFontWeight] = useState(initialProps.fontWeight);
  const [fontSize, setFontSize] = useState(initialProps.fontSize);
  const [labelType, setLabelType] = useState<string>(initialProps.labelType);

  useEffect(() => {
    setText(initialProps.text);
    setFontWeight(initialProps.fontWeight);
    setFontSize(initialProps.fontSize);
  }, [initialProps]);

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    onSave({ text, fontWeight, fontSize, labelType });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-96 bg-white rounded shadow">
        <div className="flex items-center justify-between gap-2 p-4 border-b-2">
          <h1 className="text-xl font-semibold">Edit Label</h1>
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
          <div className="">
            <label className="block mb-1 text-sm">Label Type</label>
            <select
              name="labelType"
              id="type"
              value={labelType}
              className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setLabelType(e.target.value || "label")}
            >
              <option value="label">Label</option>
              <option value="input">Input</option>
              <option value="button">Button</option>
            </select>
          </div>
          <div className="w-full mt-2">
            <Button onClick={(event) => handleSave(event)}>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
