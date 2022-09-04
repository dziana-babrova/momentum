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
const currentTrack = document.querySelector(".current-track");
const TrackDuration = document.querySelector(".current-track-time");
const currentPosition = document.querySelector(".current-position");
const mute = document.querySelector(".mute");
const volume = document.querySelector(".volume-slider");
const settings = document.querySelector(".settings");
const dropdown = document.querySelector(".dropdown-container");
const settingsItems = document.querySelectorAll(".settings-item");
const player = document.querySelector(".player");
const weather = document.querySelector(".weather");
const greetingContainer = document.querySelector(".greeting-container");
const quotesContainer = document.querySelector(".quotes-container");
const todoButton = document.querySelector(".todo-add");
const todoInput = document.querySelector(".todo-text");
const todoList = document.querySelector(".todo-items");
const progressBarv2 = document.querySelector(".progress");
const trackwidth = document.querySelector(".range");
const volumeBar = document.querySelector(".volume-range");
const volumeLevel = document.querySelector(".volume-level");
const todoContainer = document.querySelector(".todo-container");
const checkboxesList = document.querySelector(".dropdown-content-2");
const opacity = document.querySelector(".opacity");

let settingsObject = {
  language: "en",
  imagesource: "GitHub",
  blocks: {
    player: true,
    weather: true,
    time: true,
    date: true,
    greeting: true,
    quotes: true,
    todo: true,
  },
};

console.log(
  "Часы и календарь +15\nПриветствие +10\nСмена фонового изображения +20\nВиджет погоды +15\nВиджет цитата дня +10\nАудиоплеер +15\nПродвинутый аудиоплеер +20\nПеревод приложения на два языка (en/ru или en/be) +15\nПолучение фонового изображения от API +10\nНастройки приложения +20\nToDo List - список дел +10"
);

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

const tagsInput = document.createElement("div");
tagsInput.classList.add("tags-input");
const tagsInputField = document.createElement("input");
tagsInputField.classList.add("tags-input-field");
tagsInputField.type = "text";

tagsInputField.addEventListener("change", setBg);

localization.toggles[languageDropdown.value].forEach((element, index) => {
  const checkboxListItem = document.createElement("li");
  checkboxListItem.classList.add("settings-item");
  checkboxesList.append(checkboxListItem);
  const checkbox = document.createElement("input");
  checkbox.classList.add("toggle");
  checkbox.classList.add(`toggle-${index}`);
  checkbox.type = "checkbox";
  checkbox.checked = true;
  checkbox.id = element;
  checkboxListItem.append(checkbox);
  const label = document.createElement("label");
  label.classList.add("checkbox-label");
  label.htmlFor = element;
  checkboxListItem.prepend(label);
  label.textContent = element;
});

const checkboxLables = document.querySelectorAll(".checkbox-label");
const toggles = document.querySelectorAll(".toggle");

function translateToggles() {
  checkboxLables.forEach((el, index) => {
    el.textContent = localization.toggles[languageDropdown.value][index];
  });
}

/* Set settings elements*/
function setSettingsLabels() {
  settingsItems[0].textContent = localization.langDropdown[languageDropdown.value];
  settingsItems[1].textContent = localization.imageSource[languageDropdown.value];
  settingsItems[2].textContent = localization.imageTags[languageDropdown.value];
  todoButton.textContent = localization.addbutton[languageDropdown.value];
  todoInput.placeholder = localization.todoPlaceholder[languageDropdown.value];

  settingsItems[0].append(languageDropdown);
  settingsItems[1].append(imageSourceDropdown);
  settingsItems[2].append(tagsInput);
  settingsItems[2].appendChild(tagsInputField);
}

/* Set and get local storage */
window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

function setLocalStorage() {
  localStorage.setItem("settingsItems", JSON.stringify(settingsObject));
  localStorage.setItem("nameItem", userName.value);
  localStorage.setItem("cityItem", city.value);
  if (tagsInputField.value !== `${getTimeOfDay()}, nature`) {
    localStorage.setItem("tagsItems", tagsInputField.value);
  } else {
    localStorage.removeItem("tagsItems");
  }
  localStorage.setItem("todoItems", JSON.stringify(todoArray));
}

