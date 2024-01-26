let audio;
let currentSound = 0;
let countdownDuration = 3;
let countdownInterval;
let artistTrue = false;
let songTrue = false;

document.addEventListener('DOMContentLoaded', () => {
    countdownInterval = setInterval(startBlindtest, 1000);
    startBlindtest();

    // Ecoute de la réponse
    document.addEventListener('reponseBlindTest', (e) => {
        artistTrue = verifArtist(e.detail.transcript);
        songTrue = verifTitle(e.detail.transcript);
        if(artistTrue && songTrue) {
            document.getElementById('result').textContent = "bravo vous avez trouvé";
            currentSound++;
            startSound();
        }
        else if(artistTrue) {
            document.getElementById('result').textContent =  "Vous avez trouvé l'artiste, quel est la chanson maintenant ?";
        }
        else if(songTrue) {
            document.getElementById('result').textContent = "Vous avez trouvé la chanson, quel est l'artiste maintenant ?";
        }
    });
})

function verifArtist(response) {

    if(artistTrue === true) return true;
    return response.toLowerCase().includes(document.getElementById('artist_song').value.toLowerCase()); 
}

function verifTitle(response) {
   if(songTrue === true) return true;
   return response.toLowerCase().includes(document.getElementById('title_song').value.toLowerCase()); 
}

function startBlindtest() {
    document.getElementById("countdown").innerText = `Le blindtest va démarrer dans ${countdownDuration} seconde(s)` ;
    countdownDuration--;
    if (countdownDuration < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerText = "";
        startSound();
    }
}

function startSound() {
    artistTrue = false;
    songTrue = false;
    // si il y a deja un son on le stop
    if(audio) {
        audio.pause();
        audio = null;
    }

    document.getElementById('result').value = "";
    if(songs.length > 0 && songs[currentSound] != undefined) {
        document.getElementById('artist_song').value = songs[currentSound].artist_name.toLowerCase();
        document.getElementById('title_song').value = songs[currentSound].title.toLowerCase();

        audio = new Audio(songs[currentSound].preview);
        audio.play();
    }
    else if(songs.length <= currentSound) {
        document.getElementById('result').textContent =  "Vous avez terminé le blindtest";
    }
}