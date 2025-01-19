#!/bin/bash

# Print colorful messages
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Cozy Candle Haven installation for Raspberry Pi...${NC}"

# Check if running on Raspberry Pi
if ! grep -q "Raspberry Pi" /proc/cpuinfo; then
    echo -e "${RED}This script is intended for Raspberry Pi systems only.${NC}"
    exit 1
fi

# Check if running 64-bit OS
if [ "$(uname -m)" != "aarch64" ]; then
    echo -e "${RED}This script requires 64-bit Raspberry Pi OS.${NC}"
    exit 1
fi

# Check system requirements
echo -e "${GREEN}Checking system requirements...${NC}"

# Check available memory
TOTAL_MEM=$(free -m | awk '/^Mem:/{print $2}')
if [ $TOTAL_MEM -lt 4096 ]; then
    echo -e "${YELLOW}Warning: Recommended memory is 4GB or more. Current: ${TOTAL_MEM}MB${NC}"
fi

# Check available disk space
DISK_SPACE=$(df -h / | awk 'NR==2 {print $4}' | sed 's/G//')
if [ $(echo "$DISK_SPACE < 10" | bc -l) -eq 1 ]; then
    echo -e "${YELLOW}Warning: Recommended free disk space is 10GB or more. Current: ${DISK_SPACE}GB${NC}"
fi

# Install system dependencies
echo -e "${GREEN}Installing system dependencies...${NC}"
sudo apt-get update
sudo apt-get install -y \
    curl \
    git \
    docker.io \
    docker-compose \
    build-essential

# Enable and start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Add current user to docker group and apply changes immediately
echo -e "${GREEN}Setting up Docker permissions...${NC}"
sudo usermod -aG docker $USER
if ! groups $USER | grep -q docker; then
    echo -e "${YELLOW}Docker group changes will take effect after logging out and back in.${NC}"
    echo -e "${YELLOW}To apply changes immediately, run:${NC}"
    echo -e "${GREEN}newgrp docker${NC}"
    echo -e "${YELLOW}Or log out and log back in.${NC}"
fi

# Install Node.js using Node Version Manager (nvm)
echo -e "${GREEN}Installing Node.js...${NC}"
if [ ! -d "$HOME/.nvm" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install 20
    nvm use 20
else
    echo -e "${GREEN}nvm is already installed${NC}"
fi

# Create environment file
echo -e "${GREEN}Creating environment configuration...${NC}"
cat > .env << EOL
NODE_ENV=production
HOST=0.0.0.0
PORT=8080
VITE_MEDUSA_BACKEND_URL=http://localhost:9000
EOL

# Check if user is in docker group or has sudo
if groups $USER | grep -q docker || [ $(id -u) -eq 0 ]; then
    # Pull and start containers
    echo -e "${GREEN}Starting application containers...${NC}"
    docker-compose pull
    docker-compose up -d

    # Wait for services to be ready
    echo -e "${GREEN}Waiting for services to start...${NC}"
    sleep 30

    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        echo -e "${GREEN}Installation successful!${NC}"
        echo -e "${GREEN}You can access the application at:${NC}"
        echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
        echo -e "${GREEN}Medusa Admin: http://localhost:9000/admin${NC}"
        
        # Get the Raspberry Pi's IP address
        IP_ADDRESS=$(hostname -I | awk '{print $1}')
        echo -e "${GREEN}Or using your Raspberry Pi's IP address:${NC}"
        echo -e "${GREEN}Frontend: http://$IP_ADDRESS:8080${NC}"
        echo -e "${GREEN}Medusa Admin: http://$IP_ADDRESS:9000/admin${NC}"
    else
        echo -e "${RED}Some services failed to start. Please check the logs:${NC}"
        echo "docker-compose logs"
    fi
else
    echo -e "${YELLOW}Please run 'newgrp docker' or log out and log back in to apply Docker permissions,${NC}"
    echo -e "${YELLOW}then run 'docker-compose up -d' to start the application.${NC}"
fi

# Add helpful maintenance commands
echo -e "\n${YELLOW}Useful commands:${NC}"
echo "- View logs: docker-compose logs"
echo "- Stop application: docker-compose down"
echo "- Start application: docker-compose up -d"
echo "- Restart application: docker-compose restart"