import {
  GET_CHARACTERS,
  GET_SPECIE,
  GET_DELETE_CHARACTER,
  GET_MODIFY_CHARACTERS,
  GET_ITEM_BY_ID,
  GET_ITEM_BY_NAME,
  ORDER_BY_AZ,
  CLEAR_SEARCH,
  FILTER_BY_SPECIE,
  FILTER_BY_CREATED,
} from "./actions";

const initialState = {
  characters: [],
  allCharacters: [],
  species: [],
  deleteItem: [],
  modifyItem: [],
  itemById: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
        allCharacters: action.payload,
      };
    case GET_SPECIE:
      return {
        ...state,
        species: action.payload,
      };
    case GET_DELETE_CHARACTER:
      return {
        ...state,
        deleteItem: action.payload,
      };

    case GET_MODIFY_CHARACTERS:
      return {
        ...state,
        modifyItem: action.payload,
      };

    case GET_ITEM_BY_ID:
      return {
        ...state,
        itemById: action.payload,
      };

    case GET_ITEM_BY_NAME:
      let search;
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        search = action.payload;
      } else {
        search = [];
      }
      return {
        ...state,
        characters: search,
      };

    case FILTER_BY_SPECIE:
      const allSpecies = state.allCharacters;
      const filteredSpecies =
        action.payload === "All"
          ? allSpecies
          : allSpecies.filter(
              (el) => el.species && el.species.includes(action.payload)
            );

      return {
        ...state,
        characters: filteredSpecies,
      };
    case FILTER_BY_CREATED:
      const allCreated = state.allCharacters;
      const filteredCreated =
        action.payload === "All"
          ? allCreated
          : allCreated.filter((el) => el.create === action.payload);
      return {
        ...state,
        characters: filteredCreated,
      };

    case ORDER_BY_AZ:
      const allAlphabet = state.allCharacters;
      let sortedArr;
      if (action.payload === "des") {
        sortedArr = state.characters.slice().sort(function (a, b) {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "asc") {
        sortedArr = state.characters.slice().sort(function (a, b) {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "clear") {
        sortedArr = allAlphabet;
      }

      return { ...state, characters: sortedArr };

    case CLEAR_SEARCH:
      return {
        ...state,
        allCharacters: state.initialCountries,
      };

    default:
      return state;
  }
};

export default rootReducer;
