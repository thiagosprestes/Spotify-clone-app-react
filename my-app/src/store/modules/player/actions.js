export function playTrack(trackData) {
    return {
        type: 'PLAY_TRACK',
        trackData,
    };
}
