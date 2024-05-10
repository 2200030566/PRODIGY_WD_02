// Get elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

let startTime;
let running = false;
let interval;
let lapCount = 1;

// Format time
function formatTime(ms) {
    let hours = Math.floor(ms / 3600000);
    let minutes = Math.floor((ms % 3600000) / 60000);
    let seconds = Math.floor(((ms % 3600000) % 60000) / 1000);

    return (
        String(hours).padStart(2, '0') +
        ':' +
        String(minutes).padStart(2, '0') +
        ':' +
        String(seconds).padStart(2, '0')
    );
}

// Update display
function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

// Start stopwatch
function startStopwatch() {
    if (!running) {
        startTime = Date.now();
        interval = setInterval(updateDisplay, 1000);
        running = true;
    }
}

// Pause stopwatch
function pauseStopwatch() {
    clearInterval(interval);
    running = false;
}

// Reset stopwatch
function resetStopwatch() {
    clearInterval(interval);
    running = false;
    display.textContent = '00:00:00';
    lapList.innerHTML = '';
    lapCount = 1;
}

// Record lap
function recordLap() {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.prepend(lapItem);
    lapCount++;
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
