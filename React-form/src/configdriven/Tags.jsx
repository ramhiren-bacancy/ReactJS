import { useState } from 'react'

const Tags = ({ name, value, onChange, placeholder }) => {
  const [input, setInput] = useState("");

  function addTag() {
    const trimmed = input.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput("");
  }

  function removeTag(tag) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value[value.length - 1])
    }
  } 

 
  return (
    <>
    <div className='flex'>
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
        name={name}
        value={input}
        placeholder={value.length === 0 ? placeholder : ""}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        className="border rounded py-2 px-3 w-full mt-1"
      />
    </>
  );
}

export default Tags;