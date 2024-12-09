import { generateRandomArray, visualizeArray,clearBars } from './utils.js';
import { bubbleSort, insertionSort, quickSort, mergeSort, selectionSort, heapSort, shellSort,bucketSort} from './sortingAlgorithms.js';
import {setContinueSort}from './state.js';

let array=[];

// Define the sorting algorithms
const sortingAlgorithms = [
    { value: "bubbleSort", text: "Bubble Sort" },
    { value: "insertionSort", text: "Insertion Sort" },
    { value: "quickSort", text: "Quick Sort" },
    { value: "mergeSort", text: "Merge Sort" },
    { value: "selectionSort", text: "Selection Sort" },
    { value: "heapSort", text: "Heap Sort" },
    { value: "shellSort", text: "Shell Sort" },
    {value:"bucketSort",text:"Bucket Sort"}
];

// Populate the select element with options
const selectElement = document.getElementById("algorithm-select");
sortingAlgorithms.forEach(algorithm => {
    const option = document.createElement("option");
    option.value = algorithm.value;
    option.text = algorithm.text;
    selectElement.appendChild(option);
});

document.getElementById("generate-button").addEventListener("click", function() {
    setContinueSort(false);
    const arraySize = parseInt(document.getElementById("array-size").value);
    const minSize = 1;
    const maxSize = 200;

    if (isNaN(arraySize) || arraySize < minSize || arraySize > maxSize) {
        alert(`Please enter a valid array size between ${minSize} and ${maxSize}.`);
        return;
    }

    array = generateRandomArray(arraySize, 5, 400);
    visualizeArray(array);
});

document.getElementById("sort-button").addEventListener("click", () => {
    
    if (array.length === 0) {
        alert(`Please enter a valid array size`);
        return;
    }
    setContinueSort(true);
    const algorithm = document.getElementById("algorithm-select").value;
    switch (algorithm) {
        case "bubbleSort":
            bubbleSort(array);
            break;
        case "insertionSort":
            insertionSort(array);
            break;
        case "quickSort":
            quickSort(array);
            break;
        case "mergeSort":
            mergeSort(array);
            break;
        case "selectionSort":
            selectionSort(array);
            break;
        case "heapSort":
            heapSort(array);
            break;
        case "shellSort":
            shellSort(array);
            break;
        case "bucketSort":
            bucketSort(array);
            break;
        default:
            alert("Please select a sorting algorithm.");
    }
    // resets the internal array
    array = [];
    
});

document.getElementById("stop-button").addEventListener("click", () => {
    setContinueSort(false);
    clearBars();
});