# Welcome to your Lovable project

## Quick Start for Raspberry Pi

1. Make the Raspberry Pi installation script executable:
```bash
chmod +x install-raspberry-pi.sh
```

2. Run the installation script:
```bash
./install-raspberry-pi.sh
```

The script will:
- Check system requirements
- Install necessary dependencies (Docker, Node.js, etc.)
- Configure the environment
- Start the application

## System Requirements

- Raspberry Pi 5 (recommended)
- Raspberry Pi OS 64-bit
- Minimum 4GB RAM (8GB recommended)
- 10GB+ free disk space
- Internet connection

## Project info

**URL**: https://lovable.dev/projects/7602ddcd-ea85-48db-9d8f-cd1989a8d238

## Accessing the Application

After installation, you can access:
- Frontend: http://localhost:8080
- Medusa Admin: http://localhost:9000/admin

Or using your Raspberry Pi's IP address:
- Frontend: http://[YOUR_PI_IP]:8080
- Medusa Admin: http://[YOUR_PI_IP]:9000/admin

## Maintenance

Common commands:
```bash
# View logs
docker-compose logs

# Stop application
docker-compose down

# Start application
docker-compose up -d

# Restart application
docker-compose restart
```