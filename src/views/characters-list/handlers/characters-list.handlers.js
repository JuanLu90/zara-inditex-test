// SERVICES
import {
  getCharactersListService,
  getCharactersListFilterService,
} from "../services/characters-list.services";

const getCharactersListHandler = async ({
  setCharactersList,
  setIsFetching,
  setFilterInfo,
  page,
}) => {
  setIsFetching(true);

  try {
    const response = await getCharactersListService(page);

    if (response) {
      const {
        data: { results, total },
      } = response;
      const charactersInfoFiltered = results.map((character) => {
        const {
          id,
          name,
          thumbnail: { path, extension },
        } = character;

        return { id, name, path, extension };
      });

      setFilterInfo({ page, total, search: "" });
      setCharactersList(charactersInfoFiltered);
    } else {
      console.error("Error on getCharactersListHandler()");
    }
  } catch (e) {
    console.error(e);
  }

  setIsFetching(false);
};

const getCharactersListFilterHandler = async ({
  setCharactersList,
  setFilterInfo,
  setIsFetching,
  value,
}) => {
  setIsFetching(true);
  try {
    const response = await getCharactersListFilterService(value);

    if (response) {
      const {
        data: { results, total },
      } = response;

      const charactersInfoFiltered = results.map((character) => {
        const {
          id,
          name,
          thumbnail: { path, extension },
        } = character;

        return { id, name, path, extension };
      });

      setFilterInfo((prevState) => ({
        ...prevState,
        total,
        results,
      }));

      setCharactersList(charactersInfoFiltered);
    } else {
      console.error("Error on getCharactersListFilterHandler()");
    }
  } catch (e) {
    console.error(e);
  }

  setIsFetching(false);
};

const CharactersListHandlers = ({
  setCharactersList,
  setIsFetching,
  setFilterInfo,
}) => ({
  handleGetCharactersList: (page) =>
    getCharactersListHandler({
      setCharactersList,
      setIsFetching,
      setFilterInfo,
      page,
    }),
  handleFilterCharacterstList: (value) =>
    getCharactersListFilterHandler({
      setCharactersList,
      setIsFetching,
      value,
      setFilterInfo,
    }),
});

export default CharactersListHandlers;
