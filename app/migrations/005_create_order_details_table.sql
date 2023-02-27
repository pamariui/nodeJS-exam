CREATE TABLE IF NOT EXISTS order_details(
	order_details_id INT AUTO_INCREMENT PRIMARY KEY,
	order_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    product_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    unit_price INT(10) NOT NULL,
    quantity INT(10) NOT NULL,
    discount INT(10) NOT NULL
);