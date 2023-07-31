from flask import Flask, request, jsonify, render_template
from transformers import pipeline
from celery import Celery

app = Flask(__name__)

# Initialize the summarization pipeline with the desired model and tokenizer
summarizer = pipeline("summarization", model="facebook/bart-large-cnn", tokenizer="facebook/bart-large-cnn")

# Configure Celery
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'  # Replace with your Redis URL
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'  # Replace with your Redis URL
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

# Asynchronous Celery task for summarization
@celery.task
def summarize_text(text, max_length=300, min_length=50):
    return summarizer(text, max_length=max_length, min_length=min_length, do_sample=False)[0]['summary_text']

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        # Start the asynchronous Celery task for summarization
        summarized_text = summarize_text.delay(paragraph).get()
        return jsonify({"summarized_text": summarized_text})

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
