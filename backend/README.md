This README outlines the prerequisites, build commands, and usage examples to get the container up and running. Follow the steps to build the Docker image and start the service using Docker Compose.

## Prerequisites
- Docker Engine installed and running
- Docker Compose plugin or standalone binary installed
- A terminal or command prompt with access to Docker commands

## Build the Docker Image

Use Docker Compose to build the service defined in `docker-compose.yml`. This command reads the `build` context and Dockerfile, then creates the image: 

```bash
docker compose build
```
Run this again whenever you change the Dockerfile or its build context.  

## Start the Containers

Once the image is built, launch the API container with:

```bash
docker compose up
```

Add `-d` to detach and run in the background:

```bash
docker compose up -d
```

Docker Compose will create a network, build missing images, and start the container(s) automatically.  

## Access the Demo Endpoint

With the service running, send a GET request to verify the CSV is loaded correctly:

```bash
curl http://localhost:5000/demo
```

You should receive a JSON payload containing the first five rows of the CSV.
