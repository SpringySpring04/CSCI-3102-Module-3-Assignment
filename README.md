# CSCI 3102 Module 3 Assignment
## 3 Variations of QuickSort algorithm

By default, the project is set for an array of 300 elements, a sleep delay of 1 millisecond, with the RNG seeded with seed=50 for consistent measurements in the algorithm's efficiency.

# Directions to view the visualization
Click [here](https://springyspring04.github.io/CSCI-3102-Module-3-Assignment/) to open the visualization in the GitHub Pages link.

To shuffle the array, click the "Shuffle" button.
Change the quicksort variation with the "first", "random", and "median" dropdown. Click "Start Sorting" to sort the array. PLEASE DO NOT SPAM THESE BUTTONS OR PRESS ONE WHILE A SHUFFLING OR SORTING PROCESS IS RUNNING.

The sorting algorithm's duration and benchmark information will be printed to the console and added to the informational statistics text on the side of the canvas after completing each sorting algorithm.

The following functions are available to the user in the Console tab after opening the Developer Tools ( Ctrl+Shift+i )
```typescript
generateArray(length?: number | undefined); // For a completely random array. Optional length parameter to define the length of the new array.
generateArraySeeded(seed: number, length?: number | undefined); // Generate a new random array with the given seed. Calling the function with the same seed will always result in the same array. Length parameter is the same as "generateArray()"
averageCase(flip?: boolean = false); // Generates a triangular array that ascends, then descends in the middle. If flip is true, generates an array that descends then ascends in the middle.
bestCase(); // Generates an array that is already sorted.
worstCase(); // Generates an array that is inversely sorted.
setSleepDelay(milliseconds: number); // Sets the amount of milliseconds that the visualizer will "sleep" for so that there is a sense of progression to the algorithm instead of it just instantly being sorted.
slightlyShuffle(offset?: number = 5); // Randomly moves around elements in the array to roughen up the edges. 'offset' must be a positive integer > 0.
```

# Results of Testing
Number of elements: 300, seed: 50, sleep delay: 1 ms. No shuffling.
The "Pivot Random" row is by definition subject to bias. You may get different results on your computer due to hardware and software differences.
| Algorithm    | Average Case | Best Case | Worst Case | generateRandomArray(50) |
|--------------|--------------|-----------|------------|-------------------------|
| Pivot First  | Too long     | Too long  | Too long   | 63.208 s                |
| Pivot Median | 109.643 s    | Too long  | Too long   | 39.61 s                 |
| Pivot Random | 40.551 s     | 42.186    | 45.571     | 41.896 s                |


### Variation 1: Using the first element as the pivot
* Worst Case Recurrence:
    * $T(n)=T(n-1)+O(n)$, which is time complexity $O(n^2)$
* Best Case Recurrence:
    * $T(n)=2T(\frac{n}{2})+O(n)$, which is time complexity $O(n \log(n))$

### Variation 2: Using a random element as the pivot
* Worst Case Recurrence:
    * $T(n)=T(n-1)+O(n)$, which is time complexity $O(n^2)$, but the probability of this is very low.
* Average Case Recurrence:
    * $T(n)=T({\alpha}n)+T((1-\alpha)n)+O(n)$, which is time complexity $O(n \log(n))$
    * $\alpha$ is the random number between 0 and 1 that determines the size of the partitions, which are usually roughly equal in size.
    * Because of the random nature of this algorithm, there's no real "best case"; it's just an average case.

### Variation 3: Finding the pivot using Median of Three
* Worst Case Recurrence:
    * $T(n)=T(n-1)+O(n)$, which is time complexity $O(n^2)$.
* Best Case Recurrence:
    * $T(n)=2T(\frac{n}{2})+O(n)$, which is time complexity of $O(n \log(n))$.


Summary:
| Algorithm     | Best Case           | Average Case             | Worst Case          |
|---------------|---------------------|--------------------------|---------------------|
| Pivot First   | $O(n\log(n))$       | $O(n\log(n))$            | $O(n^2)$            |
| Pivot Random  | $O(n\log(n))$       | $O(n\log(n))$ (expected) | $O(n^2)$            |
| Pivot Median  | $O(n\log(n))$       | $O(n\log(n))$            | $O(n^2)$            |
