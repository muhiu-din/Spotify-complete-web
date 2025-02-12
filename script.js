console.log('Lets write some js');
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let result = await a.text();
    console.log(result);
    let div = document.createElement("div")
    div.innerHTML = result
    let as = div.getElementsByTagName("a")
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        let href = element.getAttribute("href");
        if (href.endsWith(".mp3")) {
            songs.push(href)
        }

    }
return songs;
    
    
}
async function main() {
    let songs = await getSongs()
    console.log(songs);

    let songol = document.querySelector(".SongsLists").getElementsByTagName("ol")[0]
    for (const song of songs) {
        songol.innerHTML += `<li>
                            <div class="images">
                                <img class="invert card" src="imgs/music .svg" alt="music">
                            </div>
                            <div class="info">
                                <div >${song.replace("songs,.mp" ," ")}</div>
                                <div >Muhiu</div>
                            </div>
                            <div class="playimage flex items-center">
                                <img class="invert" src="imgs/songbutton.svg" alt="">
                                <p>Play</p>
                            </div>
                        </li>`;
    }
    // play first song
    var audio = new Audio(songs[0]);
    audio.play();

    audio.addEventListener("loadeddata", ()=>{
        console.log(audio.duration ,audio.currentSrc , audio.currentTime);
        
    })
}
main()