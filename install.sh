#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Cozy Candle Haven installation...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Docker is not installed. Please install Docker first:${NC}"
    echo "https://docs.docker.com/engine/install/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Docker Compose is not installed. Please install Docker Compose first:${NC}"
    echo "https://docs.docker.com/compose/install/"
    exit 1
fi

# Make sure Docker daemon is running
if ! docker info &> /dev/null; then
    echo -e "${YELLOW}Docker daemon is not running. Please start Docker first.${NC}"
    exit 1
fi

echo -e "${GREEN}Building and starting containers...${NC}"

# Stop any existing containers
docker-compose down

# Build and start containers
docker-compose build
docker-compose up -d

# Wait for services to be ready
echo -e "${GREEN}Waiting for services to start...${NC}"
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}Installation successful!${NC}"
    echo -e "${GREEN}You can access the application at:${NC}"
    echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
    echo -e "${GREEN}Medusa Admin: http://localhost:9000/admin${NC}"
else
    echo -e "${YELLOW}Some services failed to start. Please check the logs:${NC}"
    echo "docker-compose logs"
fi