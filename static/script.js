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
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function clearText() {
    // Clear the input and output textareas
    document.getElementById("input-text").value = "";
    document.getElementById("output-box").innerText = "";
}
