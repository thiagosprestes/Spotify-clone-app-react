import axios from 'axios';

import getHashParams from '../utils/getHashParams';

const token = getHashParams().access_token;

const api = axios.create({
    baseURL: 'https://api.spotify.com/v1',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export default api;
