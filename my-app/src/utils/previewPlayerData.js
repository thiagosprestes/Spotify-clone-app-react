import store from '../store/index';

export default function previewPlayerData(track, albumImage, artists) {
    store.dispatch({ type: 'PLAY_TRACK',  trackInfo: {id: track.id, name: track.name, preview: track.preview_url}, trackImage: albumImage , trackArtists: artists})
}