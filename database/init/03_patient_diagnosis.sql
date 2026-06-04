USE bvari;

CREATE TABLE IF NOT EXISTS PatientDiagnosis (
    patient_id VARCHAR(20) NOT NULL,
    diagnosis VARCHAR(50) NOT NULL,
    PRIMARY KEY (patient_id),
    CONSTRAINT fk_patient_diagnosis_patient
        FOREIGN KEY (patient_id) REFERENCES PatientDetails (patient_id)
);
