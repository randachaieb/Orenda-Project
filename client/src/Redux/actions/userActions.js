import axios from 'axios';
import {GET_USERS, GET_PROFILE, FILTER_USERS_BY_FULLNAME} from './ActionTypes'



//Get all users
export const getUsers = () => (dispatch) => {
    axios
    .get("/api/users/allUsers")
    .then((res) => dispatch({ type: GET_USERS, payload: res.data }))
    .catch((err) => console.log(err));
};

//Get one user
export const getProfile = userId => (dispatch) => {
    axios
    .get(`/api/users/user/${userId}`)
    .then((res) => dispatch({ type: GET_PROFILE, payload: res.data }))
    .catch((err) => console.log(err));
};

//Delete a user
export const deleteUser = (idUser) => (dispatch) => {
    axios
    .delete(`/api/users/delete/${idUser}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

//Update a user
export const editUser = (id, editedUser) => (dispatch) => {
    axios
    .put(`/api/users/update/${id}`, editedUser)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};


//Filter users by fullname
export const filterUsersByFullname = payload => {
    return {
        type: FILTER_USERS_BY_FULLNAME,
        payload
    }
};

