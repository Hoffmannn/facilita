const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");
const queries = require("./sql/queries.js");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
  console.log(`Aplicação roando na porta ${port}.`);
});

app.get("/customers", queries.getAllCustomers);
app.get("/customers/:id", queries.getCustomerById);
app.post("/customers", queries.createCustomer);
app.put("/customers/:id", queries.updateCustomer);
app.delete("/customers/:id", queries.deleteCustomer);
app.get("/calculateRoute", queries.calculateRoute);
