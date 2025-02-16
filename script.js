console.log('Lets write some js');
let currentSong = new Audio();
let songs;
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let result = await a.text();
    console.log(result);
    let div = document.createElement("div")
    div.innerHTML = result
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        let href = element.getAttribute("href");
        if (href.endsWith(".mp3")) {
            songs.push(href)
        }

    }
    return songs;


}
function formatTime(seconds) {
    seconds = Math.floor(seconds); // Ensure seconds are whole numbers
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;

    return String(minutes).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}
const playMusic = ((track, play = false) => {
    console.log('Playing');
    if (play = true) {
        currentSong.play()
        play.src = "imgs/play.svg"
    }
    currentSong.src = track;
    currentSong.play();
    play.src = "imgs/play.svg"
    document.querySelector(".songInfo").innerHTML = track
    document.querySelector(".songTime").innerHTML = "00:00/00:00"
})
async function main() {
    // get all the songs
    songs = await getSongs()
    // playMusic(songs[0],true)
    console.log(songs);
    // show all the songs in playlist
    let songol = document.querySelector(".SongsLists").getElementsByTagName("ol")[0]
    for (const song of songs) {
        songol.innerHTML += `<li>
                            <div class="images">
                                <img class="invert card" src="imgs/music .svg" alt="music">
                            </div>
                            <div class="info">
                                <div >${song.replace("songs,.mp", " ")}</div>
                                <div >Muhiu</div>
                            </div>
                            <div class="playimage flex items-center">
                                <img class="invert" src="imgs/songbutton.svg" alt="">
                                <p>Play</p>
                            </div>
                        </li>`;
    }
    // Attach event listner with each song
    Array.from(document.querySelector(".SongsLists").getElementsByTagName("li")).forEach(e => {
        let songplaying = e.querySelector(".info").firstElementChild.innerHTML
        e.addEventListener("click", e => {
            playMusic(songplaying)
        })

    });
    // Attach event listner with play,previous,pause 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "imgs/play.svg"

        }
        else {
            currentSong.pause()
            play.src = "imgs/pause.svg"
        }
    })
    // Song durations
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songTime").innerHTML = `${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%"
    })
    // Add event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = percent + "%"
        currentSong.currentTime = ((currentSong.duration) * percent) / 100
    })
    // Add event listner to hamburger
    document.querySelector(".ham").addEventListener("click", () => {
        console.log('working');

        document.querySelector(".left").style.left = "0"
    })
    // Add event listner to cross
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%"
    })
    // Add event listner to previous next buttons
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src); 
        if (index > 0)
             { 
            playMusic(songs[index - 1]);  
        }
    });
    
    next.addEventListener("click", () => {
        let index = songs.indexOf(currentSong.src); 
        if (index < songs.length - 1) 
            { 
            playMusic(songs[index + 1]);  
        }
    });
    
}
main()