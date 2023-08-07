import axios from "axios";

const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const getWordDefinition = async (word) => {
  const { data } = await axios.get(URL + word);

  return data;
};

export const transformData = (data) => {
  return data?.map((item, index) => {
    return {
      id: item.word + index,
      word: item.word,
      phonetics:
        item.phonetics?.find((item) => item.audio !== "") || item.phonetics[0],
      meanings: item.meanings,
      sourceUrl: item.sourceUrls,
    };
  });
};
