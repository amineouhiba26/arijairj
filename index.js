const express = require("express");
const dotenv = require("dotenv");
const database = require("./src/database/db.config");

dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à la base de données MongoDB
database.mongoose
  .connect(database.url, {})
  .then(() => {
    console.log(" Connected to the database!");
  })
  .catch((err) => {
    console.error("Cannot connect to the database!", err);
    process.exit();
  });

// Route de test
app.get("/", (req, res) => {
  res.send({ message: "Hello from the API!" });
});

// Charger les routes de l'API
require("./src/api/routes/routes")(app);

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
