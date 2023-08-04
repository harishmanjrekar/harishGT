from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

# Initialize the summarization pipeline with the desired model and tokenizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", tokenizer="facebook/bart-large-cnn")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        # Check if the input is just one sentence or less than 25 letters
        if len(paragraph) < 25 or len(paragraph.split(".")) == 1:
            # If yes, return the input as the output
            summarized_text = paragraph
        else:
            # Otherwise, use the summarization pipeline to generate the summary
            summarized_text = generate_summary(paragraph)
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text, max_length=300, min_length=50):
    # Generate the summary using the summarization pipeline
    # You can adjust max_length and min_length as per your requirements
    summary = summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']
    return summary

if __name__ == "__main__":
    app.run(debug=True)
