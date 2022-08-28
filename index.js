let timerDurationInMinutes = 25;
let displayedTimerElement = document.getElementById("app-timer");
let buttonGroupDiv = document.getElementById('app-controls');
let startButton = document.getElementById('start-timer');

function createTimerTextStart(timerDuration) {
  let displayedMinute = (timerDuration < 10) ? '0' + timerDuration : timerDuration;
  return displayedMinute + ':00';
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function createNewStartButton(buttonSpecs) {
  let newStartButton = document.createElement('button');
  newStartButton.setAttribute('id', buttonSpecs.id);
  newStartButton.setAttribute('class', buttonSpecs.class);
  newStartButton.innerHTML = buttonSpecs.text;
  return newStartButton;
}

function getStartBtnSpecs(buttonElement) {
  return {
    'id': buttonElement.getAttribute('id'),
    'class': buttonElement.getAttribute('class'),
    'text': buttonElement.innerHTML
  };
}

function addEventListenerToStartButton() {
  startButton.addEventListener('click', startTimer);
}

const startTimer = () => {
  let startButtonSpecs = getStartBtnSpecs(startButton);
  startButton.remove();

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
        displayedTimerElement.innerHTML = createTimerTextStart(timerDurationInMinutes);
        
        startButton = createNewStartButton(startButtonSpecs);
        buttonGroupDiv.appendChild(startButton);
        addEventListenerToStartButton();
      }
    }, 1000);
}

const initialize = () => {
  if (startButton) {
    addEventListenerToStartButton();
  }
  displayedTimerElement.innerHTML = createTimerTextStart(timerDurationInMinutes);
}

initialize();