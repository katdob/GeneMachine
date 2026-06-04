from flask import Blueprint, jsonify

from app.models import PatientDetails, PatientDiagnosis, PatientGenes

routes_bp = Blueprint("routes", __name__, url_prefix="/api")


@routes_bp.get("/hello")
def hello():
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
