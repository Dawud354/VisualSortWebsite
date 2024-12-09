import { continueSort } from "./state.js";

export async function bubbleSort(array) {
    console.log(continueSort);
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if(!continueSort) return;
            bars[j].classList.add("comparing"); // Highlight the bar being compared
            bars[j + 1].classList.add("comparing"); // Highlight the bar being compared
            if (array[j] > array[j + 1]) {
                // Swap the elements in the array
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                // Swap the heights of the bars
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;

                // Highlight the bars being swapped
                bars[j].classList.add("swapping");
                bars[j + 1].classList.add("swapping");

                // Add a delay to visualize the sorting process
                await new Promise(resolve => setTimeout(resolve, 100));

                // Remove the swapping highlight
                bars[j].classList.remove("swapping");
                bars[j + 1].classList.remove("swapping");
            }
            // Remove the comparing highlight
            bars[j].classList.remove("comparing");
            bars[j + 1].classList.remove("comparing");
        }
        // Mark the last sorted element
        bars[array.length - 1 - i].classList.add("sorted");
    }
    // Mark the first element as sorted
    bars[0].classList.add("sorted");
    console.log("Sorted array:", array); // Print the sorted array to the console
    return array;
}

export async function quickSort(array, left = 0, right = array.length - 1) {
    const bars = document.getElementsByClassName("bar");
    if (left < right) {
        let pivotIndex = await partition(array, left, right);
        await quickSort(array, left, pivotIndex - 1);
        await quickSort(array, pivotIndex + 1, right);
    }
    // Mark all elements as sorted
    if (left === 0 && right === array.length - 1) {
        for (let i = 0; i < array.length; i++) {
            bars[i].classList.add("sorted");
        }
        console.log("Sorted array:", array); // Print the sorted array to the console
    }
    return array;
}

