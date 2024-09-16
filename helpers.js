const cRED = '#F00';
const cGREEN = '#0F0';
const cBLUE = '#00F';
const cWHITE = '#FFF';

const FREQ_MIN = 200;
const FREQ_MAX = 600;


const audioCtx = new(window.AudioContext)();

/**
 * Used in `async` functions to wait for a small amount of time. Use it by calling `await sleep(ms)`.
 * @param {number} ms 
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns the number that is in the middle; neither largest nor smallest.
 * @param {number} a 
 * @param {number} b 
 * @param {number} c 
 */
function medianOfThree(a, b, c) {
    if ((a > b) !== (a > c)) return a;
    if ((b > a) !== (b > c)) return b;
    else return c;
} 

/**
 * Determines if the array is fully sorted.
 * @param {number[]} array 
 * @returns 
 */
function isSorted(array) {
    for (let i = 0; i < array.length-1; i++) {
        if (array[i+1] < array[i]) return false;
    }
    return true;
}

function playNoteAt(array, i, duration) {
    // floor(map(array[i], min(array), max(array), FREQ_MIN, FREQ_MAX)) ???
    if (i < 0 || i >= array.length) return;
    let freq = floor((array[i] / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    if (!isFinite(freq)) debugger;
    playNote(freq, duration);
}

function playNote(frequency, duration) {
    const oscillator = new OscillatorNode(audioCtx);
    const gainNode = new GainNode(audioCtx);
    oscillator.type = "square";
    oscillator.frequency.value = constrain(frequency, FREQ_MIN, FREQ_MAX); // value in hertz
    gainNode.gain.value = 0.0005;
    oscillator.connect(gainNode);
    oscillator.connect(audioCtx.destination);
    oscillator.start();

    setTimeout(function() {
        oscillator.stop();
    }, duration);
}

async function swap(array, i, j) {
    // colours[i] = cRED;

    let freq = floor(((array[i] + array[j]) / (2 * arrayLength)) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
    if (isFinite(freq))
        playNote(freq, NOTE_DURATION());

    [array[i], array[j]] = [array[j], array[i]];
    await sleep(sleepDelay);
    // colours[i] = cWHITE;
}
function swapImmediate(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]];
}

// determines if any element appears in the array more than once
function hasDuplicate(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (i == j) continue;
            if (array[i] == array[j]) return true;
        }
    }
    return false;
}