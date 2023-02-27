CREATE TABLE IF NOT EXISTS products(
	product_id INT AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(255) NOT NULL,
	supplier_id INT NOT NULL,
	category_id INT NOT NULL,
	quantity_per_unit INT NOT NULL,
	unit_price INT NOT NULL
);