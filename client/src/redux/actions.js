import axios from "axios";

export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_SPECIE = "GET_SPECIE";
export const GET_DELETE_CHARACTER = "GET_DELETE_CHARACTER";
export const GET_MODIFY_CHARACTERS = "GET_MODIFY_CHARACTERS";
export const GET_ITEM_BY_ID = "GET_ITEM_BY_ID";
export const GET_ITEM_BY_NAME = "GET_ITEM_BY_NAME";
export const ORDER_BY_AZ = "ORDER_BY_AZ";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const FILTER_BY_SPECIE = "FILTER_BY_SPECIE";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";

export function getCharacters() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3006/rickandmorthy`);

      console.log("Response data:", response.data);
      dispatch({ type: GET_CHARACTERS, payload: response.data });
    } catch (error) {
      console.log("Get getCharacters Actions Error:", error);
    }
  };
}

export function getSpecie() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3006/specie`);

      console.log("Response data:", response.data);
      dispatch({ type: GET_SPECIE, payload: response.data });
    } catch (error) {
      console.log("Get getSpecie Actions Error:", error);
    }
  };
}

export function getDeleteCharacters() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3006/rickandmorthy`);
      const createdCharacters = response.data.filter(
        (getDeleteCharacters) => getDeleteCharacters.create
      );
      dispatch({ type: GET_DELETE_CHARACTER, payload: createdCharacters });
    } catch (error) {
      console.log("Get getDeleteCharacters Actions Error:", error);
    }
  };
}

export function getModifyCharacters() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3006/rickandmorthy`);
      const createdCharacters = response.data.filter(
        (getDeleteCharacters) => getDeleteCharacters.create
      );
      dispatch({ type: GET_MODIFY_CHARACTERS, payload: createdCharacters });
    } catch (error) {
      console.log("Get getModifyCharacters Actions Error:", error);
    }
  };
}

export function getItemById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3006/rickandmorthy/${id}`
      );
      dispatch({ type: GET_ITEM_BY_ID, payload: response.data });
    } catch (error) {
      dispatch({ type: GET_ITEM_BY_ID, payload: null });
    }
  };
}

export function getItemByName(payload) {
  return async function (dispatch) {
    try {
      let response = await axios.get(
        `http://localhost:3006/rickandmorthy?name=` + payload
      );
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      return dispatch({
        type: GET_ITEM_BY_NAME,
        payload: "not found",
      });
    }
  };
}

export function FilterBySpecie(payload) {
  return {
    type: "FILTER_BY_SPECIE",
    payload,
  };
}

export function FilterByCreated(payload) {
  if (payload === "All") {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload,
    };
  } else {
    return {
      type: "FILTER_BY_CREATED",
      payload: payload === "true",
    };
  }
}

export function orderByAZ(payload) {
  return {
    type: "ORDER_BY_AZ",
    payload,
  };
}

export function clearSearch() {
  return { type: CLEAR_SEARCH };
}
