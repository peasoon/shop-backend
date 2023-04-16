import { pool } from "../app.js";

export const getAllProducts = (request, response) => {
  pool.query(
    "SELECT * FROM products ORDER BY product_id ASC",
    (error, results) => {
      if (error) {
        response.status(500).json({ message: "Database error" });
        //throw error
      }
      response.status(200).json(results.rows);
    }
  );
};


export const getProductById = (request, response) => {
  const slug = String(request.params.slug)

  pool.query('SELECT * FROM products WHERE slug = $1', [slug], (error, results) => {
    if (error) {
      return response.status(404).json({ message: "Product not found" });
      //throw error
    }
    if(results.rows.length===0) {
      return response.status(404).json({ message: "Product not found" });
    }
    response.status(200).json(results.rows)
  })
}