from flask import Flask, request, jsonify, render_template
from summa import summarizer

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        summarized_text = generate_summary(paragraph)   Using TextRank for summarization
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

def generate_summary(text, ratio=0.2):
    # Generate the summary using the TextRank algorithm
    if len(text) < 25 or "." not in text:
        return text
    else:    
    summary = summarizer.summarize(text, ratio=ratio)
    return summary

if __name__ == "__main__":
    app.run(debug=True)
