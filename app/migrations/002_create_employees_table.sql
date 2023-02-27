CREATE TABLE IF NOT EXISTS employees(
	employee_id INT AUTO_INCREMENT PRIMARY KEY,
	last_name VARCHAR(255) NOT NULL,
	first_name VARCHAR(255) NOT NULL,
	title VARCHAR(255) NOT NULL,
	title_of_courtesy VARCHAR(255) NOT NULL,
	birth_date DATE NOT NULL,
	hire_date DATE NOT NULL,
	address VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL
);