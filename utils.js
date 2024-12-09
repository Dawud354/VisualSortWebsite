export function generateRandomArray(length, min, max) {
    let randomArray = [];
    for (let i = 0; i < length; i++) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomArray.push(randomNumber);
    }
    return randomArray;
}

export function visualizeArray(array) {
    const container = document.getElementById("container");
    container.innerHTML = ''; // Clear previous bars

    const containerWidth = container.clientWidth;
    const barMargin = 1; // Margin between bars
    const barWidth = (containerWidth / array.length) - (2 * barMargin);

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${array[i]}px`; // Use px for height
        bar.style.width = `${barWidth}px`; // Set dynamic width
        bar.style.margin = `0 ${barMargin}px`; // Set margin
        bar.classList.add("bar"); // Add the class "bar" to the bar
        container.appendChild(bar); // Append the bar to the container
    }
    
}

export function clearBars() {
    const container = document.getElementById("container");
    container.innerHTML = ''; // Clear all bars
}