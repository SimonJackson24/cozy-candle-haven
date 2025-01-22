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

# Check system requirements
echo -e "${YELLOW}Checking system requirements...${NC}"
TOTAL_MEM=$(free -m | awk '/^Mem:/{print $2}')
if [ $TOTAL_MEM -lt 4096 ]; then
    echo -e "${RED}Warning: System has less than 4GB RAM. 8GB RAM is recommended.${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}Installing Docker...${NC}"
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
    echo -e "${GREEN}Docker installed successfully${NC}"
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}Installing Docker Compose...${NC}"
    sudo apt-get update
    sudo apt-get install -y docker-compose
    echo -e "${GREEN}Docker Compose installed successfully${NC}"
fi

# Create project directory
PROJECT_DIR="lovable-project"
echo -e "${YELLOW}Creating project directory...${NC}"
mkdir -p $PROJECT_DIR
cd $PROJECT_DIR

# Check if ports are available
echo -e "${YELLOW}Checking if required ports are available...${NC}"
for port in 8080 3000 5432; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${RED}Port $port is already in use. Please free this port before continuing.${NC}"
        exit 1
    fi
done

# Start containers
echo -e "${GREEN}Starting containers...${NC}"
docker-compose up -d

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to start...${NC}"
echo -e "This may take a few minutes on first run..."

# Function to check if a service is ready
check_service() {
    local url=$1
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if curl --output /dev/null --silent --head --fail "$url"; then
            return 0
        fi
        echo -n "."
        sleep 10
        attempt=$((attempt + 1))
    done
    return 1
}

# Check Vendure
if ! check_service "http://localhost:3000/shop-api"; then
    echo -e "${RED}Vendure failed to start within the expected time.${NC}"
    echo -e "${YELLOW}Check logs with: docker-compose logs vendure${NC}"
    exit 1
fi

# Check Frontend
if ! check_service "http://localhost:8080"; then
    echo -e "${RED}Frontend failed to start within the expected time.${NC}"
    echo -e "${YELLOW}Check logs with: docker-compose logs frontend${NC}"
    exit 1
fi

echo -e "\n${GREEN}Installation successful!${NC}"
echo -e "${GREEN}You can access the applications at:${NC}"
echo -e "${GREEN}Frontend: http://localhost:8080${NC}"
echo -e "${GREEN}Vendure Admin: http://localhost:3000/admin${NC}"
echo -e "${GREEN}Default admin credentials:${NC}"
echo -e "${YELLOW}Username: superadmin${NC}"
echo -e "${YELLOW}Password: superadmin123${NC}"

echo -e "\n${YELLOW}Important notes:${NC}"
echo "1. The Vendure server may take a few minutes to fully initialize"
echo "2. On first run, sample data will be automatically populated"
echo "3. To view logs, use: docker-compose logs"
echo "4. To stop services, use: docker-compose down"
echo "5. To start services again, use: docker-compose up -d"

# Add helpful aliases to .bashrc
echo -e "\n${YELLOW}Adding helpful aliases to .bashrc...${NC}"
cat >> ~/.bashrc << EOF
alias lovable-logs='docker-compose logs -f'
alias lovable-restart='docker-compose restart'
alias lovable-stop='docker-compose down'
alias lovable-start='docker-compose up -d'
EOF

echo -e "${GREEN}Setup complete! Please log out and back in for aliases to take effect.${NC}"