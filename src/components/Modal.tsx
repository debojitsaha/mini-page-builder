import { useState } from "react";

interface ModalProps {
  onSave: (props: any) => void;
  initialProps: any;
}

export default function Modal({ onSave, initialProps }: ModalProps) {
  const [text, setText] = useState(initialProps.text);
  const [fontWeight, setFontWeight] = useState(initialProps.fontWeight);
  const [fontSize, setFontSize] = useState(initialProps.fontSize);

  const handleSave = () => {
    onSave({ text, fontWeight, fontSize });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block mb-1">Label Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Font Weight</label>
          <select
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="normal">Normal</option>
            <option value="bold">Bold</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block mb-1">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
