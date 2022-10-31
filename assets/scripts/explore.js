// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
}

const synth = window.speechSynthesis;

const voiceSelect = document.querySelector('select');
const text = document.querySelector('textarea');
const button = document.querySelector('button');
const img = document.querySelector('img');

let voices = [];
let inputText = "";

function populateVoiceList() {
  voices = synth.getVoices();

  for (let i = 0; i < voices.length ; i++) {
    const option = document.createElement('option');
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += ' — DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

text.addEventListener('input', function handleChange(event) {
  inputText = event.target.value;
})

button.addEventListener('click', (event) => {
  event.preventDefault();
  const utterThis = new SpeechSynthesisUtterance(inputText);
  const selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for (let i = 0; i < voices.length ; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  utterThis.onstart = function() {
    img.src = `assets/images/smiling-open.png`;
  }
  utterThis.onend = function() {
    img.src = `assets/images/smiling.png`;
  }
})