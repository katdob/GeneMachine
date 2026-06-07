from flask import Blueprint, jsonify, request
from sqlalchemy import or_

from app.models import PatientDetails, PatientDiagnosis, PatientGenes

routes_bp = Blueprint("routes", __name__, url_prefix="/api")


@routes_bp.get("/hello")
def hello():
    # this is just a test endpoint to make sure I can get data from each table in the database
    first_patient_details = PatientDetails.query.first()

    first_patient_gene = None
    first_patient_diagnosis = None

    if first_patient_details is not None:
        first_patient_gene = PatientGenes.query.filter_by(
            patient_id=first_patient_details.patient_id
        ).first()
        first_patient_diagnosis = PatientDiagnosis.query.filter_by(
            patient_id=first_patient_details.patient_id
        ).first()

    message = (
        f"The first patient in the data base is "
        f"{first_patient_details.first_name} {first_patient_details.last_name} "
        f"with diagnosis {first_patient_diagnosis.diagnosis} "
        f"and relevant gene {first_patient_gene.gene}."
    )

    return jsonify({"message": message})


@routes_bp.get("/get_genes")
def get_genes():
    gene = request.args.get("gene", "").strip()

    if not gene:
        return jsonify({"error": "gene query parameter is required"}), 400

    results = PatientGenes.query.filter(
        PatientGenes.gene.ilike(f"%{gene}%")
    ).all()

    return jsonify([result.to_dict() for result in results])


@routes_bp.get("/get_patients")
def get_patients():
    patient = request.args.get("patient", "").strip()

    if not patient:
        return jsonify({"error": "patient query parameter is required"}), 400

    pattern = f"%{patient}%"
    results = PatientDetails.query.filter(
        or_(
            PatientDetails.first_name.ilike(pattern),
            PatientDetails.last_name.ilike(pattern),
            PatientDetails.city.ilike(pattern),
            PatientDetails.state.ilike(pattern),
        )
    ).all()

    return jsonify([result.to_dict() for result in results])


@routes_bp.get("/get_diagnosis")
def get_diagnosis():
    diagnosis = request.args.get("diagnosis", "").strip()

    if not diagnosis:
        return jsonify({"error": "diagnosis query parameter is required"}), 400

    results = PatientDiagnosis.query.filter(
        PatientDiagnosis.diagnosis.ilike(f"%{diagnosis}%")
    ).all()

    return jsonify([result.to_dict() for result in results])
