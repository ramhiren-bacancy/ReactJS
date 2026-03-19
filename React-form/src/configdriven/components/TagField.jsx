import { useState } from "react";

const TagField = ({ field, value, error, onChange }) => {
  const [input, setInput] = useState("");

  function handleChange(updatedTags) {
    onChange({ target: { name: field.name, value: updatedTags, type: "tags" } });
  }

  function addTag() {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    handleChange([...value, trimmed]);
    setInput("");
  }

  function removeTag(tag) {
    handleChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  }

  return (
    <div className="mb-4">
      <label className="block font-medium text-black">{field.label}
        {field.validation?.required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-1 mt-1">
        {value.map((tag) => (
          <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-400 hover:text-blue-800 font-bold leading-none"
            >
              X
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        name={field.name}
        value={input}
        placeholder={value.length === 0 ? "Add a skill and press enter" : ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        className="border rounded py-2 px-3 w-full mt-1"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TagField;