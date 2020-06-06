const INITIAL_STATE = {
    data: [],
};

export default function player(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'PLAY_TRACK':
            return {
                data: action.trackData,
            };
        default:
            return state;
    }
}
