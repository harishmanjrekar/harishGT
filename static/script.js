function summarize() {
    // Get the input text from the textarea
    const inputText = document.getElementById("input-text").value;

    // Create a new FormData object and add the paragraph field
    const formData = new FormData();
    formData.append("paragraph", inputText);

    // Make an asynchronous POST request to the Flask backend
    fetch("/", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Display the summarized text in the output box
        const outputBox = document.getElementById("output-box");
        outputBox.innerText = data.summarized_text;

        // Calculate word count for input and output sections
        const inputWordCount = inputText.trim().split(/\s+/).length;
        const outputWordCount = data.summarized_text.trim().split(/\s+/).length;

        // Calculate percentage reduction
        const percentageReduction = ((inputWordCount - outputWordCount) / inputWordCount) * 100;

        // Display word count and percentage reduction above the output box
        const outputWordCountElement = document.getElementById("output-word-count");
        outputWordCountElement.textContent = `Word count: ${outputWordCount}`;
        const percentageReductionElement = document.getElementById("percentage-reduction");
        percentageReductionElement.textContent = `Percentage Reduction: ${percentageReduction.toFixed(2)}%`;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}


function clearText() {
    // Clear the input and output textareas
    document.getElementById("input-text").value = "";
    document.getElementById("output-box").innerText = "";

    // Update word count to 0 after clearing text
    countWords();
}

function countWords() {
    const inputText = document.getElementById("input-text").value;
    const inputWordCount = inputText.trim().split(/\s+/).length;
    const inputWordCountElement = document.getElementById("input-word-count");
    inputWordCountElement.textContent = `Word count: ${inputWordCount}`;

    const outputText = document.getElementById("output-box").textContent;
    const outputWordCount = outputText.trim().split(/\s+/).length;
    const outputWordCountElement = document.getElementById("output-word-count");
    outputWordCountElement.textContent = `Word count: ${outputWordCount}`;
    // Calculate percentage reduction and display it
    const percentageReduction = ((inputWordCount - outputWordCount) / inputWordCount) * 100;
    const percentageReductionElement = document.getElementById("percentage-reduction");
    percentageReductionElement.textContent = `Percentage Reduction: ${percentageReduction.toFixed(2)}%`;
}
