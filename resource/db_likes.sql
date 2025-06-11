CREATE TABLE product_likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    likes_count INT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Initialize likes for existing products
INSERT INTO product_likes (product_id, likes_count)
SELECT id, 0 FROM products; 