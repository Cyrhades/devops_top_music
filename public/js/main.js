document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-music]').forEach((element) => {
        element.addEventListener('click', (event) => {        
            const current = event.currentTarget
            // info
            console.log(current.dataset.title)
            document.getElementById('artist_song').value=current.dataset.artist;
            document.getElementById('title_song').value=current.dataset.title;
            // Le son 
            const audioElement = document.getElementById('listenTopMusic');
            audioElement.src = current.dataset.music;
            audioElement.play();


        })
    });
})