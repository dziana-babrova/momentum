import playList from "./playList.js";
console.log(playList);

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

  playList.forEach((el) => {
    const li = document.createElement("li");
    playListContainer.append(li);
    li.classList.add("play-item");
    li.textContent = el.title;
  });

const playedItem = document.querySelectorAll(".play-item");
console.log(playedItem);

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

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
  localStorage.setItem("city", city.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
  city.value = localStorage.getItem("city") || "Minsk";
  getWeather();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("be-BY", { hour12: false });
  time.textContent = currentTime;
  setTimeout(showTime, 1000);

  function showDate() {
    const currentDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
    dateElement.textContent = currentDate;
  }
  showDate();

  const timeOfDay = getTimeOfDay();
  greeting.textContent = `Good ${timeOfDay}, `;
}
showTime();

function getRandomNum() {
  return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

let randomNum = getRandomNum();

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

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=df22eb73d662962611e5beabc33f24b8&units=imperial`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = "weather-icon owf";
    weatherError.textContent = "";

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed / 3.6)} m/\s`;
    humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)}%`;
    console.log(data);
  } catch {
    weatherError.textContent = "Enter valid city";
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    weatherDescription.textContent = "";
  }
}

city.addEventListener("change", getWeather);
document.addEventListener("DOMContentLoaded", getWeather);

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * (102 + 1));
  console.log(data.quotes[randomNum]);
  quote.textContent = data.quotes[randomNum].quote;
  author.textContent = data.quotes[randomNum].author;
}
getQuotes();

changeQuote.addEventListener("click", getQuotes);

const audio = new Audio();
let isPlay = false;

let playNum = 0;
function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    play.classList.add("pause");
    playedItem[playNum].classList.add("item-active");
  } else {
    audio.pause();
    isPlay = false;
    play.classList.remove("pause");
  }
  audio.addEventListener("ended", playNext);
}

function playNext() {
  playNum++
  if (playNum > playList.length - 1) {
    playNum = 0
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playedItem.forEach((item) => item.classList.remove("item-active"));
  playedItem[playNum].classList.add("item-active");
  isPlay = true;
  play.classList.add("pause");
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
  isPlay = true;
  play.classList.add("pause");
}

play.addEventListener("click", playAudio);
playNextTrack.addEventListener("click", playNext);
playPrevTrack.addEventListener("click", playPrev);

