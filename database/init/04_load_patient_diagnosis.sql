USE bvari;

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fake_patient_diagnosis.csv'
INTO TABLE PatientDiagnosis
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(patient_id, diagnosis);
