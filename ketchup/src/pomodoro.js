// app code for pomodoro timer

// notification constants.
const title = 'Pomodoro Finished';
const text = moment().toLocaleString();
const img = './images/tomato.png';
const secs10 = 10 * 1000;

// timer variables
let timerSettingValue = 25; // how long for each pomodoro.
let timerSettingUnit = "minutes"; // how long for each pomodoro - the unit to apply to timerSettingValue
let notificationCloseSetting = secs10;
let timerStart; // the start time of the timer.
let timerRunning = false; // true if the timer is running.
let timerEnd; // a reference to the absolute end time (as per new Date().getTime())
let timerRef; // reference to the timer itself (so we can cancel it)
let tickerRef; // a reference to the ticker interval

function sec2time(timeInSeconds) {
  var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);
    // milliseconds = time.slice(-3);

  return `${pad(hours, 2)}:${pad(minutes, 2) }:${pad(seconds, 2)}`;
}

// upon timer tick, re-render time remaining.
const tick = ()=>{
  const timeRemaining = timerEnd - moment().valueOf();
  // console.log(`${sec2time(timeRemaining / 1000)}`);
  if (timerRunning) {
    $('.mp-info').text(`${sec2time(timeRemaining / 1000)} remaining`)
  }
};

// start the ticker
const startTicker = () => {
  tickerRef = setInterval(tick, 1000);
};

// stop the ticker
const stopTicker = () => {
  clearInterval(tickerRef);
};

// clear the timer
const stopTimer = () => {
  clearTimeout(timerRef);
  timerRunning = false;
};

// show the completed modal
const showCompletedModal = () => {
  $(".mp-modal-finished #mp-modal-body-time").text(moment(timerEnd).format("HH:mm:ss"));
  $(".mp-modal-finished").modal("show");
};

// render appropriate div to request permissions or start timer,
// depending on current permission state.
const renderPermissionState = ()=>{
  const mptimerdiv = $(".mp-timer");
  const mpgrantdiv = $(".mp-grant-permissions");
  switch (Notification.permission) {
    case "default":
    case "denied":
      mptimerdiv.hide();
      mpgrantdiv.show();
      break;
    case "granted":
      mptimerdiv.show();
      mpgrantdiv.hide();
      break;
  }
};

const renderButtonReadyState = () => {
  $(".mp-info").text("Tap the button above to start.");
  $(".mp-timer-btn").addClass("btn-success").removeClass("btn-warning");
  $(".mp-start-timer-info").removeClass("invisible");
  $(".mp-cancel-timer-info").addClass("invisible");

};

const renderButtonRunningState = () => {
  $(".mp-timer-btn").addClass("btn-warning").removeClass("btn-success");
  $(".mp-start-timer-info").addClass("invisible");
  $(".mp-cancel-timer-info").removeClass("invisible");
};


// start the timer
const startTimer = () => {
  timerStart = moment().valueOf();
  timerEnd = moment().add(timerSettingValue, timerSettingUnit).valueOf();
  timerRunning = true;
  timerRef = setTimeout(() => {
    const notification = new Notification(title, {body: text, icon: img, badge: img});
    setTimeout(notification.close.bind(notification), notificationCloseSetting);
    timerRunning = false;
    renderButtonReadyState();
    showCompletedModal();
  }, (timerEnd - timerStart));
};

$(document).ready(() => {
  const mpTimerBtnRef =  $(".mp-timer-btn");

  renderPermissionState();

  // user clicks 'start', start timer, show notification upon timer complete.
  mpTimerBtnRef.on("click", () => {
    if (timerRunning) {
      // cancel timer
      stopTicker();
      stopTimer();
      renderButtonReadyState();
    } else {
      // start timer
      startTimer();
      startTicker();
      renderButtonRunningState();
    }
  });

  // user clicks 'grant permissions', request permissions and re-render.
  $(".mp-grant-permissions-btn").on("click", ()=>{
    Notification.requestPermission().then(function(result) {
      console.log(result);
      renderPermissionState();
    });
  });

  // temp for debugging
  // $(".mp-info").on("click", () => {
    // const notification = new Notification(title, {body: text, icon: img, badge: img, image: img});

    // showCompletedModal();
  // });
});
