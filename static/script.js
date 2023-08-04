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
        // Display the summarized text in the output area
        const outputArea = document.getElementById("output");
        outputArea.innerHTML = data.summarized_text;

        // Scroll to the bottom of the output area
        outputArea.scrollTop = outputArea.scrollHeight;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function clearInput() {
    // Clear the input textarea
    document.getElementById("input-text").value = "";
}

function clearOutput() {
    // Clear the output area
    document.getElementById("output").innerHTML = "";
}
