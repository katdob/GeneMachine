USE bvari;

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fake_patient_genes.csv'
INTO TABLE PatientGenes
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(patient_id, gene);
