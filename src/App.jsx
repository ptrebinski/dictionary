import { useMutation } from "@tanstack/react-query";
import { useTheme } from "./hooks/useTheme";
import { useFont } from "./hooks/useFont";
import SearchForm from "./components/SearchForm";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./components/NotFound";
import WordDefinition from "./components/WordDefinition";
import Switch from "./components/Switch";
import FontSelect from "./components/FontSelect";
import { ReactComponent as Logo } from "./assets/logo.svg";
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

  const [font, setFont] = useFont();

  const fontVariants = {
    sans: "font-sans",
    serif: "font-serif",
    mono: "font-mono",
  };

  return (
    <div
      className={`min-h-screen bg-white  text-zinc-800 ${fontVariants[font]} dark:bg-black dark:text-white`}
    >
      <div className="mx-auto w-11/12 max-w-3xl">
        <header className="flex items-center  py-7 sm:py-14">
          <Logo className="ml-0 mr-auto" />
          <FontSelect value={font} onChange={setFont} />
          <div className="ml-4 flex items-center gap-3 border-l border-gray-200 pl-4 sm:ml-6 sm:gap-5 sm:pl-6">
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
