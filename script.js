// Block Dev Tools

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "F12") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
  }
});

setInterval(function () {
  const start = performance.now();
  debugger;
  const end = performance.now();
  if (end - start > 100) {
    document.body.innerHTML = "<h1> Zugriff verweigert. </h1>";
  }
}, 1000);



// Document Typing Effect

const text = "x.Lito";
let index = 0;
let direction = 1;
let cursorVisible = true;

function updateTitle() {
  let displayed = text.slice(0, index);
  document.title = displayed + (cursorVisible ? "|" : " ");
  cursorVisible = !cursorVisible;

  if (direction === 1) {
    if (index < text.length) {
      index++;
    } else {
      direction = -1;
      setTimeout(updateTitle, 1000);
      return;
    }
  } else {
    if (index > 0) {
      index--;
    } else {
      direction = 1;
    }
  }
  setTimeout(updateTitle, 170);
}

updateTitle();



// Audio Player

const audio = document.getElementById("bg-audio");
const playPauseBtn = document.getElementById("play-pause");
const volumeBar = document.getElementById("volume-bar");
const volumeContainer = document.getElementById("volume-container");

audio.volume = 1;

playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = "❚❚";
  } else {
    audio.pause();
    playPauseBtn.innerHTML = "►";
  }
});

function setVolume(e) {
  const rect = volumeContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  let volume = clickX / rect.width;

  if (volume < 0) volume = 0;
  if (volume > 1) volume = 1;

  audio.volume = volume;
  volumeBar.style.width = (volume * 100) + "%";
}

volumeContainer.addEventListener("click", setVolume);

let isDragging = false;

volumeContainer.addEventListener("mousedown", () => {
  isDragging = true;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    setVolume(e);
  }
});

// Versuche beim Laden automatisch zu starten
window.addEventListener("load", () => {
  audio.play().then(() => {
    playPauseBtn.innerHTML = "❚❚"; // Button auf Pause-Icon setzen, weil es läuft
  }).catch((error) => {
    // Autoplay blockiert, Button bleibt auf Play-Icon
    console.log("Autoplay wurde blockiert:", error);
  });
});
