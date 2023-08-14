import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactComponent as ArrowDownIcon } from "../assets/icon-arrow-down.svg";

const options = [
  { label: "Sans serif", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "mono" },
];

function FontSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef();
  const currentValueLabel = options.find(
    (option) => option.value === value,
  )?.label;

  const toggleOptions = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  const selectOption = (option) => {
    onChange(option);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case "Enter":
        case "Space":
          e.preventDefault();
          toggleOptions();
          if (isOpen) selectOption(options[highlightedIndex].value);

          break;
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue);
          }
          break;
        }
      }
    };

    containerRef.current.addEventListener("keydown", handler);

    return () => {
      containerRef.current.removeEventListener("keydown", handler);
    };
  }, [isOpen, highlightedIndex, selectOption]);

  return (
    <div
      onClick={toggleOptions}
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      ref={containerRef}
      className="relative cursor-pointer rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-2">
        <span>{currentValueLabel || value}</span> <ArrowDownIcon />
      </div>
      {isOpen && (
        <ul className="absolute -bottom-2 right-0 z-50 w-max translate-y-full rounded-xl bg-white p-2 shadow-[0px_5px_30px_rgba(0,0,0,0.1)] dark:bg-zinc-900 dark:shadow-purple-500">
          {options.map((option, index) => (
            <li
              key={option.value}
              value={option.value}
              className={twMerge(
                "relative cursor-pointer rounded-md  py-1 pl-6 pr-3",
                `font-${option.value}`,
                value === option.value &&
                  "before:absolute before:left-1 before:font-sans before:content-['✓'] ",
                highlightedIndex === index && "bg-purple-500 text-white",
              )}
              onClick={(e) => {
                e.stopPropagation();
                onChange(option.value);
                setIsOpen(false);
              }}
              onMouseEnter={() => {
                setHighlightedIndex(index);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FontSelect;
