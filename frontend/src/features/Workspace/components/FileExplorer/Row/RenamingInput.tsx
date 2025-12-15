import { useState, useEffect } from "react";

export function RenamingInput({
  initialValue,
  onRename,
  onFinish,
}: {
  initialValue: string;
  onRename: (value: string) => void;
  onFinish: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onRename(value);
      onFinish(value);
    }
  };

  return (
    <input
      autoFocus
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onBlur={() => {console.log("blurred"); onFinish(value);}}
      className="bg-[#1e1e1e] text-white text-sm w-full px-1"
    />
  );
}
