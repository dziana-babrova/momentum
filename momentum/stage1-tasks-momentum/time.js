import playList from "./playList.js";
import localization from "./localization.js";

const time = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");
const play = document.querySelector(".play");
const playPrevTrack = document.querySelector(".play-prev");
const playNextTrack = document.querySelector(".play-next");
const playListContainer = document.querySelector(".play-list");
const progressBar = document.querySelector("#seek");
const currentTrack = document.querySelector(".current-track");
const TrackDuration = document.querySelector(".current-track-time");
const currentPosition = document.querySelector(".current-position");
const mute = document.querySelector(".mute");
const volume = document.querySelector(".volume-slider");
const settings = document.querySelector(".settings");
const dropdown = document.querySelector(".dropdown-content");
const settingsItems = document.querySelectorAll(".settings-item");

/** Create playlist */
playList.forEach((el) => {
  const li = document.createElement("li");
  playListContainer.append(li);
  li.classList.add("play-item");
  const buttonPlay = document.createElement("button");
  li.append(buttonPlay);
  const div = document.createElement("div");
  li.append(div);
  div.textContent = el.title;
  buttonPlay.classList.add("individual-play");
  div.classList.add("individual-text");
});

const playedItem = document.querySelectorAll(".play-item");
const playedIcons = document.querySelectorAll(".individual-play");

/* Set and get local storage */
function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
  localStorage.setItem("language", languageDropdown.value);
  localStorage.setItem("Image source", imageSourceDropdown.value);
}

function getLocalStorage() {
  languageDropdown.value = localStorage.getItem("language") || "En";
  imageSourceDropdown.value = localStorage.getItem("Image source") || gitHubImages;

  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  } else {
    userName.placeholder = localization.namePlaceholder[languageDropdown.value];
  }

  city.value = localStorage.getItem("city") || localization.cityPlaceholder[languageDropdown.value];
  getWeather();
  setSettingsLabels();
  showTime();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

/** Create settings items */
const languageDropdown = document.createElement("select");
const langEn = document.createElement("option");
const langBe = document.createElement("option");
languageDropdown.classList.add("lang-dropdown");
languageDropdown.name = "language";
langEn.value = "en";
langBe.value = "ru";
langEn.textContent = "En";
langBe.textContent = "Ru";
languageDropdown.append(langEn);
languageDropdown.append(langBe);

const imageSourceDropdown = document.createElement("select");
const gitHubImages = document.createElement("option");
const flickrImages = document.createElement("option");
const unsplashImages = document.createElement("option");
imageSourceDropdown.classList.add("image-dropdown");
imageSourceDropdown.name = "Image source";
gitHubImages.value = "GitHub";
flickrImages.value = "Flickr";
unsplashImages.value = "Unsplash";
gitHubImages.textContent = "GitHub";
flickrImages.textContent = "Flickr";
unsplashImages.textContent = "Unsplash";
imageSourceDropdown.append(gitHubImages);
imageSourceDropdown.append(flickrImages);
imageSourceDropdown.append(unsplashImages);

function createSettingsElements() {
  settingsItems[0].append(languageDropdown);
  settingsItems[1].append(imageSourceDropdown);
}

createSettingsElements();

/* Get time of the day*/
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    return "night";
  } else if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours < 24) {
    return "evening";
  }
}

/* Show time, date and greeting */
async function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("be-BY", { hour12: false });
  time.textContent = currentTime;
  setTimeout(showTime, 1000);

  function showDate() {
    const currentDate = date.toLocaleDateString(localization.languageCode[languageDropdown.value], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
    dateElement.textContent = currentDate;
  }
  showDate();

  const timeOfDay = getTimeOfDay();
  switch (timeOfDay) {
    case "morning":
      greeting.textContent = localization.goodmorning[languageDropdown.value];
      break;
    case "afternoon":
      greeting.textContent = localization.goodafternoon[languageDropdown.value];
      break;
    case "evening":
      greeting.textContent = localization.goodevening[languageDropdown.value];
      break;
    case "night":
      greeting.textContent = localization.goodnight[languageDropdown.value];
      break;
  }
}

showTime();

/* Show weather */
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${languageDropdown.value}&appid=df22eb73d662962611e5beabc33f24b8&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherError.textContent = "";

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${localization.windSpeed[languageDropdown.value]}: ${Math.round(data.wind.speed / 3.6)} ${
      localization.metersPerSec[languageDropdown.value]
    }`;
    humidity.textContent = `${localization.humidity[languageDropdown.value]}: ${data.main.humidity.toFixed(0)}%`;
  } catch {
    weatherError.textContent = localization.weatherError[languageDropdown.value];
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherDescription.textContent = "";
  }
}

city.addEventListener("change", getWeather);

/* Show quote */
async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * (102 + 1));
  quote.textContent = data.quotes[randomNum].quote[languageDropdown.value];
  author.textContent = data.quotes[randomNum].author[languageDropdown.value];
}
getQuotes();

changeQuote.addEventListener("click", getQuotes);

/* Show settings */
function showDrop() {
  dropdown.classList.toggle("show");
}

settings.addEventListener("click", showDrop);

/* Set background image */
let randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

function setBg() {
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/dziana-babrova/stage1-tasks/assets/images/${timeOfDay}/${randomNum
    .toString()
    .padStart(2, "0")}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${img.src}')`;
  };
}