function getLocalStorage() {
  if (localStorage.getItem("settingsItems")) {
    settingsObject = JSON.parse(localStorage.getItem("settingsItems"));
  }
  languageDropdown.value = settingsObject.language;
  imageSourceDropdown.value = settingsObject.imagesource;
  if (localStorage.getItem("tagsItems")) {
    tagsInputField.value = localStorage.getItem("tagsItems");
  } else {
    tagsInputField.value = `${getTimeOfDay()}, nature`;
  }
  setBg();

  city.value = localStorage.getItem("cityItem") || localization.cityPlaceholder[languageDropdown.value];
  if (localStorage.getItem("nameItem")) {
    userName.value = localStorage.getItem("nameItem");
  } else {
    userName.placeholder = localization.namePlaceholder[languageDropdown.value];
  }
  changeInputSize();

  translateToggles();
  setSettingsLabels();
  showTime();
  getWeather();
  getQuotes();

  if (localStorage.getItem("todoItems")) {
    todoArray = JSON.parse(localStorage.getItem("todoItems"));
  }
  displayTodo();
  setElementsVisibilityOnLoad();
}

/* Show settings */
settings.addEventListener("click", showDrop);
opacity.addEventListener("click", showDrop);

function showDrop() {
  dropdown.classList.toggle("show");
  opacity.classList.toggle("add");
}

/* Change language */
languageDropdown.addEventListener("change", function showOption() {
  settingsObject.language = languageDropdown.value;

  city.value = localization.cityPlaceholder[languageDropdown.value];
  userName.placeholder = localization.namePlaceholder[languageDropdown.value];

  changeInputSize();
  translateToggles(); //
  setSettingsLabels(); //
  showTime();
  getWeather();
  getQuotes();
  displayTodo();
});

/* Hide/display elements */
checkboxesList.addEventListener("click", (e) => {
  hideAllElements(e);
});

function hideAllElements(e) {
  let idOfetTarget = e.target.id.toLowerCase();

  if (e.target.checked) {
    document.querySelector(`#${idOfetTarget}`).classList.remove("hide");
    settingsObject.blocks[idOfetTarget] = true;
  } else {
    document.querySelector(`#${idOfetTarget}`).classList.add("hide");
    settingsObject.blocks[idOfetTarget] = false;
  }
}

function setElementsVisibilityOnLoad() {
  toggles.forEach((el, i) => {
    if (settingsObject.blocks[el.id.toLowerCase()]) {
      document.querySelector(`#${el.id.toLowerCase()}`).classList.remove("hide");
      toggles[i].checked = true;
    } else {
      document.querySelector(`#${el.id.toLowerCase()}`).classList.add("hide");
      toggles[i].checked = false;
    }
  });
}

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

  showDate();
  showTimeOfDay();
  setTimeout(showTime, 1000);
}

function showDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString(localization.languageCode[languageDropdown.value], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  dateElement.textContent = currentDate;
}

function showTimeOfDay() {
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

/* Change Name Input Size */
userName.addEventListener("input", changeInputSize);

function changeInputSize() {
  if (userName.value) {
    let size = userName.value;
    if (userName.value.length < 3) {
      userName.size = 1;
    } else {
      userName.size = size.length - 3;
    }
  } else {
    let size = userName.placeholder;
    userName.size = size.length - 4;
  }
}

/* Create todo list */
todoButton.addEventListener("click", createArrayOfTodo);
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    createArrayOfTodo();
  }
});

let todoArray = [];
function createArrayOfTodo() {
  if (!todoInput.value) return;
  let newTodo = {
    todo: todoInput.value,
    checked: false,
    important: false,
  };

  todoArray.push(newTodo);
  displayTodo();
  todoInput.value = "";
}

