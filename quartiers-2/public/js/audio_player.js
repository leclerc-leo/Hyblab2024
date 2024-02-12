class AudioPlayer {
    constructor(audioElement, controlsElement) {
        this.audio = audioElement;
        this.playIcon = controlsElement.querySelector('.playIcon');
        this.pauseIcon = controlsElement.querySelector('.pauseIcon');
        this.progressBar = controlsElement.querySelector('.progressBar');
        this.currentTimeDisplay = controlsElement.querySelector('.currentTime');
        this.durationDisplay = controlsElement.querySelector('.duration');

        this.playIcon.addEventListener('click', () => this.togglePlayPause());
        this.pauseIcon.addEventListener('click', () => this.togglePlayPause());
        this.progressBar.addEventListener('input', () => this.updateAudioProgress());

        this.audio.addEventListener('timeupdate', () => {
            this.progressBar.value = (this.audio.currentTime / this.audio.duration) * 100;
            this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        });
        this.updateProgressBar();
    }

    togglePlayPause() {
        if (this.audio.paused) {
            this.audio.play();
            this.playIcon.style.display = 'none';
            this.pauseIcon.style.display = 'inline';
            this.updateProgressBar();
            // on met pause sur tous les autres AudioPlayer
            document.querySelectorAll('audio').forEach(audio => {
                if (audio !== this.audio) {
                    audio.pause();
                    // on change l'image de pause en play
                    audio.nextElementSibling.querySelector('.playIcon').style.display = 'inline';
                    audio.nextElementSibling.querySelector('.pauseIcon').style.display = 'none';
                }
            });

        } else {
            this.audio.pause();
            this.playIcon.style.display = 'inline';
            this.pauseIcon.style.display = 'none';
        }
    }

    updateProgressBar() {
        const progress = (this.audio.currentTime / this.audio.duration) * 100;
        this.progressBar.value = progress;
        this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
        this.durationDisplay.textContent = this.formatTime(this.audio.duration);
        if (!this.audio.paused) {
            requestAnimationFrame(() => this.updateProgressBar());
        }
    }

    updateAudioProgress() {
        const progress = this.progressBar.value * this.audio.duration / 100;
        this.audio.currentTime = progress;
    }

    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}