async function partition(array, left, right) {
    const bars = document.getElementsByClassName("bar");
    let pivot = array[right]; // Choose the last element as the pivot
    bars[right].classList.add("swapping"); // Highlight the pivot bar
    let i = left - 1; // Index of the smaller element

    for (let j = left; j < right; j++) {
        if(!continueSort) return;
        bars[j].classList.add("comparing"); // Highlight the bar being compared
        if (array[j] < pivot) {
            i++;
            // Swap elements at i and j
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        bars[j].classList.remove("comparing"); // Reset the color after comparison
    }
    // Swap the pivot element with the element at i+1
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1]}px`;
    bars[right].style.height = `${array[right]}px`;
    bars[right].classList.remove("swapping"); // Reset the color after partition
    
    await new Promise(resolve => setTimeout(resolve, 100));
    return i + 1; // Return the pivot index
}

export async function mergeSort(array, left = 0, right = array.length - 1) {
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSort(array, left, middle);
        await mergeSort(array, middle + 1, right);
        await merge(array, left, middle, right);
    }
    if(!continueSort) return;
    // Mark all elements as sorted
    if (left === 0 && right === array.length - 1) {
        const bars = document.getElementsByClassName("bar");
        for (let i = 0; i < array.length; i++) {
            bars[i].classList.add("sorted");
        }
        console.log("Sorted array:", array); // Print the sorted array to the console
    }
    return array;
}

async function merge(array, left, middle, right) {
    const bars = document.getElementsByClassName("bar");
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
        if(!continueSort) return;
        leftArray[i] = array[left + i];
    }
    for (let j = 0; j < n2; j++) {
        if(!continueSort) return;
        rightArray[j] = array[middle + 1 + j];
    }

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if(!continueSort) return;
        bars[k].classList.add("comparing"); // Highlight the bar being compared
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = `${leftArray[i]}px`;
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = `${rightArray[j]}px`;
            j++;
        }
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[k - 1].classList.remove("comparing"); // Reset the color after comparison
    }

    while (i < n1) {
        if(!continueSort) return;
        bars[k].classList.add("comparing"); // Highlight the bar being compared
        array[k] = leftArray[i];
        bars[k].style.height = `${leftArray[i]}px`;
        i++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[k - 1].classList.remove("comparing"); // Reset the color after comparison
    }

    while (j < n2) {
        if(!continueSort) return;
        bars[k].classList.add("comparing"); // Highlight the bar being compared
        array[k] = rightArray[j];
        bars[k].style.height = `${rightArray[j]}px`;
        j++;
        k++;
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[k - 1].classList.remove("comparing"); // Reset the color after comparison
    }
}

export async function selectionSort(array) {
    const bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("comparing"); // Highlight the initial minimum bar
        for (let j = i + 1; j < array.length; j++) {
            if(!continueSort) return
            bars[j].classList.add("comparing"); // Highlight the bar being compared
            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove("comparing"); // Reset the previous minimum bar
                minIndex = j;
                bars[minIndex].classList.add("comparing"); // Highlight the new minimum bar
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            bars[j].classList.remove("comparing"); // Reset the color after comparison
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
        }
        bars[minIndex].classList.remove("comparing"); // Reset the color after selection
        bars[i].classList.add("sorted"); // Mark the sorted element
    }
    bars[array.length - 1].classList.add("sorted"); // Mark the last element as sorted
    console.log("Sorted array:", array); // Print the sorted array to the console
    return array;
}

export async function heapSort(array) {
    const bars = document.getElementsByClassName("bar");

    async function heapify(array, n, i) {
        if(!continueSort) return;

        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n) {
            bars[left].classList.add("comparing"); // Highlight the left child
        }
        if (right < n) {
            bars[right].classList.add("comparing"); // Highlight the right child
        }

        if (left < n && array[left] > array[largest]) {
            largest = left;
        }

        if (right < n && array[right] > array[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [array[i], array[largest]] = [array[largest], array[i]];
            bars[i].style.height = `${array[i]}px`;
            bars[largest].style.height = `${array[largest]}px`;
            await new Promise(resolve => setTimeout(resolve, 100));
            await heapify(array, n, largest);
        }

        if (left < n) {
            bars[left].classList.remove("comparing"); // Reset the left child color
        }
        if (right < n) {
            bars[right].classList.remove("comparing"); // Reset the right child color
        }
    }

    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if(!continueSort) return;
        await heapify(array, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if(!continueSort) return;
        [array[0], array[i]] = [array[i], array[0]];
        bars[0].style.height = `${array[0]}px`;
        bars[i].style.height = `${array[i]}px`;
        bars[i].classList.add("sorted"); // Mark the sorted element
        await new Promise(resolve => setTimeout(resolve, 100));
        await heapify(array, i, 0);
    }
    bars[0].classList.add("sorted"); // Mark the first element as sorted
    console.log("Sorted array:", array); // Print the sorted array to the console
    return array;
}

export async function shellSort(array) {
    const bars = document.getElementsByClassName("bar");
    let n = array.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            if(!continueSort) return;
            let temp = array[i];
            let j;
            bars[i].classList.add("comparing"); // Highlight the current element
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                if(!continueSort) return;
                bars[j - gap].classList.add("comparing"); // Highlight the bar being compared
                array[j] = array[j - gap];
                bars[j].style.height = `${array[j]}px`;
                await new Promise(resolve => setTimeout(resolve, 100));
                bars[j - gap].classList.remove("comparing"); // Reset the color after comparison
            }
            array[j] = temp;
            bars[j].style.height = `${array[j]}px`;
            bars[i].classList.remove("comparing"); // Reset the color after insertion
        }
        gap = Math.floor(gap / 2);
    }

    // Mark all elements as sorted
    for (let i = 0; i < array.length; i++) {
        bars[i].classList.add("sorted");
    }
    console.log("Sorted array:", array); // Print the sorted array to the console
    return array;
}

export async function bucketSort(arr, bucketSize = 5) {
    if (arr.length === 0) {
        return arr;
    }

    const bars = document.getElementsByClassName("bar");

    // Determine minimum and maximum values
    let i,
        minValue = arr[0],
        maxValue = arr[0];
    arr.forEach(function (currentVal) {
        if (currentVal < minValue) {
            minValue = currentVal;
        } else if (currentVal > maxValue) {
            maxValue = currentVal;
        }
    });

    // Initialize buckets
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let allBuckets = new Array(bucketCount);

    for (i = 0; i < allBuckets.length; i++) {
        allBuckets[i] = [];
    }

    // Distribute input array values into buckets
    for (let j = 0; j < arr.length; j++) {
        let bucketIndex = Math.floor((arr[j] - minValue) / bucketSize);
        allBuckets[bucketIndex].push(arr[j]);
        bars[j].classList.add("comparing"); // Highlight the bar being processed
        await new Promise(resolve => setTimeout(resolve, 100)); // Pause for visualization
        bars[j].classList.remove("comparing"); // Reset the color after processing
    }

    // Sort buckets and place back into input array
    arr.length = 0;
    let index = 0;

    for (let k = 0; k < allBuckets.length; k++) {
        await insertionSort(allBuckets[k], index); // You can use any sorting algorithm here
        for (let l = 0; l < allBuckets[k].length; l++) {
            arr.push(allBuckets[k][l]);
            bars[index].style.height = `${allBuckets[k][l]}px`;
            bars[index].classList.add("sorted"); // Highlight the sorted bar
            index++;
            await new Promise(resolve => setTimeout(resolve, 100)); // Pause for visualization
        }
    }
    console.log("Sorted array:", arr); // Print the sorted array to the console
    return arr;
}

export async function insertionSort(arr, startIndex = 0) {
    const bars = document.getElementsByClassName("bar");
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[startIndex + j + 1].style.height = `${arr[j + 1]}px`;
            bars[startIndex + j + 1].classList.add("comparing");
            await new Promise(resolve => setTimeout(resolve, 100)); // Pause for visualization
            bars[startIndex + j + 1].classList.remove("comparing");
            j = j - 1;
        }
        arr[j + 1] = key;
        bars[startIndex + j + 1].style.height = `${arr[j + 1]}px`;
        bars[startIndex + j + 1].classList.add("sorted");
        await new Promise(resolve => setTimeout(resolve, 100)); // Pause for visualization
        bars[startIndex + j + 1].classList.remove("sorted");
    }
}