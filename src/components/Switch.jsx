function Switch({ checked, onChange }) {
  return (
    <label>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className="h-5 w-10 cursor-pointer rounded-full bg-neutral-500 p-[3px] before:block before:h-3.5 before:w-3.5 before:rounded-full before:bg-white before:transition-transform peer-checked:bg-primary peer-checked:before:translate-x-5 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary" />
    </label>
  );
}

export default Switch;
