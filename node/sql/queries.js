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
    response.status(200).json(results?.rows || []);
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
  const { name, email, phone } = request.body;

  const coordinateX = Math.floor(Math.random() * 200 - 100);
  const coordinateY = Math.floor(Math.random() * 200 - 100);

  pool.query(
    "INSERT INTO customers (name, email, phone, coordinate_x, coordinate_y) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, email, phone, coordinateX, coordinateY],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows[0]);
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

const calculateRoute = (request, response) => {
  pool.query("SELECT * FROM customers ", (error, results) => {
    const customers = results?.rows;
    const distances = [];

    if (!customers) {
      return response.status(200).json([]);
    }

    // Calculate the distance between each pair of customers
    for (let i = 0; i < customers.length; i++) {
      distances[i] = [];
      for (let j = 0; j < customers.length; j++) {
        const dx = customers[i].coordinate_x - customers[j].coordinate_x;
        const dy = customers[i].coordinate_y - customers[j].coordinate_y;
        distances[i][j] = Math.sqrt(dx ** 2 + dy ** 2);
      }
    }

    // Find the shortest route using the TSP algorithm
    const route = tsp(distances);

    response
      .status(200)
      .json(route.map((i) => customers[i]).filter((route) => route));
  });
};

// Traveling Salesman Problem algorithm (Caixeiro viajante)
function tsp(distances) {
  const numberOfCities = distances.length;
  const visitedCities = new Array(numberOfCities).fill(false);
  visitedCities[0] = true;
  const shortestRoute = [0];

  for (
    let currentCityIndex = 0;
    currentCityIndex < numberOfCities - 1;
    currentCityIndex++
  ) {
    let minDistance = Infinity;
    let nextCityIndex = -1;

    for (
      let candidateCityIndex = 0;
      candidateCityIndex < numberOfCities;
      candidateCityIndex++
    ) {
      if (
        !visitedCities[candidateCityIndex] &&
        distances[shortestRoute[currentCityIndex]][candidateCityIndex] <
          minDistance
      ) {
        minDistance =
          distances[shortestRoute[currentCityIndex]][candidateCityIndex];
        nextCityIndex = candidateCityIndex;
      }
    }

    visitedCities[nextCityIndex] = true;
    shortestRoute.push(nextCityIndex);
  }

  return shortestRoute;
}

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  calculateRoute,
};
