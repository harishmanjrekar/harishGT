from flask import Flask, request, jsonify, render_template
from transformers import GPT2Tokenizer, GPT2LMHeadModel

app = Flask(__name__)

# Load the DistilGPT-2 model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("distilgpt2")
model = GPT2LMHeadModel.from_pretrained("distilgpt2")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        summarized_text = generate_summary(paragraph)  # Using GPT-2 for generative summarization
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text, max_length=100):
    # Tokenize the input text
    inputs = tokenizer(text, return_tensors="pt", max_length=max_length, truncation=True)

    # Generate the summary using the GPT-2 model
    summary_ids = model.generate(inputs.input_ids, num_beams=4, max_length=max_length, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return summary

if __name__ == "__main__":
    app.run(debug=True)
