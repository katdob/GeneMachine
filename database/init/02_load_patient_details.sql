USE bvari;

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fake_patient_details.csv'
INTO TABLE PatientDetails
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(patient_id, first_name, last_name, gender, street_address, city, state, zip_code, phone);
