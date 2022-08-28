let timerDurationInMinutes = 1;
let displayedTimerTextStart = "01:00";
let displayedTimerElement = document.getElementById("app-timer");
let startButton = document.getElementById('start-timer');

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

const startTimer = () => {
  startButton.style.display = 'none';
  console.log('Timer started');
  let currentDate = new Date();
  let dateAdded25Mins = addMinutes(currentDate, timerDurationInMinutes);
  console.log(currentDate);
  console.log(dateAdded25Mins);

  let interval = setInterval(function() {
      let currentTimestamp = new Date().getTime();
      let currentDistance = dateAdded25Mins.getTime() - currentTimestamp;
    
      let minutes = Math.floor((currentDistance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((currentDistance % (1000 * 60)) / 1000);

      let displayedMinutes = (minutes < 10) ? '0' + minutes : minutes;
      let displayedSeconds = (seconds < 10) ? '0' + seconds : seconds;
    
      displayedTimerElement.innerHTML = displayedMinutes + ":" + displayedSeconds;
    
      if (currentDistance < 0) {
        clearInterval(interval);
        displayedTimerElement.innerHTML = displayedTimerTextStart;
        startButton.style.display = 'flex';
      }
    }, 1000);
}

if (startButton) {
    startButton.addEventListener('click', startTimer);
}