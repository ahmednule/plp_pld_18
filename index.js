const { Sequelize } = require('sequelize');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const sequelize = new Sequelize('database_development', 'root', 'maitha1-Nule', {
  host: 'localhost',
  dialect:'mysql'
});

async function connect() {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
connect();

app.get('/', (req, res) => {
  // res.send('Hello World');
  res.render('signup', { title: 'Sign Up' });
});

app.get('/login', (req, res) => {
  // res.send('Hello World');
  res.render('login', { title: 'login page' });
});

app.get('/dashboard', (req, res) => {
  // res.send('Hello World');
  res.render('dashboard', { title: 'dashboard' });
});

app.post('/signup', (req, res) => {
  res.send('Sign Up');
});




app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000');
});
