import os

from flask import Flask
from flask_cors import CORS

from app.api import api_bp
from app.extensions import db
from app.routes import routes_bp


def _database_uri() -> str:
    user = os.getenv("MYSQL_USER", "root")
    password = os.getenv("MYSQL_PASSWORD", "rootpassword")
    host = os.getenv("MYSQL_HOST", "127.0.0.1")
    port = os.getenv("MYSQL_PORT", "3306")
    database = os.getenv("MYSQL_DATABASE", "bvari")
    return f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}"


def create_app() -> Flask:
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config["SQLALCHEMY_DATABASE_URI"] = _database_uri()
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)

    app.register_blueprint(api_bp)
    app.register_blueprint(routes_bp)

    return app
