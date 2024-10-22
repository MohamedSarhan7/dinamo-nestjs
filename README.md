# Dinamo-NestJS

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Swagger Documentation](#swagger-documentation)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohamedsarhan7/dinamo-nestjs.git
   cd dinamo-nestjs


2. **Build the Docker Containers:**

   ```bash
   docker compose build
   ```

3. **Start the Application:**

   ```bash
   docker compose up
   ```

4. **Access the Application:**

   After starting the application, it will be available at:

   - **Base URL**: [http://localhost:3000/api](http://localhost:3000/api)
   - **Swagger URL**: [http://localhost:3000/api/docs](http://localhost:3000/api/dcs)


### Swagger Documentation

To access the Swagger API documentation, navigate to:

- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

This provides a detailed interface for interacting with the API endpoints and exploring the available operations.