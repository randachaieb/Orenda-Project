import axios from "axios";
import { GET_CARDS, FILTER_CARDS_BY_TITLE, FILTER_CARDS_BY_REGION, FILTER_CARDS_BY_CATEGORY } from "./ActionTypes";

export const getCards = () => (dispatch) => {
  axios
    .get("/api/cards/allCards")
    .then((res) => dispatch({ type: GET_CARDS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addCard = (newCard) => (dispatch) => {
  axios
    .post("/api/cards/add", newCard)
    .then((res) => dispatch(getCards()))
    .catch((err) => console.log('err', err))
};

export const deleteCard = (idCard) => (dispatch) => {
  axios
    .delete(`/api/cards/delete/${idCard}`)
    .then((res) => dispatch(getCards()))
    .catch((err) => console.log(err));
};
export const editCard = (idCard, editedCard) => (dispatch) => {
  axios
    .put(`/api/cards/edit/${idCard}`, editedCard)
    .then((res) => dispatch(getCards()))
    .catch((err) => console.log(err));
};

export const filterCardsByTitle = payload => {
    return {
        type: FILTER_CARDS_BY_TITLE,
        payload
    }
};

export const filterCardsByRegion = payload => {

  return {
      type: FILTER_CARDS_BY_REGION,
      payload
  }
};

export const filterCardsByCategory = payload => {

  return {
      type: FILTER_CARDS_BY_CATEGORY,
      payload
  }
}

export const subscribe = (idCard, idUser) => (dispatch) => {
  axios
    .put(`/api/cards/subscribe/${idCard}/${idUser}`)
    .then((res) => dispatch(getCards()))
    .catch((err) => console.log(err));
};

export const unsubscribe = (idCard, idUser) => (dispatch) => {
  axios
    .put(`/api/cards/unsubscribe/${idCard}/${idUser}`)
    .then((res) => dispatch(getCards()))
    .catch((err) => console.log(err));
};