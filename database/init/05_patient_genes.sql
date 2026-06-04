USE bvari;

CREATE TABLE IF NOT EXISTS PatientGenes (
    patient_id VARCHAR(20) NOT NULL,
    gene VARCHAR(10) NOT NULL,
    PRIMARY KEY (patient_id, gene),
    CONSTRAINT fk_patient_genes_patient
        FOREIGN KEY (patient_id) REFERENCES PatientDetails (patient_id)
);
