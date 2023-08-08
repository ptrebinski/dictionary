import { useMutation } from "@tanstack/react-query";
import { useTheme } from "./hooks/useTheme";
import SearchForm from "./components/SearchForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./components/NotFound";
import WordDefinition from "./components/WordDefinition";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Switch from "./components/Switch";
import { ReactComponent as MoonIcon } from "./assets/icon-moon.svg";
import { getWordDefinition } from "./api";

function App() {
  const {
    data,
    status,
    mutate: search,
  } = useMutation({
    mutationFn: getWordDefinition,
  });

  const theme = useTheme();

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-800 dark:bg-black dark:text-white">
      <div className="mx-auto w-11/12 max-w-3xl">
        <header className="flex items-center justify-between py-7 sm:py-14">
          <Logo />
          <div className="flex items-center gap-3 sm:gap-5">
            <Switch checked={theme.isDark} onChange={theme.toggle} />
            <MoonIcon className="stroke-neutral-500 dark:stroke-primary" />
          </div>
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
