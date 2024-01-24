document.addEventListener('DOMContentLoaded', () => {    
    // Pour ne pas avoir l'écoute si l'utilisateur tape un espace dans la recherche
    document.querySelector("#keyword").addEventListener('keydown', (e) => e.stopPropagation())
    document.querySelector("#keyword").addEventListener('keyup', (e) => e.stopPropagation())

    document.querySelectorAll('[data-music]').forEach((element) => {
        element.addEventListener('click', (event) => {        
            const current = event.currentTarget
  
            document.querySelector('.amazingaudioplayer-cover').src=current.dataset.cover;
            document.querySelector('.amazingaudioplayer-title').textContent=current.dataset.title;
            document.querySelector('.amazingaudioplayer-info').textContent=current.dataset.artist;
            document.querySelector('#waitSong').classList.remove('hide')

            document.querySelector("#id_rapid_api_deezer").value=current.dataset.id;
            document.querySelector("#title").value=current.dataset.title;
            document.querySelector("#artist_name").value=current.dataset.artist;
            document.querySelector("#cover").value=current.dataset.cover;
            document.querySelector("#preview").value=current.dataset.music;
 
            if(current.dataset.exists=='true') {
                document.querySelector('#not-exists').classList.add('hide')
                document.querySelector('#exists').classList.remove('hide')
            } else {
                document.querySelector('#exists').classList.add('hide')
                document.querySelector('#not-exists').classList.remove('hide')
            }
            // Le son 
            const audioElement = document.getElementById('listenTopMusic');
            audioElement.src = current.dataset.music;
            audioElement.play();
        })
    });
    document.querySelector('#not-exists').addEventListener('click', saveSong);
})


function saveSong() {
    const formData = new FormData();
    formData.append('id_rapid_api_deezer', document.querySelector("#id_rapid_api_deezer").value);
    formData.append('title', document.querySelector("#title").value);
    formData.append('artist_name', document.querySelector("#artist_name").value);
    formData.append('cover', document.querySelector("#cover").value);
    formData.append('preview', document.querySelector("#preview").value);
    
    fetch('/search', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams([...formData.entries()])
        }
    ).then(response => response.json()).then(response => {
        if(response.status=='ok') {
            document.querySelector(`[data-id="${response.id_rapid_api_deezer}"]`).dataset.exists = "true";
            document.querySelector('#not-exists').classList.add('hide')
            document.querySelector('#exists').classList.remove('hide')
            document.querySelector('#message').innerHTML = `<div class="alert alert-success mt-2">${response.msg}</div>`;
            window.setTimeout(() => {  document.querySelector('#message').innerHTML =''; }, 3000)
        }
    });
}