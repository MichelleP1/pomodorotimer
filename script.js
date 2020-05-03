let main = document.querySelector('main');
let counter = document.querySelector('#clock');
let start = document.querySelector('#start');
let reset = document.querySelector('#reset');
let pause = document.querySelector('#pause');
let stop = document.querySelector('#stop');
let mode = document.querySelector('#mode');
let session_time = document.querySelector('#session_time');
let break_time = document.querySelector('#break_time');

let display = counter;
let countDown;

let initialTime = "25:00";
let breakTime = 60 * 5;
let sessionTime = 60 * 25;
let setTime = sessionTime;

let session = true;
let timerStarted = false;

counter.innerHTML = initialTime;

start.addEventListener('click', e => {
    if (timerStarted == false) {
        startTimer(setTime, display);
        checkMode();
    }
});

pause.addEventListener('click', e => {
    timerStarted = false;
    clearInterval(countDown);
});

stop.addEventListener('click', e => {
    clearInterval(countDown);
    session = true;
    setTime = 60 * session_time.value;
    counter.innerHTML = session_time.value + ":00";
    timerStarted = false;
});


reset.addEventListener('click', e => {
    session = true;
    checkMode();
    timerStarted = false;
    clearInterval(countDown);
    setTime = 60 * 25;
    counter.innerHTML = initialTime;
    session_time.value = 25;
    break_time.value = 5;
});

session_time.addEventListener('input', function(e) {
    if (timerStarted == false) {
        counter.innerHTML = session_time.value + ":00";
        setTime = 60 * session_time.value;
    }
});

break_time.addEventListener('input', function(e) {
    if (timerStarted == false) {
        breakTime = 60 * break_time.value;
    }
});

function checkMode() {
    if (session == true) {
        mode.innerText = 'SESSION';
        setTime = sessionTime;
    } else {
        mode.innerText = 'BREAK';
        setTime = breakTime;
    }

    clearInterval(countDown);
    startTimer(setTime, display);
}

function startTimer(duration, display) {
    timerStarted = true;
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        diff = duration - (((Date.now() - start) / 1000) | 0);

        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            if (session == false) {
                session = true;
            } else {
                session = false;
            }
            checkMode();

            start = Date.now() + 1000;
        }

        sessionTime = diff;
        setTime = diff;
    };
    timer();
    countDown = setInterval(timer, 1000);
}





