const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const connectionDb = require('./db.config');
const sequelize = require('./sequelize'); 
const user = require('./models/user');
const patient = require('./models/patient');
const patientRoutes = require('./routes/patient');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
require('./models/associations');

sequelize.sync()
 .then(() => console.log('Database & tables created!'))
 .catch(err => console.error('Unable to connect to the database:', err));


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/patients", patientRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}.`);
});
