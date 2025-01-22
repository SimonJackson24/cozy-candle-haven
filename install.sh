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

# Build and start containers
docker-compose build
docker-compose up -d

echo -e "${GREEN}Installation successful!${NC}"
echo -e "${GREEN}You can access the application at:${NC}"
echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
echo -e "${GREEN}Make sure your Vendure server is running at http://localhost:3000${NC}"