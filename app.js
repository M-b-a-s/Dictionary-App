// DOM Elements

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const getWord = document.getElementById("search");


// click search button to search for word
getWord.addEventListener("click", () => {
  const inputText = document.getElementById("input-text").value;
  if(inputText === ''){
    result.innerHTML = `<h3 class="empty-input">Please type in a word 😎</h3>`
  } else {
    fetch(`${url}${inputText}`)
    .then((res) => res.json())
    .then((data) => {
      result.innerHTML = `
        <h2 class="word">${inputText}</h2>
        <span class="phonetics">${data[0].phonetic}</span>
        <span class="part-of-speech">${data[0].meanings[0].partOfSpeech}</span>
        <span><i class="uil uil-microphone mic" onclick="playSound()"></i></span>
        <div class="meaning">
          <p class="meaning-text">
           ${data[0].meanings[0].definitions[0].definition}
          </p>
        </div>
        <div class="example">
         ${data[0].meanings[0].definitions[0].example || "no example"}
        </div>`;
        // get audio from API
        audio = new Audio(data[0].phonetics[0].audio);
    })
    .catch(() => {
      result.innerHTML = `<h3 class="err">❌<br>Couldn't find word</h3>`;
  });
}

});
  

// play audio
function playSound() {
    audio.play();
}