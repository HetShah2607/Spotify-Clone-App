console.log("Welcome to Spotify!");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/Khalasi.mp3');
let masterPlay = document.getElementById('masterPlay');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Khalasi - Aditya Gadhvi",filePath:"songs/Khalasi.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"The Batman Theme song",filePath:"songs/The_Batman.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Millionare - Yo Yo Honey Singh",filePath:"songs/MILLIONAIRE.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"MI 7 Theme song",filePath:"songs/Dead_Reckoning.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Jaana Samjho Na - Bhool Bhulaiya 3",filePath:"songs/Jaana_Samjho_Na.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Heat waves - Glass Animals",filePath:"songs/Heat_Waves.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Portals - Avengers Endgame",filePath:"songs/Portals.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Until I Found You - Stephen Sanchez",filePath:"songs/unitil_i_found_you.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"WWE Roman Reigns Theme",filePath:"songs/Roman_Reigns.mp3",coverPath:"cover/Baby_Groot.jpeg"},
    {songName:"Veera Dhara - Kalki 2898 A.D.",filePath:"songs/Veera_Dheera.mp3",coverPath:"cover/Baby_Groot.jpeg"}
]

songItems.forEach((elements ,i)=>{
    elements.getElementsByTagName("img")[0].src = songs[i].coverPath;
    elements.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
//audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime <=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

//listen to events
audioElement.addEventListener('timeupdate',  ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});
//1
const makeAllplays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach ((elements)=>{
        elements.classList.remove('fa-pause-circle');
        elements.classList.add('fa-play-circle');
    });
};
//2
Array.from(document.getElementsByClassName('songItemPlay')).forEach((elements) => {
    elements.addEventListener('click', (e) => {
        if (audioElement.src.includes(songs[songIndex].filePath) && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        } else {
            makeAllplays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});

//3
document.getElementById('next').addEventListener('click', ()=>{
    makeAllplays();
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    //update the play button of the current index in the page
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
})
//4
document.getElementById('previous').addEventListener('click', ()=>{
    makeAllplays();
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;

    // Update the play button of the current song
    document.getElementById(songIndex).classList.remove('fa-play-circle');
    document.getElementById(songIndex).classList.add('fa-pause-circle');
})