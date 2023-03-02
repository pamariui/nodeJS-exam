CREATE TABLE IF NOT EXISTS order_details(
	order_details_id INT AUTO_INCREMENT PRIMARY KEY,
	order_id INT ,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE SET NULL,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL,
    unit_price INT(10) NOT NULL,
    quantity INT(10) NOT NULL,
    discount INT(10) NOT NULL
);