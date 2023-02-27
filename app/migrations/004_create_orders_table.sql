CREATE TABLE IF NOT EXISTS orders(
	order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    shipper_id INT NOT NULL,
    FOREIGN KEY (shipper_id) REFERENCES shippers(shipper_id)
);