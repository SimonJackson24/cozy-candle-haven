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

echo -e "${GREEN}Starting application installation...${NC}"

# Build and start containers
docker-compose build
docker-compose up -d

echo -e "${GREEN}Installation successful!${NC}"
echo -e "${GREEN}You can access the application at:${NC}"
echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
echo -e "${GREEN}Make sure your Vendure server is running at http://localhost:3000${NC}"

echo -e "${YELLOW}Important notes for Raspberry Pi:${NC}"
echo "1. Make sure your Vendure server is running"
echo "2. Ensure ports 8080 and 3000 are available"
echo "3. Configure your firewall if needed"