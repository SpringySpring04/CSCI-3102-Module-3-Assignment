// Not a very good rng algorithm, but always consistent when given the same seed.
var rng = {}
/**
 * Seed for the RNG.
 */
rng.seed = 1;
/**
 * Generates a random number using the `rng.seed` value and incrementing `rng.seed` so that the next call to this function is different.
 * @returns A random number between 0 and 1, but not including 1.
 */
rng.next = function next() {
    var x = Math.sin(rng.seed++) * 10000;
    const f = Math.floor(x);
    const result = x - f;
    return result;
}
/**
 * Generates a random number between [a, b) (from a up to, but not including, b). Optional seed and tempSeed parameter.
 * If seed is defined and tempSeed is true, then the seed will return to its old value after calculating the number. If tempSeed is false, it will
 * change the seed and keep it after calculating. Default is true.
 * @param {number} a 
 * @param {number} b 
 * @param {number | undefined} seed
 * @param {boolean} tempSeed
 */
rng.between = function between(a, b, seed = undefined, tempSeed = true) {
    var oldseed;
    if (typeof seed == 'number') { 
        oldseed = rng.seed;
        rng.seed = seed;
    }
    const result = (rng.next() * (b - a)) + a;
    if (typeof seed == 'number' && tempSeed == true)
        rng.seed = oldseed;
    return result;
}   