function displayTodo() {
  let displayTodo = "";
  todoArray.forEach((item, i) => {
    displayTodo += `<li class="todo-element ${item.important ? "important" : ""}" title="${
      !item.important ? localization.tooltip[languageDropdown.value] : ""
    }">
    <input class="items" type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
    <label class="todolabels" for="item_${i}">${item.todo}</label>
    <span class="close">+</span>
    </li>`;
    todoList.innerHTML = displayTodo;
  });

  let todoelements = document.querySelectorAll(".todo-element");
  let closeButtons = document.querySelectorAll(".close");

  closeButtons.forEach((el, index) => {
    el.addEventListener("click", function () {
      todoArray.splice(index, 1);
      todoelements[index].remove();
    });
  });

  todoelements.forEach((el, index) =>
    el.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      todoArray[index].important = !todoArray[index].important;
      el.classList.toggle("important");
    })
  );

  todoelements.forEach((el, index) =>
    el.addEventListener("change", function (event) {
      todoArray[index].checked = !todoArray[index].checked;
      if (todoArray[index].checked) {
        el.classList.add("done");
      } else {
        el.classList.remove("done");
      }
    })
  );
}

/* Show weather */
city.addEventListener("change", getWeather);

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

/* Show quote */
changeQuote.addEventListener("click", getQuotes);

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();
  const randomNum = Math.floor(Math.random() * (102 + 1));
  quote.textContent = data.quotes[randomNum].quote[languageDropdown.value];
  author.textContent = data.quotes[randomNum].author[languageDropdown.value];
}

/* Set background image */
let randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
imageSourceDropdown.addEventListener("change", setBg);

function setBg() {
  if (imageSourceDropdown.value === gitHubImages.value) {
    const timeOfDay = getTimeOfDay();
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/dziana-babrova/stage1-tasks/assets/images/${timeOfDay}/${randomNum
      .toString()
      .padStart(2, "0")}.jpg`;
    img.onload = () => {
      document.body.style.backgroundImage = `url('${img.src}')`;
    };
  } else if (imageSourceDropdown.value === unsplashImages.value) {
    setImageFromUnsplash();
  } else if (imageSourceDropdown.value === flickrImages.value) {
    setImageFromFlickr();
  }
  settingsObject.imagesource = imageSourceDropdown.value;
}

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

/* Set background image from Unsplash */
async function setImageFromUnsplash() {
  try {
    const url = `https://api.unsplash.com/photos/random?query=${tagsInputField.value}&client_id=CVFE2yn8y8lan7oI9_yMsGO3e4IQzQR0cV28F68IJOc&orientation=landscape`;
    const res = await fetch(url);
    const data = await res.json();
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      document.body.style.backgroundImage = `url('${img.src}')`;
      document.body.style.backgroundSize = "cover";
    };
  } catch {
    imageSourceDropdown.value = gitHubImages.value;
    setBg();
    alert("You've exceeded the limit of images. The source of images was changed to GitHub");
  }
}

