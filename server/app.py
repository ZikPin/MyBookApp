import config
from models import Story

app = config.connex_app
app.add_api(config.basedir / "swagger.yml")

@app.route("/")
def home():
    return "<h1>HI</h1>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)