#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Raspberry Pi installation...${NC}"

# Check if running on ARM architecture
if [[ $(uname -m) != "aarch64" ]]; then
    echo -e "${RED}This script is intended for Raspberry Pi (ARM64) systems only.${NC}"
    exit 1
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    sudo apt-get update
    sudo apt-get install -y docker-compose
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

echo -e "\n${YELLOW}Important notes for Raspberry Pi:${NC}"
echo "1. The Vendure server may take a few minutes to fully initialize"
echo "2. On first run, sample data will be automatically populated"
echo "3. Make sure ports 8080 and 3000 are available"
echo "4. Performance may vary based on your Raspberry Pi model"