function updateWordCount(type) {
    const text = document.getElementById(`${type}-box`).innerText;
    const words = text.trim().split(/\s+/).length;
    document.getElementById(`${type}-word-count`).innerText = words;
}

function summarize() {
    // Get the input text from the input-box
    const inputText = document.getElementById("input-box").innerText;

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
        updateWordCount('output');
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function clearInputOutput() {
    // Clear the input and output boxes and word counters
    document.getElementById("input-box").innerText = "Enter a paragraph to summarize:";
    document.getElementById("output-box").innerText = "";
    updateWordCount('input');
    updateWordCount('output');
}
