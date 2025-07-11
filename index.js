// Defining the playlist array with song details
// each object contains title, artist, file path, background image, and background color
const playlist = [
  {
    title: "Little Dolphin",
    artist: "Dolphin",
    file: "music/little-dolphin-fin-274776.mp3",
    image: "Img/DolphinSongImg.jpg",
    bgcolor: "#90b1ed"
  },
  {
    title: "My music O My Love",
    artist: "Love",
    file: "music/my-musics-o-my-love-305160.mp3",
    image: "Img/loveImg.jpg",
    bgcolor: "#e68282"
  },
  {
    title: "English Song EDM",
    artist: "Song",
    file: "music/song-english-edm-296526.mp3",
    image: "Img/EnglishMusicImg.jpg",
    bgcolor: "#a0f3f1"
  }
];

// Selecting HTML elements for the music player controls
//get reference to audio element
const audio = document.getElementById('audio');

//get references to control buttons and display elements
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const shuffleBtn = document.getElementById('shuffle');

//get references to progress bar and volume control
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');

//get references to title and artist display elements
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Initialize variables to keep track of song index and playback state
let currentTrack = 0;

// Variable to track if the song is currently playing which help toggle play/pause state
let isPlaying = false;

// Function to load the track based on the playlist or current index
// It sets the audio source, title, artist, and background image/color
function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.file;
  title.textContent = track.title;
  artist.textContent = track.artist;
  const player = document.querySelector('.player');
  player.style.backgroundImage = `url('${track.image}')`;
  player.style.backgroundColor = track.bgcolor;
}

// Function to play the current track
// It plays the audio and updates the play button text to pause icon
function playTrack() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

// Function to pause the current track
// It pauses the audio and updates the play button text to play icon
function pauseTrack() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

//Handle play/pause button click.
playBtn.addEventListener('click', () => {
  isPlaying ? pauseTrack() : playTrack();
});

// Handle next, previous, and shuffle button clicks
// It updates the current track index, loads the new track, and plays it
nextBtn.addEventListener('click', () => {
  currentTrack = (currentTrack + 1) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
});

prevBtn.addEventListener('click', () => {
  currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
  loadTrack(currentTrack);
  playTrack();
});

shuffleBtn.addEventListener('click', () => {
  currentTrack = Math.floor(Math.random() * playlist.length);
  loadTrack(currentTrack);
  playTrack();
});

// Handle volume control changes
// It updates the audio volume based on the slider input
volume.addEventListener('input', () => {
  audio.volume = volume.value;
});

// Update the progress bar as the audio plays
audio.addEventListener('timeupdate', () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

//seek audio when the progress bar is adjusted
progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Handle audio ended event to automatically play the next track
audio.addEventListener('ended', () => {
  nextBtn.click();
});

// Load the first track when the page loads
loadTrack(currentTrack);



