const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "facilita",
  password: "postgres",
  port: 5432,
});

const getAllCustomers = (_request, response) => {
  pool.query("SELECT * FROM customers ORDER BY name ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getCustomerById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM customer WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createCustomer = (request, response) => {
  const { name, email, phone, coordinateX, coordinateY } = request.body;

  pool.query(
    "INSERT INTO customers (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, phone, coordinateX, coordinateY],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(201)
        .send(`Customer added with ID: ${results.rows[0].id}`);
    }
  );
};

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email, phone, coordinateX, coordinateY } = request.body;

  pool.query(
    "UPDATE customers SET name = $2, email = $3, phone = $4, coordinate_x = $5, coordinate_y = $6 WHERE id = $1",
    [id, name, email, phone, coordinateX, coordinateY],
    (error, _results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Customer modified with ID: ${id}`);
    }
  );
};

const deleteCustomer = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM customers WHERE id = $1", [id], (error, _results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Customer deleted with ID: ${id}`);
  });
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
