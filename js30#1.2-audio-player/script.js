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
     currentTimePro = document.querySelector('.current_time')
     totalTime = document.querySelector('.total_duration')

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
    imgSrc.src = './img/play.svg'
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

function nextTrack () {
    if(songIndex + 1 > musicList.length - 1) {
        songIndex = 0;
    } else {
    songIndex++
    }
    loadSong(songIndex)
    playSong()
}

nextBtn.addEventListener('click' , nextTrack)

function prevTrack () {
    if(songIndex - 1 < 0) {
        songIndex = musicList.length - 1;
    } else {
    songIndex--
    }
    loadSong(songIndex)
    playSong()
}

prevBtn.addEventListener('click' , prevTrack)


function updateProgress(element) {
    const { duration, currentTime } = element.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  
    currentTimePro.textContent = currentTime ? formatTime(currentTime) : '0:00';
  
    // Check if duration is a valid number before updating totalTime
    if (!isNaN(duration)) {
      totalTime.textContent = formatTime(duration);
    }
  }
audio.addEventListener('timeupdate', updateProgress);

function setProgress (element) {
    const width = this.clientWidth
    const clickX = element.offsetX
    const duration = audio.duration
    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click' , setProgress)

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }

audio.addEventListener('ended' , nextTrack)


