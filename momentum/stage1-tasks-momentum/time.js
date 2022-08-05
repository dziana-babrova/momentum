const time = document.querySelector(".time");
const dateElement = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");


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
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
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
     return (Math.floor(Math.random() * (20 - 1 + 1)) + 1);
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
    randomNum = 1
  }
  setBg();
};

function getSlidePrev() {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);