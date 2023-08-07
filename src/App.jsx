import { useMutation } from "@tanstack/react-query";
import SearchForm from "./components/SearchForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./components/NotFound";
import WordDefinition from "./components/WordDefinition";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { getWordDefinition } from "./api";

function App() {
  const {
    data,
    status,
    mutate: search,
  } = useMutation({
    mutationFn: getWordDefinition,
  });

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800">
      <div className="mx-auto w-11/12 max-w-3xl">
        <header className="py-7 sm:py-14">
          <Logo />
        </header>

        <main>
          <SearchForm className="mb-6 sm:mb-11" onSearch={search} />

          {status === "loading" && (
            <LoadingSpinner className="mx-auto mt-14 block" />
          )}

          {status === "error" && <NotFound />}

          {status === "success" && (
            <WordDefinition data={data} onSearch={search} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
