var cnv;
// ========================================================================================
// * User-configured section
// ========================================================================================
var arrayLength = 300;
var sleepDelay  = 1;
var useSleepDelay = true;
const NOTE_DURATION = () => sleepDelay * 2;

// Call this function to generate a random array with a custom seed.
function generateArraySeeded(seed, length = undefined) {
    if (typeof length == 'number') arrayLength = floor(length);
    rng.seed = seed;
    var numbers = [];
    A = [];
    colours = [];
    // debugger;
    for (let i = 0; i < arrayLength; i++) {
        numbers.push(i);
    }
    for (let i = 0; i < arrayLength; i++) {
        var randIndex = floor(rng.between(0, numbers.length, rng.seed + (i * rng.seed)));
        const num = numbers[randIndex];
        numbers = numbers.filter(n => n != num);
        A.push(num);
        colours.push(cWHITE);
    }
}
// ========================================================================================
// User functions
function averageCase(flip = false) {
    A = [];
    colours = [];
    var numbers = [];
    var taken = [];
    for (let i = 0; i < arrayLength; i++) {
        numbers.push(i);
        colours.push(cWHITE);
    }
    for (let i = 0; i < numbers.length; i += 2) {
        const num = numbers[i];
        A.push(num);
        taken.push(num);
    }
    numbers = numbers.filter(n => !taken.some(v => v == n));
    for (let j = numbers.length - 1; j > 0; j--) {
        A.push(numbers[j]);
    }
}

function bestCase() {
    A = [];
    colours = [];
    for (let i = 0; i < arrayLength; i++) {
        A.push(i);
        colours.push(cWHITE);
    }
}

function worstCase() {
    A = [];
    colours = [];
    for (let i = arrayLength - 1; i >= 0; i--) {
        A.push(i);
        colours.push(cWHITE);
    }
}

function setSleepDelay(ms) {
    if (ms < 0) {
        useSleepDelay = false;
    } else {
        useSleepDelay = true;
        sleepDelay = ms;
    }
}

// ========================================================================================
const htmlElts = {
    /** @type {Element} */
    btnShuffle: undefined,
    /** @type {Element} */
    inpAlgorithm: undefined,
    /** @type {Element} */
    btnSort: undefined,
    /** @type {Element} */
    pStats: undefined
};
const pStats_values = {
    pivotIndex: undefined, i: undefined, j: undefined, timeElapsed: 0
}

// Program control variables
var A = []
var colours = [];
var running = false;

function windowResized() {
    cnv = createCanvas(windowWidth, windowHeight * 0.8);
    cnv.position(0, (windowHeight * 0.2));
}

function setup() {
    // Create p5 Canvas
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);

    if (isMobileDevice) {
        cnv = createCanvas(windowWidth, windowHeight * 0.8);
        cnv.position(0, (windowHeight * 0.2));
    } else { 
        cnv = createCanvas(960, 960 * (9/16));
        cnv.position((windowWidth / 2) - (width / 2), (windowHeight / 2) - (height / 2));
    }

    for (let i = 0; i < 20; i++) {
        console.log("PLEASE TURN DOWN YOUR VOLUME! THE VISUALIZER IS VERY LOUD!!!!");
    }
    userStartAudio();
    // Initialize array
    // For simplicity, we'll use the same array every time by using a seeded RNG
    generateArraySeeded(50);
    // Setup HTML buttons
    htmlElts.btnShuffle = createButton("Shuffle").mousePressed(shuffleArray);
    htmlElts.inpAlgorithm = createSelect(false);
        htmlElts.inpAlgorithm.option('first');
        htmlElts.inpAlgorithm.option('median');
        htmlElts.inpAlgorithm.option('random');
        htmlElts.inpAlgorithm.selected('first');
    htmlElts.btnSort = createButton("Start Sorting").mousePressed(sortArray);
    htmlElts.pStats = createP("");
    pStats_updateText();
}

function draw() {
    background(0);
    for (let i = 0; i < A.length; i++) {
        fill(colours[i]);
        draw_line(A, i);
        draw_colour_helper(colours, i);
    }
}

// Helper drawing functions
function draw_line(array, i) {
    let x = lerp(0, width, i / array.length) + ((width / array.length) / 2);
    let y = lerp(height, 0, array[i] / arrayLength);
    rect(x, y, 0.9 * width / array.length, height - y, 10);
}
function draw_colour_helper(array, i) {
    let x = lerp(0, width, i / array.length) + ((width / array.length) / 2);
    let y = 2;
    rect(x, y, 0.5 * width / array.length, 6, 10);
}
function generateArray(length = undefined) {
    if (typeof length == 'number') arrayLength = floor(length);
    var numbers = [];
    A = [];
    colours = [];
    for (let i = 0; i < arrayLength; i++) {
        numbers.push(i);
    }
    for (let i = 0; i < arrayLength; i++) {
        var randIndex = floor(random(0, numbers.length));
        const num = numbers[randIndex];
        numbers = numbers.filter(n => n != num);
        A.push(num);
        colours.push(cWHITE);
    }
}
function pStats_updateText(pivotIndex = undefined, i = undefined, j = undefined) {
    if (pivotIndex) pStats_values.pivotIndex = pivotIndex;
    if (i) pStats_values.i = i;
    if (j) pStats_values.j = j;
    htmlElts.pStats.elt.innerHTML = 
    `NOTICE: Please turn your<br>volume down. This visualizer is very<br>loud.<br><br>` +
    `Stats:<br>` +
    `Pivot Index: ${pStats_values.pivotIndex}<br>` +
    `i: ${pStats_values.i}<br>` + 
    `j: ${pStats_values.j}<br>` +
    `Running: ${running}<br>` +
    `Duration of last algorithm: ${(pStats_values.timeElapsed) / 1000} s`
}
function setRunning(state = false) {
    if (state) {
        running = true;
    } else {
        running = false;
    }
    pStats_updateText();
}

// ------------------------

// Button functions

async function shuffleArray() {
    if (running) return;
    running = true;
    for (let i = 0; i < A.length; i++) {
        let randIndex = floor(random(0, A.length));
        if (i == randIndex) { 
            playNoteAt(A, i, NOTE_DURATION());
            if (useSleepDelay) await sleep(sleepDelay); 
            continue;
        }
        colours[randIndex] = cBLUE;
        colours[i] = cRED;
        if (useSleepDelay) await swap(A, i, randIndex);
        else swapImmediate(A, i, randIndex);
        colours[i] = cWHITE;
        colours[randIndex] = cWHITE;
    }
    running = false;
}

async function sortArray() {
    if (running) return;
    running = true;
    // console.log("Starting sort...");
    var timeStart = performance.now();
    await quicksort(A, 0, A.length - 1, htmlElts.inpAlgorithm.selected())
    var timeEnd = performance.now();
    var timeElapsed = timeEnd - timeStart;
    console.log(`Sort took ${timeElapsed} milliseconds`);
    pStats_values.timeElapsed = timeElapsed;
    pStats_updateText();
    await scanArray();
    // console.log("Sort finished");
    running = false;
    pStats_updateText();
}

async function scanArray() {
    for (let i = 0; i < A.length; i++) {
        let freq = floor((A[i] / 100) * (FREQ_MAX - FREQ_MIN) + FREQ_MIN);
        playNoteAt(A, i, NOTE_DURATION());
        colours[i] = cGREEN;
        if (useSleepDelay) await sleep(sleepDelay)
    }
    colours.fill(cWHITE);
}

// ----------------