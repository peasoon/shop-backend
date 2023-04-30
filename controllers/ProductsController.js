import { pool } from "../app.js";

export const getAllProducts = (request, response) => {
  const category = request.query.category;
  const title = request.query.title;
  console.log(category);
  console.log(title);
  if (!category) {
    if (title) {
      pool.query(
        "SELECT * FROM products WHERE  name LIKE $1 ORDER BY product_id ASC",
        [`%${title}%`],
        (error, results) => {
          if (error) {
            return response.status(500).json({ message: "Database error" });
            //throw error
          }
          return response.status(200).json(results.rows);
        }
      );
    } else
      pool.query(
        "SELECT * FROM products ORDER BY product_id ASC",
        (error, results) => {
          if (error) {
            return response.status(500).json({ message: "Database error" });
            //throw error
          }
          return response.status(200).json(results.rows);
        }
      );
  } else {
    if (!title) {
      pool.query(
        "SELECT * FROM products WHERE category=$1 ORDER BY product_id ASC",
        [category],
        (error, results) => {
          if (error) {
            return response.status(500).json({ message: "database error" });
            //throw error
          } else if (results.rows.length === 0) {
            return response.status(500).json({ message: "no such category" });
          } 
          else return response.status(200).json(results.rows);
        }
      );
    } else {
      pool.query(
        "SELECT * FROM products WHERE category=$1 AND name LIKE $2 ORDER BY product_id ASC",
        [category, `%${title}%`],
        (error, results) => {
          if (error) {
            return response.status(500).json({ message: "database error" });
            //throw error
          } 
          // else if (results.rows.length === 0) {
          //   return response.status(500).json({ message: "no such title" });
          // } 
          else return response.status(200).json(results.rows);
        }
      );
    }
  }
};

export const getProductById = (request, response) => {
  const slug = String(request.params.slug);

  pool.query(
    "SELECT * FROM products WHERE slug = $1",
    [slug],
    (error, results) => {
      if (error) {
        return response.status(404).json({ message: "Product not found" });
        //throw error
      }
      if (results.rows.length === 0) {
        return response.status(404).json({ message: "Product not found" });
      }
      response.status(200).json(results.rows);
    }
  );
};
