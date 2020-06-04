import store from '../store/index';

export default function previewPlayerData(track, album, artists) {
    store.dispatch({
        type: 'PLAY_TRACK',
        trackInfo: {
            id: track.id,
            name: track.name,
            preview: track.preview_url,
        },
        trackAlbum: {
            id: album.id,
            image: album.images[0].url,
        },
        trackArtists: artists,
    });
}
