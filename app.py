from flask import Flask, request, jsonify, render_template
from gensim.summarization import summarize

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        summarized_text = generate_summary(paragraph)  # Using TextRank for summarization
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text, ratio=0.2):
    # Generate the summary using the TextRank algorithm
    summary = summarize(
        text,
        ratio=ratio,
        word_count=None,  # Specify a word count limit here
        split=False,  # Set to True if you want sentence splitting
        remove_redundancy=True,
        diversity=0.5,  # Set a diversity parameter for sentence selection
        normalization=None,  # Specify a normalization function
        similarity="jaccard",  # Use "cosine" or "jaccard" for similarity
        min_length=5  # Specify a minimum sentence length
    )
    return summary

if __name__ == "__main__":
    app.run(debug=True)
