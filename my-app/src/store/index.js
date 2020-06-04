import { createStore } from 'redux';

const INITIAL_STATE = {
    data: [],
};

function trackInfo(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PLAY_TRACK':
            return {
                data: {
                    track: action.trackInfo,
                    album: action.trackAlbum,
                    artists: action.trackArtists,
                },
            };
        default:
            return state;
    }
}

const store = createStore(trackInfo);

export default store;
