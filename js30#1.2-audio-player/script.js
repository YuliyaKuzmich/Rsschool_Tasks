const player = document.querySelector('.player'),
     nowPlaying = document.querySelector('.title'),
     playBtn = document.querySelector('.play'),
     prevBtn = document.querySelector('.prev'),
     nextBtn = document.querySelector('.next'),
     audio = document.querySelector('.audio'),
     progressContainer = document.querySelector('.progress_container'),
     progress = document.querySelector('.progress'),
     song = document.querySelector('.song'),
     singer = document.querySelector('.singer'),
     imgSrc = document.querySelector('.img_src'),
     cover = document.querySelector('.cover_img')
     wrapper = document.querySelector('.wrapper')

let songIndex = 0;
/**let isPlaying = false;**/
let updateTimer;

const musicList = [
        {
            img: 'img/cover0.jpeg' ,
            name : 'Kupalinka' ,
            artist : 'ŠUMA' ,
            music : 'audio/Kupalinka.wav'
        } ,
        {
            img: 'img/cover1.jpeg' ,
            name : 'Thunder' ,
            artist : 'IMAGINE DRAGONS' ,
            music : 'audio/Thunder.mp3'
        }
    ]

function loadSong(songIndex){
    clearInterval(updateTimer);
        // reset();
        // currTrack.src =  musicList[songIndex].music;
        // currTrack.load();
    
    wrapper.style.backgroundImage = `url('${musicList[songIndex].img}')`;
        cover.src = musicList[songIndex].img;
        audio.src = musicList[songIndex].music;
        song.textContent = musicList[songIndex].name;
        singer.textContent = musicList[songIndex].artist;
        nowPlaying.textContent = "Playing music " + (songIndex + 1) + " of " + musicList.length;
    
        // updateTimer = setInterval(setUpdate, 1000);
    
        /**currTrack.addEventListener('ended', nextTrack);**/
}

loadSong(songIndex);
    // console.log(loadSong(1))

function playSong() {
    player.classList.add('play')
    cover.classList.add('active')
    imgSrc.src = './img/pause.svg'
    audio.play()
}

function pauseSong() {
    player.classList.remove('play')
    cover.classList.remove('active')
    audio.pause()
}

playBtn.addEventListener('click' , () => {
    const isPlaying = player.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


