from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.get("/health")
def health():
    return jsonify({"status": "ok"})


@api_bp.get("/")
def index():
    return jsonify({"message": "bvari API"})
