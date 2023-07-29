# app.py
from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

# Initialize the summarization pipeline with the desired model and tokenizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", tokenizer="facebook/bart-large-cnn")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        # Use the summarization pipeline to generate the summary
        summarized_text = generate_summary(paragraph, max_length=200, min_length=50)
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text, max_length=200, min_length=50):
    # Generate the summary using the summarization pipeline
    # You can adjust max_length and min_length as per your requirements
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
    return summary

if __name__ == "__main__":
    app.run(debug=True)
