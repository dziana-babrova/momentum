const time = document.querySelector(".time");
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString("be-BY", { hour12: false });
    time.textContent = currentTime;
  setTimeout(showTime, 1000);

  const dateElement = document.querySelector(".date");
  function showDate() {
    const date = new Date();
    const currentDate = date.toLocaleDateString("ru-RU", {weekday: "long", month: "long", day: "numeric"});
    dateElement.textContent = currentDate;
  }
  showDate();
  const greeting = document.querySelector(".greeting");

  function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 0 && hours < 6) {
      return "Спокойной ночи,";
    } else if (hours >= 6 && hours < 12) {
      return "Доброе утро,";
    } else if (hours >= 12 && hours < 18) {
      return "Добрый день,";
    } else if (hours >= 18 && hours < 24) {
      return "Добрый вечер,";
    }
  }

  const timeOfDay = getTimeOfDay();
  greeting.textContent = timeOfDay;
}
showTime();

const userName = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", userName.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

