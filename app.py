from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

# Initialize the summarization pipeline with the Pegasus model
summarizer = pipeline("summarization", model="google/pegasus-xsum")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        # Use the summarization pipeline to generate the summary
        summarized_text = generate_summary(paragraph)
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text):
    num_words_original = len(text.split())

    # Calculate the desired number of words for the specified percentage

    # Generate the summary using the summarization pipeline (Pegasus)
    summary = summarizer(text, max_length= (num_words_original*0.35), min_length=(num_words_original*0.2), do_sample=True)[0]["summary_text"]
    return summary

if __name__ == "__main__":
    app.run(debug=True)
