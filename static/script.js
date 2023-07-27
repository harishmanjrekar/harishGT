function capitalize() {
    // Get the input text from the textarea
    const inputText = document.getElementById("input-text").value;

    // Make an asynchronous POST request to the Flask backend
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ paragraph: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the capitalized text in the chat box
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div class="message user">You: ${inputText}</div>`;
        chatBox.innerHTML += `<div class="message bot">Bot: ${data.capitalized_text}</div>`;

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
        
        // Clear the input textarea
        document.getElementById("input-text").value = "";
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
