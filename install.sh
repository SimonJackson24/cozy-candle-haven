#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

echo -e "${GREEN}Setting up Vendure server...${NC}"

# Create a directory for Vendure
mkdir -p vendure
cd vendure

# Download Vendure docker-compose file if it doesn't exist
if [ ! -f docker-compose.yml ]; then
    echo -e "${YELLOW}Downloading Vendure configuration...${NC}"
    curl -o docker-compose.yml https://raw.githubusercontent.com/vendure-ecommerce/vendure/master/docker-compose.yml
fi

# Start Vendure containers
echo -e "${GREEN}Starting Vendure containers...${NC}"
docker-compose up -d

# Wait for Vendure to be ready
echo -e "${YELLOW}Waiting for Vendure to start...${NC}"
until $(curl --output /dev/null --silent --head --fail http://localhost:3000/shop-api); do
    printf '.'
    sleep 5
done

cd ..

echo -e "${GREEN}Building and starting frontend containers...${NC}"

# Build and start frontend containers
docker-compose build
docker-compose up -d

echo -e "${GREEN}Installation successful!${NC}"
echo -e "${GREEN}You can access the applications at:${NC}"
echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
echo -e "${GREEN}Vendure Admin: http://localhost:3000/admin${NC}"
echo -e "${GREEN}Default admin credentials:${NC}"
echo -e "${YELLOW}Email: superadmin@vendure.io${NC}"
echo -e "${YELLOW}Password: superadmin${NC}"

echo -e "\n${YELLOW}Important notes:${NC}"
echo "1. The Vendure server may take a few minutes to fully initialize"
echo "2. On first run, sample data will be automatically populated"
echo "3. Make sure ports 8080 and 3000 are available"