import { useEffect, useState } from "react";

interface ModalProps {
  onSave: (props: any) => void;
  initialProps: { text: string; fontWeight: string; fontSize: string };
}

export default function Modal({ onSave, initialProps }: ModalProps) {
  const [text, setText] = useState(initialProps.text);
  const [fontWeight, setFontWeight] = useState(initialProps.fontWeight);
  const [fontSize, setFontSize] = useState(initialProps.fontSize);

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
    onSave({ text, fontWeight, fontSize });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block mb-1">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" || event.key === "Delete") {
                event.stopPropagation();
              }
            }}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Font Weight</label>
          <input
            type="number"
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" || event.key === "Delete") {
                event.stopPropagation();
              }
            }}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Backspace" || event.key === "Delete") {
                event.stopPropagation();
              }
            }}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={(event) => handleSave(event)}
            className="w-full bg-blue-500 text-white p-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
