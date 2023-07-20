# NestJS TODO List

<p>
  <strong>A pratical implementation for TODO List service</strong>
</p>

<p>
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
</p>

NestJS TODO List is web server for managing your to-do lists and tasks. This service uses a high performance,
easy-to-use, RESTFul application on the NestJS framework and is backed by a PostgreSQL database.

## 🚀 Features

- 📝 **List Management**: Create, update and delete lists.
- ✅ **Task Management**: Add, update and delete tasks on a specific list.

## 📚 Prerequisites

- Node.js
- PostgreSQL
- Npm/Yarn

## 🛠️ Installation Guide

Here is a step-by-step guide to set up the NestJS TODO List on your local machine.

1. 🎈 Clone the repository to your local machine

```bash
git clone https://github.com/your_repository/nestjs_todo_list.git
```

1. 📂 Navigate into the directory of the project

```bash
cd nestjs_todo_list
```

2. 🧰 Install the dependencies of the project

```bash
npm install
# or with yarn
yarn
```

3. 📄 Create a .env file in the root directory of the project

```text
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name
```

4. ⚙️ Run database migrations

```bash
npm run migration:run
# or with yarn
yarn migration:run
```

5. 🚀 Start the server

```bash
npm run start
# or with yarn
yarn start
```

You should now have the NestJS TODO List running on your local machine.

## 🧪 Testing

To run tests, use the command below:

```bash
npm run test
# or with yarn
yarn test
```

📝 License This project is open-source and is licensed under the MIT License. For more information see the LICENSE file
in the project's root directory.

Please note: This project is still under active development and more features are to be added soon, like front-end in
another repository.
