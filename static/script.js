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
        // Display the summarized text in the chat box
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div class="message user">You: ${inputText}</div>`;
        chatBox.innerHTML += `<div class="message bot">Bot: ${data.summarized_text}</div>`;

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear the input textarea
        document.getElementById("input-text").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
