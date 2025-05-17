# backend/app.py

import pandas as pd
from config import Config
from flask import Flask, jsonify

app = Flask(__name__)
app.config.from_object(Config)

@app.route("/demo", methods=["GET"])
def demo():
    """
    Demo endpoint that reads the CSV at app.config['CSV_PATH'] and returns the first 5 rows as JSON.
    """
    try:
        # Load CSV into a DataFrame
        df = pd.read_csv(app.config["CSV_PATH"])
        # Convert first 5 rows to a list of dicts
        records = df.head(5).to_dict(orient="records")
        return jsonify({"rows": records}), 200

    except FileNotFoundError:
        return jsonify({"error": f"CSV not found at {app.config['CSV_PATH']}"}), 404

    except Exception as e:
        # Catch-all for any other errors
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Listen on all interfaces, port 5000
    app.run(host="0.0.0.0", port=5000, debug=True)
