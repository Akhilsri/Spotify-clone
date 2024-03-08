let songindex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "Let me Love" , filepath : "songs/1.mp3" , coverpath: "images/spotify-icon-marilyn-scott-0.png" },
    {songName: "Intentions" , filepath : "songs/2.mp3" , coverpath: "images/0.jpg"},
    {songName: "Calm down" , filepath : "songs/3.mp3", coverpath: "images/1.jpg" },
    {songName: "Sorry" , filepath : "songs/4.mp3" , coverpath: "images/2.jpg"},
    {songName: "We-Don't-Talk-Anymore" , filepath : "songs/5.mp3" , coverpath: "images/3.jpg"},
    {songName: "Apna-Banauna" , filepath : "songs/6.mp3" , coverpath: "images/4.jpg" },
    {songName: "Safar" , filepath : "songs/7.mp3" , coverpath: "images/5.jpg"},
]

songItem.forEach((element,i)=>{
    document.getElementsByTagName("img")[i].src = songs[i].coverpath;
    document.getElementsByClassName("songName")[i].innerText = songs[i].songName;   
})

//Handle play/pause click   
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
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
})

audioElement.addEventListener('timeupdate',()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
}) 

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = (audioElement.duration * myProgressBar.value)/100;
})
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    makeAllPlays();
    songindex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[songindex].songName;
    audioElement.src = `songs/${songindex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
})


document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=6){
        songindex=0;
    }else{
        songindex+=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }else{
        songindex-=1;
    }
    audioElement.src = `songs/${songindex+1}.mp3`;
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songindex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})