/* Set background image from Flickr */
async function setImageFromFlickr() {
  try {
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f0b17f0e527c2406c514c98a4392b1f7&tags=${tagsInputField.value}&extras=url_l&format=json&nojsoncallback=1&safe_search=1&per_page=200`;
    const res = await fetch(url);
    const data = await res.json();
    const photoArray = await data.photos.photo
      .filter((el) => el.url_l !== undefined)
      .filter((el) => el.width_l > el.height_l);
    let random = Math.floor(Math.random() * (photoArray.length - 1));
    const img = new Image();
    img.src = photoArray[random].url_l;
    img.onload = () => {
      document.body.style.backgroundImage = `url('${img.src}')`;
      document.body.style.backgroundSize = "cover";
    };
  } catch {
    setImageFromFlickr();
  }
}

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

const playedIcons = document.querySelectorAll(".individual-play");
const trackTexts = document.querySelectorAll(".individual-text");

/* Audio Player */
const audio = new Audio();
audio.volume = 0.5;
let isPlay = false;
let playNum = 0;
let curtime = 0;

/* Change active elements*/
function changeActiveElements() {
  trackTexts.forEach((item) => item.classList.remove("item-active"));
  trackTexts[playNum].classList.add("item-active");
  playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
  playedIcons[playNum].classList.add("individual-play-active");
  currentTrack.textContent = playList[playNum].title;
}

/* Set attributes for played track and play it*/
play.addEventListener("click", playAudio);
playNextTrack.addEventListener("click", playNext);
playPrevTrack.addEventListener("click", playPrev);
audio.addEventListener("ended", playNext);
audio.addEventListener("timeupdate", function () {
  curtime = parseInt(audio.currentTime, 10);
  progressBarv2.style.width = `${(180 * curtime) / audio.duration}px`;
  currentPosition.textContent = `${parseTime(curtime)}/`;
});

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

function playTrack() {
  audio.play();
  isPlay = true;
  play.classList.add("pause");
}

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = curtime;
    playTrack();
    changeActiveElements();
  } else {
    audio.pause();
    isPlay = false;
    play.classList.remove("pause");
    playedIcons[playNum].classList.remove("individual-play-active");
  }
}

function playNext() {
  playNum++;
  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playTrack();
  changeActiveElements();
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = playList.length - 1;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playTrack();
  changeActiveElements();
}

playedIcons.forEach((el, key) =>
  el.addEventListener("click", function playTrackFromPlaylist() {
    if (playNum === key) {
      playNum = key;
      playAudio();
    } else {
      playNum = key;
      isPlay = false;
      curtime = 0;
      playAudio();
    }
  })
);

audio.addEventListener("loadedmetadata", function () {
  TrackDuration.textContent = parseTime(audio.duration);

  let mouseDown = false;

  trackwidth.addEventListener("mousedown", (e) => {
    mouseDown = true;
  });

  trackwidth.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      audioChangeTime(e);
    }
  });

  trackwidth.addEventListener("mouseup", (e) => {
    if (mouseDown) {
      audioChangeTime(e);
      mouseDown = false;
    }
  });

  player.addEventListener("mouseup", (e) => {
    mouseDown = false;
  });

  trackwidth.addEventListener("click", audioChangeTime);
});

  function audioChangeTime(e) {
    let currentPositionOnBar = e.clientX - progressBarv2.offsetLeft;
    let currentPositionOnBarInPercent = (currentPositionOnBar * 100) / trackwidth.offsetWidth;
    audio.currentTime = (currentPositionOnBarInPercent * audio.duration) / 100;
  }

/* Change volume */
let volumeMousedown = false;

mute.addEventListener("click", muteAudio);
volumeBar.addEventListener("click", changeVolume);

volumeBar.addEventListener("mousedown", function (e) {
  volumeMousedown = true;
});

volumeBar.addEventListener("mousemove", function (e) {
  if (volumeMousedown) {
    changeVolume(e);
  }
});

volumeBar.addEventListener("mouseup", function (e) {
  if (volumeMousedown) {
    changeVolume(e);
    volumeMousedown = false;
  }
});

player.addEventListener("mouseup", function (e) {
  volumeMousedown = false;
});

function changeVolume(e) {
  let currentPositionOnBar = e.clientX - volumeBar.offsetLeft;
  volumeLevel.style.width = `${currentPositionOnBar}px`;
  let volumeInPercent = (currentPositionOnBar * 100) / volumeBar.offsetWidth;
  audio.volume = volumeInPercent / 100;
  if (audio.volume === 0) {
    mute.classList.add("unmute");
  } else {
    audio.muted = false;
    mute.classList.remove("unmute");
  }
}

function muteAudio() {
  mute.classList.toggle("unmute");
  audio.muted = !audio.muted;
  if (!audio.muted) {
    volumeLevel.style.width = audio.volume * 100 + "%";
  } else {
    volumeLevel.style.width = `${0}%`;
  }
}
