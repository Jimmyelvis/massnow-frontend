import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';

export const list = () => {
    return fetch(`${API}/api/topnew`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};