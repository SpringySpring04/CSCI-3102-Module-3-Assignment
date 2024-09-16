/**
 * 
 * @param {number[]} array 
 * @param {number} low 
 * @param {number} high 
 * @param {"first" | "median" | "random"} strategy 
 * @returns 
 */
async function quicksort(array, low = 0, high = array.length - 1, strategy = "first") {
    if (low < high) {
        const pivotIndex = await partition(array, low, high, strategy);
        // colours[pivotIndex] = cRED;
        if (!running) return;
        await quicksort(array, low, pivotIndex - 1, strategy);
        await quicksort(array, pivotIndex + 1, high, strategy);
    }
}



async function partition_high(array, low, high) {
    const pivot = array[high];
    colours[high] = cRED;
    var alreadySlept = false;
    let i = low - 1;
    var j = low;
    for (j = low; j <= high - 1; j++) {
        colours[i] = cGREEN;
        colours[j] = cBLUE;
        if (array[j] < pivot) {
            colours[i] = cWHITE;    
            i++;
            colours[i] = cGREEN;
            if (useSleepDelay) { 
                await swap(array, j, i); alreadySlept = true;
            } else {
                swapImmediate(array, j, i);
            }
        }
        
        pStats_updateText(high, i, j);
        if (!alreadySlept) { 
            playNoteAt(array, i, NOTE_DURATION());
            if (useSleepDelay) await sleep(sleepDelay);
        }
        else alreadySlept = false;
        colours[i] = cWHITE;
        colours[j] = cWHITE;
    }
    colours[high] = cWHITE;
    colours[i] = cWHITE;
    colours[j] = cWHITE;
    if (useSleepDelay) await swap(array, i + 1, high);
    else swapImmediate(array, i + 1, high);
    return i + 1;
}

async function partition_first(array, low, high) {
    const pivot = array[low];
    colours[low] = cRED;
    var alreadySlept = false;
    let j = high;
    var i;
    for (i = high; i > low; i--) {
        colours[i] = cGREEN;
        colours[j] = cBLUE;
        if (array[i] > pivot) {
            colours[j] = cWHITE;
            if (useSleepDelay) { 
                await swap(array, i, j--);
                alreadySlept = true;
            } else {
                swapImmediate(array, i, j--);
            }
            // colours[j + 1] = cWHITE;
        }
        pStats_updateText(low, i, j);
        if (!alreadySlept) { 
            playNoteAt(array, i, NOTE_DURATION());
            if (useSleepDelay) await sleep(sleepDelay);
        }
        else alreadySlept = false;
        colours[i] = cWHITE;
        colours[j] = cWHITE;
    }
    colours[low] = cWHITE;
    colours[i] = cWHITE;
    colours[j] = cWHITE;
    if (useSleepDelay) await swap(array, low, j);
    else swapImmediate(array, low, j);
    return j;
}

function partition(array, low, high, strategy) {
    switch(strategy) {
        case "first":
            return partition_first(array, low, high);
        case "random":
            const randIndex = floor(random(low, high));
            var pivot = randIndex;
            swapImmediate(array, high, randIndex);
            return partition_high(array, low, high);
        case "median":
            const mid = floor((low + high) / 2);
            var pivot = medianOfThree(array[low], array[mid], array[high]);
            if (pivot === array[mid]) swapImmediate(array, mid, high);
            else if (pivot === array[low]) swapImmediate(array, low, mid);
            return partition_high(array, low, high);
        default:
            return partition_high(array, low, high);
    }
}