setBg();

function getSlideNext() {
  randomNum++;
  if (randomNum > 20) {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// languageDropdown.value = localStorage.getItem("language") || "en";

languageDropdown.addEventListener("change", function showOption() {
  city.value = localization.cityPlaceholder[languageDropdown.value];
  userName.placeholder = localization.namePlaceholder[languageDropdown.value];
  setSettingsLabels();
  getWeather();
  getQuotes();
});

function setSettingsLabels() {
  settingsItems[0].textContent = `${localization.langDropdown[languageDropdown.value]}`;
  settingsItems[1].textContent = localization.imageSource[languageDropdown.value];
  settingsItems[0].append(languageDropdown);
  settingsItems[1].append(imageSourceDropdown);
}

const audio = new Audio();
let isPlay = false;
let playNum = 0;
let curtime = 0;
let source = "";

function muteAudio() {
  mute.classList.toggle("unmute");
  if (audio.muted === false) {
    audio.muted = true;
  } else {
    audio.muted = false;
  }
}

mute.addEventListener("click", muteAudio);

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = curtime;
    audio.preload = "auto";
    audio.play();
    audio.volume = volume.value / 100;
    isPlay = true;
    play.classList.add("pause");
    let audioDuration;
    playedItem[playNum].classList.add("item-active");
    playedIcons[playNum].classList.add("individual-play-active");
    currentTrack.textContent = playList[playNum].title;

    volume.addEventListener("input", function (e) {
      audio.volume = e.currentTarget.value / 100;
      if (audio.volume === 0) {
        mute.classList.add("unmute");
      } else {
        mute.classList.remove("unmute");
      }
    });

    audio.addEventListener("loadedmetadata", function () {
      audioDuration = audio.duration;
      TrackDuration.textContent = parseTime(audio.duration);
      progressBar.max = audioDuration;

      function parseTime(duration) {
        let minutes, seconds;
        minutes = Math.floor(duration / 60)
          .toString()
          .padStart(2, "0");
        seconds = Math.floor(duration % 60)
          .toString()
          .padStart(2, "0");
        return `${minutes}:${seconds}`;
      }

      audio.addEventListener("timeupdate", function () {
        curtime = parseInt(audio.currentTime, 10);
        progressBar.value = curtime;
        currentPosition.textContent = `${parseTime(curtime)}/`;
      });

      function audioChangeTime(e) {
        let currentPositionOnBar = e.clientX - progressBar.offsetLeft;
        let currentPositionOnBarInPercent = (currentPositionOnBar * 100) / progressBar.offsetWidth;
        audio.currentTime = (currentPositionOnBarInPercent * audio.duration) / 100;
      }

      progressBar.addEventListener("click", audioChangeTime);
    });
  } else {
    audio.pause();
    isPlay = false;
    play.classList.remove("pause");
    playedIcons[playNum].classList.remove("individual-play-active");
  }
  audio.addEventListener("ended", playNext);
}

function playNext() {
  playNum++;
  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playedItem.forEach((item) => item.classList.remove("item-active"));
  playedItem[playNum].classList.add("item-active");
  playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
  playedIcons[playNum].classList.add("individual-play-active");
  isPlay = true;
  play.classList.add("pause");
  currentTrack.textContent = playList[playNum].title;
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = playList.length - 1;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playedItem.forEach((item) => item.classList.remove("item-active"));
  playedItem[playNum].classList.add("item-active");
  playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
  playedIcons[playNum].classList.add("individual-play-active");
  isPlay = true;
  play.classList.add("pause");
  currentTrack.textContent = playList[playNum].title;
}

play.addEventListener("click", playAudio);
playNextTrack.addEventListener("click", playNext);
playPrevTrack.addEventListener("click", playPrev);

let currentTrackValue = 5;

playedIcons.forEach((el, key) =>
  el.addEventListener("click", function someFunction() {
    if (currentTrackValue === key) {
      playNum = key;
      audio.source = playList[key].src;
      playedItem.forEach((item) => item.classList.remove("item-active"));
      playedItem[playNum].classList.add("item-active");
      playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
      playedIcons[playNum].classList.add("individual-play-active");
      playAudio();
      currentTrackValue = key;
    } else {
      isPlay = false;
      curtime = 0;
      playNum = key;
      audio.source = playList[key].src;
      playedItem.forEach((item) => item.classList.remove("item-active"));
      playedItem[playNum].classList.add("item-active");
      playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
      playedIcons[playNum].classList.add("individual-play-active");
      playAudio();
      currentTrackValue = key;
    }
  })
);
