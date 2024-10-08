import { ChangeEvent, useState } from "react";

const FormApply: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleApply = () => {
    inputValue.trim() === "" ? setMessage("Please enter code.") : setMessage("");
    setInputValue("");
  };

  return (
    <div>
      <div className="flex overflow-hidden rounded-lg border">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 border-none p-2 text-lg outline-none"
          placeholder="Enter Code"
        />
        <button onClick={handleApply} className="bg-primary-500 px-4 py-2 text-lg text-white-500">
          Apply
        </button>
      </div>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </div>
  );
};

export default FormApply;
