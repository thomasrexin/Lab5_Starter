// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
}

const hornSelect = document.querySelector("[name='horn']");
const img = document.querySelector("[alt='No image selected']");
const audio = document.querySelector('.hidden');

hornSelect.addEventListener('change', (event) => {
  img.src = `assets/images/${event.target.value}.svg`;
  audio.src = `assets/audio/${event.target.value}.mp3`
})

const volumeSelect = document.querySelector("[name='volume']");
const volumeImg = document.querySelector("[alt='Volume level 2']");

volumeSelect.addEventListener('input', updateVolume);

function updateVolume(num) {
  if (num.target.value == 0) {
    volumeImg.src = `assets/icons/volume-level-0.svg`;
  }
  else if (num.target.value < 33) {
    volumeImg.src = `assets/icons/volume-level-1.svg`;
  }
  else if (num.target.value < 67) {
    volumeImg.src = `assets/icons/volume-level-2.svg`;
  }
  else {
    volumeImg.src = `assets/icons/volume-level-3.svg`;
  }
  audio.volume = num.target.value / 100;
}

const confetti = new JSConfetti();
const playSound = document.querySelector('button');

playSound.addEventListener('click', () => {
  audio.play();
  if (img.currentSrc.endsWith("party-horn.svg")) {
    confetti.addConfetti();
  }
})