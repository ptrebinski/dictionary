import { transformData } from "../api";
import { ReactComponent as PlayIcon } from "../assets/icon-play.svg";

function play(audio) {
  new Audio(audio).play();
}

function WordDefinition({ data, onSearch }) {
  const transformedData = transformData(data);

  return (
    <section className="">
      {transformedData?.map(({ id, word, phonetics, meanings }, index) => (
        <article key={id} className="mb-8 mt-6 sm:mb-10">
          <header className="mb-7 flex items-center justify-between sm:mb-10">
            <div>
              <h2 className="mb-2 text-3xl font-bold sm:text-6xl">
                {word}{" "}
                {data.length > 1 && (
                  <span className="ms-2 text-xs font-medium text-neutral-500 sm:text-lg">
                    {index + 1} of {data.length}
                  </span>
                )}
              </h2>
              <p className="text-lg text-primary sm:text-2xl">
                {phonetics?.text}
              </p>
            </div>

            {phonetics?.audio ? (
              <button
                className="grid aspect-square w-12 place-items-center rounded-full bg-primary bg-opacity-25 text-primary hover:bg-opacity-100 hover:text-white focus-visible:outline-none focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-16 "
                onClick={() => {
                  play(phonetics.audio);
                }}
              >
                <PlayIcon className="w-1/3" />
              </button>
            ) : null}
          </header>

          <div className="space-y-10">
            {meanings.map(
              ({ partOfSpeech, definitions, synonyms, antonyms }) => (
                <div key={`${id}-${partOfSpeech}`}>
                  <div className="mb-8 flex items-center gap-5 sm:mb-10">
                    <h3 className="text-lg font-bold italic sm:text-2xl">
                      {partOfSpeech}
                    </h3>
                    <hr className="w-full border-gray-200" />
                  </div>

                  <div>
                    <h4 className="mb-5 text-neutral-500 sm:mb-6 sm:text-xl">
                      Meaning
                    </h4>
                    <ul className="list-disc space-y-3.5 pl-5 marker:text-primary sm:text-lg">
                      {definitions.map(({ definition, example }, index) => (
                        <li key={`${id}-${partOfSpeech}-definition-${index}`}>
                          {definition}
                          {example ? (
                            <p className="mt-1 text-neutral-500">
                              &quot;{example}&quot;
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {synonyms?.length > 0 && (
                    <div className="mt-6 flex gap-5 sm:mt-12 sm:text-xl">
                      <h4 className="text-neutral-500">Synonyms</h4>
                      <ul className="flex flex-wrap gap-3 font-bold text-primary ">
                        {[...new Set(synonyms)].map((synonym) => (
                          <li key={synonym}>
                            <button
                              className="hover:underline"
                              onClick={() => onSearch(synonym)}
                            >
                              {synonym}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {antonyms?.length > 0 && (
                    <div className="mt-5 flex gap-5 sm:mt-7 sm:text-xl">
                      <h4 className="text-neutral-500">Antonyms</h4>
                      <ul className="flex flex-wrap gap-3 font-bold text-primary ">
                        {[...new Set(antonyms)].map((antonym) => (
                          <li key={antonym}>
                            <button
                              className="hover:underline"
                              onClick={() => onSearch(antonym)}
                            >
                              {antonym}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </article>
      ))}

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-neutral-200 py-6 text-sm sm:mt-10 sm:py-7 sm:text-base">
        <h4 className="text-neutral-500">Source</h4>
        <a
          className="underline hover:text-primary"
          href={data[0]?.sourceUrls[0]}
        >
          {data[0]?.sourceUrls[0]}
        </a>
      </div>
    </section>
  );
}

export default WordDefinition;
