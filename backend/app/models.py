from typing import Any

from app.extensions import db


class PatientDetails(db.Model):
    __tablename__ = "PatientDetails"

    patient_id = db.Column(db.String(20), primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(20), nullable=False)
    street_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    phone = db.Column(db.String(20), nullable=False)

    diagnosis = db.relationship(
        "PatientDiagnosis",
        back_populates="patient",
        uselist=False,
    )
    genes = db.relationship(
        "PatientGenes",
        back_populates="patient",
    )

    def to_dict(self) -> dict[str, Any]:
        return {
            "patient_id": self.patient_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "gender": self.gender,
            "street_address": self.street_address,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "phone": self.phone,
        }


class PatientDiagnosis(db.Model):
    __tablename__ = "PatientDiagnosis"

    patient_id = db.Column(
        db.String(20),
        db.ForeignKey("PatientDetails.patient_id"),
        primary_key=True,
    )
    diagnosis = db.Column(db.String(50), nullable=False)

    patient = db.relationship("PatientDetails", back_populates="diagnosis")

    def to_dict(self) -> dict[str, Any]:
        return {
            "patient_id": self.patient_id,
            "diagnosis": self.diagnosis,
        }


class PatientGenes(db.Model):
    __tablename__ = "PatientGenes"

    patient_id = db.Column(
        db.String(20),
        db.ForeignKey("PatientDetails.patient_id"),
        primary_key=True,
    )
    gene = db.Column(db.String(10), primary_key=True)

    patient = db.relationship("PatientDetails", back_populates="genes")

    def to_dict(self) -> dict[str, Any]:
        return {
            "patient_id": self.patient_id,
            "gene": self.gene,
        }
