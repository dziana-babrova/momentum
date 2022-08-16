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

console.log(
  "Часы и календарь +15\nПриветствие +10\nСмена фонового изображения +20\nВиджет погоды +15\nВиджет цитата дня +10\nАудиоплеер +15\nПродвинутый аудиоплеер +20\nПеревод приложения на два языка (en/ru или en/be) +15\nПолучение фонового изображения от API +10\nНастройки приложения +20\nToDo List - список дел +10"
);

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
const trackTexts = document.querySelectorAll(".individual-text");

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
const span = document.createElement("span");
span.classList.add("focus-bg");


tagsInputField.addEventListener("change", changeBackground);

let settingsObject = {
  language: "en",
  imagesource: "GitHub",
  blocks: [
    { audio: true },
    { weather: true },
    { time: true },
    { date: true },
    { greeting: true },
    { quote: true },
    { todolist: true },
  ],
};

  localization.toggles[languageDropdown.value].forEach((element, index) => {
    const checkboxListItem = document.createElement("li");
    checkboxListItem.classList.add("settings-item")
    checkboxesList.append(checkboxListItem);
    const checkbox = document.createElement("input");
    checkbox.classList.add("toggle");
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

function translateToggles() {
  checkboxLables.forEach((el, index) => { el.textContent = localization.toggles[languageDropdown.value][index]})
}

const playerCheckbox = document.querySelector("#Player");
const weatherCheckbox = document.querySelector("#Weather");
const timeCheckbox = document.querySelector("#Time");
const DateCheckbox = document.querySelector("#Date");
const greetingCheckbox = document.querySelector("#Greeting");
const quotesCheckbox = document.querySelector("#Quotes");
const todoCheckbox = document.querySelector("#ToDo");

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

/* Hide/display elements */
function hidePlayer() {
  if (playerCheckbox.checked === false) {
    player.classList.add("hide");
    settingsObject.blocks[0].audio = false;
  } else {
    player.classList.remove("hide");
    settingsObject.blocks[0].audio = true;
  }
}

function hideWeather() {
    if (weatherCheckbox.checked === false) {
      weather.classList.add("hide");
      settingsObject.blocks[1].weather = false;
    } else {
      weather.classList.remove("hide");
      settingsObject.blocks[1].weather = true;
    }
}

function hideTime() {
      if (timeCheckbox.checked === false) {
        time.classList.add("hide");
        settingsObject.blocks[2].time = false;
      } else {
        time.classList.remove("hide");
        settingsObject.blocks[2].time = true;
      }
}

function hideDate() {
        if (DateCheckbox.checked === false) {
          dateElement.classList.add("hide");
          settingsObject.blocks[3].date = false;
        } else {
          dateElement.classList.remove("hide");
          settingsObject.blocks[3].date = true;
        }
}

function hideGreeting() {
          if (greetingCheckbox.checked === false) {
            greetingContainer.classList.add("hide");
            settingsObject.blocks[4].greeting = false;
          } else {
            greetingContainer.classList.remove("hide");
            settingsObject.blocks[4].greeting = true;
          }
}

function hideQuotes() {
            if (quotesCheckbox.checked === false) {
              quotesContainer.classList.add("hide");
              settingsObject.blocks[5].quote = false;
            } else {
              quotesContainer.classList.remove("hide");
              settingsObject.blocks[5].quote = true;
            }
}

function hideTodoList() {
  if (todoCheckbox.checked === false) {
    todoContainer.classList.add("hide");
    settingsObject.blocks[6].todolist = false;
  } else {
    todoContainer.classList.remove("hide");
    settingsObject.blocks[6].todolist = true;
  }
}

function hideAllElements() {
  hidePlayer();
  hideWeather();
  hideTime();
  hideDate();
  hideGreeting();
  hideQuotes();
  hideTodoList();
}

playerCheckbox.addEventListener("change", hidePlayer);
weatherCheckbox.addEventListener("change", hideWeather);
timeCheckbox.addEventListener("change", hideTime);
DateCheckbox.addEventListener("change", hideDate);
greetingCheckbox.addEventListener("change", hideGreeting);
quotesCheckbox.addEventListener("change", hideQuotes);
todoCheckbox.addEventListener("change", hideTodoList);

/* Set and get local storage */
function setLocalStorage() {
  localStorage.setItem("nameItem", userName.value);
  localStorage.setItem("cityItem", city.value);
  localStorage.setItem("settingsItems", JSON.stringify(settingsObject));
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
  changeBackground();

  playerCheckbox.checked = settingsObject.blocks[0].audio;
  weatherCheckbox.checked = settingsObject.blocks[1].weather;
  timeCheckbox.checked = settingsObject.blocks[2].time;
  DateCheckbox.checked = settingsObject.blocks[3].date;
  greetingCheckbox.checked = settingsObject.blocks[4].greeting;
  quotesCheckbox.checked = settingsObject.blocks[5].quote;
  todoCheckbox.checked = settingsObject.blocks[6].todolist;

  if (localStorage.getItem("nameItem")) {
    userName.value = localStorage.getItem("nameItem");
  } else {
    userName.placeholder = localization.namePlaceholder[languageDropdown.value];
  }
  changeInputSize();

  city.value = localStorage.getItem("cityItem") || localization.cityPlaceholder[languageDropdown.value];
  getWeather();
  translateToggles();
  setSettingsLabels();
  showTime();
  getQuotes();
  hideAllElements();
  if (localStorage.getItem("todoItems")) {
    todoArray = JSON.parse(localStorage.getItem("todoItems"));
  }
  displayTodo();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

/* Change Name Input Size */
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

userName.addEventListener("input", changeInputSize);

/* Create todo list */
todoButton.addEventListener("click", createArrayOfTodo);
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    createArrayOfTodo();
  }
})


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

