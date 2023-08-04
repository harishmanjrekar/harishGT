function summarize() {
    const inputText = document.getElementById("input-text").value;
    const formData = new FormData();
    formData.append("paragraph", inputText);

    fetch("/", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const chatBox = document.getElementById("chat-box");
        chatBox.innerHTML += `<div class="message user">You: ${inputText}</div>`;
        chatBox.innerHTML += `<div class="message bot">Bot: ${data.summarized_text}</div>`;

        chatBox.scrollTop = chatBox.scrollHeight;
        document.getElementById("input-text").value = "";
        
        // Display the summarized text in the output section
        const outputText = document.getElementById("output-text");
        outputText.textContent = data.summarized_text;
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

function clearAll() {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = '<div class="message bot">Enter a paragraph to summarize:</div>';
    
    const inputText = document.getElementById("input-text");
    inputText.value = "";

    const outputText = document.getElementById("output-text");
    outputText.textContent = "";
}

// Function to make the container full screen
function makeFullscreen() {
    const container = document.getElementById("container");
    container.style.width = window.innerWidth + "px";
    container.style.height = window.innerHeight + "px";
}

// Call the function to make the container full screen when the page loads
window.onload = makeFullscreen;
