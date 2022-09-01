require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { userInfo } = require('os');
const users = require('./routes/users/users.route');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME 
} = process.env;

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
let sequelize =
process.env.NODE_ENV === "production"
? new Sequelize({
  database: DB_NAME,
  dialect: "postgres",
  host: DB_HOST,
  port: 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
}) : new Sequelize (
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {logging: false, native: false}
)
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {Orders, Profession, Review, User, Conversation, Message, Claims } = sequelize.models;

// Aca vendrian las relaciones

User.belongsToMany(Profession, { through: "user_profession", timestamps: false });
Profession.belongsToMany(User, { through: "user_profession", timestamps: false });

User.belongsToMany(Orders, { through: "user_orders", timestamps: false });
Orders.belongsToMany(User, { through: "user_orders", timestamps: false });

User.belongsToMany(Review, { through: "user_review", timestamps: false });
Review.belongsToMany(User, { through: "user_review", timestamps: false });

User.belongsToMany(Conversation, { through: "user_conversation", timestamps: false });
Conversation.belongsToMany(User, { through: "user_conversation", timestamps: false });

Message.belongsToMany(Conversation, { through: "conversation_message", timestamps: false });
Conversation.belongsToMany(Message, { through: "conversation_message", timestamps: false });

User.belongsToMany(Claims, {through: "user_claims", timestamps: false})
Claims.belongsToMany(User, {through: "user_claims", timestamps: false})

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  Op
};
