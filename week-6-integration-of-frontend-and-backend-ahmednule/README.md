```markdown
# Expense Tracker Application

This project is an Expense Tracker built with Express.js, Sequelize ORM, and MySQL. The application allows users to sign up, log in, and track their expenses, while implementing best practices such as password hashing, JWT authentication, and automated testing.

## Table of Contents

- [Project Setup](#project-setup)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Sequelize CLI Commands](#sequelize-cli-commands)
- [Authentication](#authentication)
- [Testing](#testing)
- [License](#license)

## Project Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Install Sequelize CLI:

```bash
npm install --save sequelize sequelize-cli mysql2
```

4. Create the project structure:

```bash
sequelize init
```

This creates a structure with `config`, `models`, `migrations`, and `seeders` directories.

## Environment Variables

Create a `.env` file at the root of the project to securely store environment variables such as database credentials and JWT secret.

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=expense_tracker
JWT_SECRET=your_jwt_secret
```

Make sure to add `.env` to your `.gitignore` file to keep it out of version control.

## Database Setup

1. Set up the database and configure your `config/config.json` file to match the `.env` variables.

2. Run migrations to create your tables:

```bash
sequelize db:migrate
```

3. If needed, populate the database with initial seed data:

```bash
sequelize db:seed:all
```

## Sequelize CLI Commands

Here are some useful Sequelize CLI commands:

- Create a migration:

```bash
sequelize migration:generate --name create-expense-table
```

- Run migrations:

```bash
sequelize db:migrate
```

- Undo migrations:

```bash
sequelize db:migrate:undo
```

- Create a seeder:

```bash
sequelize seed:generate --name demo-user
```

- Run seeders:

```bash
sequelize db:seed:all
```

## Authentication

### Signup

- Passwords are hashed using `bcrypt` before storing in the database to ensure security.

```js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hashing password before saving
user.password = await bcrypt.hash(user.password, 10);
await user.save();
```

### Login

- Users can log in using their email and password. JWT tokens are generated upon successful login.

```js
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
```

### Middleware for Protected Routes

- Use JWT to secure routes. Example:

```js
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
```

## Testing

We use `mocha`, `chai`, and `supertest` for testing the application.

### Setup

1. Install testing dependencies:

```bash
npm install --save-dev mocha chai supertest
```

2. Add a `test` script in `package.json`:

```json
"scripts": {
  "test": "mocha"
}
```

### Writing Tests

Create test files in the `test` directory. Here's an example test for the signup functionality:

```js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Signup', () => {
  it('should signup a new user', (done) => {
    chai.request(app)
      .post('/signup')
      .send({
        email: 'testuser@example.com',
        password: 'Test@1234'
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
```

### Running Tests

To run your tests, simply use:

```bash
npm test