let todoelements;
let closeButtons;

function displayTodo() {
  let displayTodo = "";
  todoArray.forEach((item, i) => {
    displayTodo += `<li class="todo-element ${item.important ? "important" : ""}" title="${!item.important ? localization.tooltip[languageDropdown.value] : ""}">
    <input class="items" type="checkbox" id="item_${i}" ${item.checked ? "checked" : ""}>
    <label class="todolabels" for="item_${i}">${item.todo}</label>
    <span class="close">+</span>
    </li>`;
    todoList.innerHTML = displayTodo;
  });

  todoelements = document.querySelectorAll(".todo-element");
  closeButtons = document.querySelectorAll(".close");

  closeButtons.forEach((el, index) => {
    el.addEventListener(("click"), function () {
      todoArray.splice(index, 1);
      todoelements[index].style.display = "none";
    })
  }
  );

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

    todoelements.forEach((el, index) => {
      if (todoArray[index].checked) {
        el.classList.add("done");
      } else {
        el.classList.remove("done");
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
greeting.addEventListener("DOMAttributeNameChanged", changeBackground);
greeting.addEventListener("DOMAttrModified", changeBackground);


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

changeQuote.addEventListener("click", getQuotes);

/* Show settings */
function showDrop() {
  dropdown.classList.toggle("show");
  opacity.classList.toggle("add");
}

settings.addEventListener("click", showDrop);
opacity.addEventListener("click", showDrop);

/* Set background image from GitHub*/
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

/* Change Background */
function changeBackground() {
  if (imageSourceDropdown.value === unsplashImages.value) {
    setImageFromUnsplash();
    slideNext.removeEventListener("click", getSlideNext);
    slidePrev.removeEventListener("click", getSlidePrev);
    slideNext.removeEventListener("click", setImageFromFlickr);
    slidePrev.removeEventListener("click", setImageFromFlickr);
    slideNext.addEventListener("click", setImageFromUnsplash);
    slidePrev.addEventListener("click", setImageFromUnsplash);
  } else if (imageSourceDropdown.value === flickrImages.value) {
    setImageFromFlickr();
    slideNext.removeEventListener("click", getSlideNext);
    slidePrev.removeEventListener("click", getSlidePrev);
    slideNext.removeEventListener("click", setImageFromUnsplash);
    slidePrev.removeEventListener("click", setImageFromUnsplash);
    slideNext.addEventListener("click", setImageFromFlickr);
    slidePrev.addEventListener("click", setImageFromFlickr);
  } else {
    setBg();
    slideNext.removeEventListener("click", setImageFromUnsplash);
    slidePrev.removeEventListener("click", setImageFromUnsplash);
    slideNext.removeEventListener("click", setImageFromFlickr);
    slidePrev.removeEventListener("click", setImageFromFlickr);
    slideNext.addEventListener("click", getSlideNext);
    slidePrev.addEventListener("click", getSlidePrev);
  }
  settingsObject.imagesource = imageSourceDropdown.value;
}

imageSourceDropdown.addEventListener("change", changeBackground);
greeting.addEventListener("change", changeBackground);

/* Change language */
languageDropdown.addEventListener("change", function showOption() {
  settingsObject.language = languageDropdown.value;
  city.value = localization.cityPlaceholder[languageDropdown.value];
  userName.placeholder = localization.namePlaceholder[languageDropdown.value];
  changeInputSize();
  translateToggles();
  setSettingsLabels();
  getWeather();
  getQuotes();
  showTime();
  displayTodo();
});

/* Audio Player */
const audio = new Audio();
audio.volume = 0.5;
let isPlay = false;
let playNum = 0;
let curtime = 0;
let currentTrackValue = 0;

/* Change volume */
let volumeMousedown = false; 

volumeBar.addEventListener("mousedown", function (e) {
  volumeMousedown = true;
})

volumeBar.addEventListener("mousemove", function (e) {
  if (volumeMousedown) {
    changeVolume(e);
  }
})

volumeBar.addEventListener("mouseup", function (e) {
  if (volumeMousedown) {
    changeVolume(e);
    volumeMousedown = false;
  }
})

player.addEventListener("mouseup", function (e) {
      volumeMousedown = false;
})

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

volumeBar.addEventListener("click", changeVolume);
 
let widthVolume;
function muteAudio() {
  mute.classList.toggle("unmute");
  audio.muted = !audio.muted;
  if (!audio.muted) {
    volumeLevel.style.width = widthVolume;
  } else {
    widthVolume = volumeLevel.style.width;
    volumeLevel.style.width = `${0}px`;
  }
}

mute.addEventListener("click", muteAudio);

/* Change active elements*/
function changeActiveElements() {
    trackTexts.forEach((item) => item.classList.remove("item-active"));
    trackTexts[playNum].classList.add("item-active");
    playedIcons.forEach((item) => item.classList.remove("individual-play-active"));
    playedIcons[playNum].classList.add("individual-play-active");
    currentTrack.textContent = playList[playNum].title;
}

/* Set attributes for played track and play it*/
function playTrack() {
    audio.play();
    isPlay = true;
    play.classList.add("pause");
}

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = curtime;
    audio.preload = "auto";
    let audioDuration;
    playTrack();
    changeActiveElements()

    audio.addEventListener("loadedmetadata", function () {
      audioDuration = audio.duration;
      TrackDuration.textContent = parseTime(audio.duration);

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
        progressBarv2.style.width = `${(180 * curtime) / audio.duration}px`;
        currentPosition.textContent = `${parseTime(curtime)}/`;
      });
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

      function audioChangeTime(e) {
        let currentPositionOnBar = e.clientX - progressBarv2.offsetLeft;
        let currentPositionOnBarInPercent = (currentPositionOnBar * 100) / trackwidth.offsetWidth;
        audio.currentTime = (currentPositionOnBarInPercent * audio.duration) / 100;
      }

      trackwidth.addEventListener("click", audioChangeTime);
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
  currentTrackValue++;
  if (playNum > playList.length - 1) {
    playNum = 0;
  }
  if (currentTrackValue > playList.length - 1) {
    currentTrackValue = 0;
  }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playTrack();
  changeActiveElements();
}

function playPrev() {
  playNum--;
  currentTrackValue--;
  if (playNum < 0) {
    playNum = playList.length - 1;
  }
    if (currentTrackValue < 0) {
      currentTrackValue = playList.length - 1;
    }
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  playTrack();
  changeActiveElements();
}

play.addEventListener("click", playAudio);
playNextTrack.addEventListener("click", playNext);
playPrevTrack.addEventListener("click", playPrev);


playedIcons.forEach((el, key) =>
  el.addEventListener("click", function someFunction() {
    if (currentTrackValue === key) {
      currentTrackValue = key;
      playNum = key;
      changeActiveElements();
      playAudio();
    } else {
      currentTrackValue = key;
      playNum = key;
      isPlay = false;
      curtime = 0;
      changeActiveElements();
      playAudio();
    }
  })
);

