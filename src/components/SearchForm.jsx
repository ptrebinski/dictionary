import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ReactComponent as SearchIcon } from "../assets/icon-search.svg";

function SearchForm({ onSearch, className }) {
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { value } = e.target.search;
    if (value.length === 0) {
      setIsValid(false);
      return;
    }

    onSearch(value);
  };

  const handleChange = () => {
    if (!isValid) setIsValid(true);
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className="relative">
        <input
          className={twMerge(
            "w-full rounded-2xl bg-neutral-100  py-3.5 pl-6 pr-14  font-bold caret-primary placeholder:text-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:py-5 sm:text-xl",
            !isValid && "border border-error focus-visible:outline-error",
          )}
          type="text"
          id="search"
          name="search"
          autoComplete="off"
          placeholder="Search for any word..."
          onChange={handleChange}
        />
        <SearchIcon className="absolute right-6 top-1/2 -translate-y-1/2" />
      </div>
      {!isValid && (
        <p className="mt-2 text-error sm:text-xl">Whoops, can't be empty...</p>
      )}
    </form>
  );
}

export default SearchForm;
