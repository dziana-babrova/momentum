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
}
showTime();

