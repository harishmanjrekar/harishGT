from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def capitalize_text(text):
    return text.upper()

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        paragraph = request.form.get("paragraph")
        capitalized_text = capitalize_text(paragraph)
        return jsonify({"capitalized_text": capitalized_text})

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)
