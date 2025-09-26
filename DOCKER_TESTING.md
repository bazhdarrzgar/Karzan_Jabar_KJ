# Docker Setup Testing Guide

## Prerequisites
Ensure you have Docker and Docker Compose installed:
```bash
docker --version
docker-compose --version
```

## Quick Testing Steps

### 1. Test Development Environment
```bash
# Build and start development container
./docker-scripts.sh dev

# Or manually:
docker-compose up -d kj-website-dev

# Check if it's running
curl http://localhost:3001

# View logs
docker-compose logs -f kj-website-dev
```

### 2. Test Production Environment
```bash
# Build and start production container
./docker-scripts.sh prod

# Or manually:
docker-compose up -d kj-website-prod

# Check if it's running
curl http://localhost:8080
curl http://localhost:8080/health

# View logs
docker-compose logs -f kj-website-prod
```

### 3. Test Docker Script Commands
```bash
# Make script executable
chmod +x docker-scripts.sh

# Test all commands
./docker-scripts.sh help
./docker-scripts.sh build
./docker-scripts.sh health
./docker-scripts.sh logs
./docker-scripts.sh shell
./docker-scripts.sh clean
```

## Expected Behavior

### Development Environment (Port 3001)
- Hot reload enabled
- Source maps available
- Volume mounting for real-time code changes
- Node.js development server

### Production Environment (Port 8080)
- Optimized build
- Nginx serving static files
- Gzip compression enabled
- Security headers
- Health check endpoint at `/health`

## Troubleshooting

### Common Issues
1. **Port conflicts**: Make sure ports 3001 and 8080 are free
2. **Permission issues**: Ensure docker-scripts.sh is executable
3. **Build failures**: Check if all dependencies are properly listed in package.json

### Debug Commands
```bash
# Check running containers
docker ps

# Check container logs
docker-compose logs kj-website-dev
docker-compose logs kj-website-prod

# Access container shell
docker-compose exec kj-website-dev /bin/sh

# Clean everything and restart
docker-compose down --rmi all --volumes --remove-orphans
docker-compose build --no-cache
```

## File Structure Verification

Ensure these files exist:
- ✅ Dockerfile
- ✅ docker-compose.yml
- ✅ docker-compose.override.yml
- ✅ nginx.conf
- ✅ .dockerignore
- ✅ docker-scripts.sh (executable)
- ✅ Dockerfile.dev
- ✅ .env.example
- ✅ .env.production
- ✅ .env.development

## Success Criteria
- [ ] Development server starts on localhost:3001
- [ ] Production server starts on localhost:8080  
- [ ] Health check returns 200 at localhost:8080/health
- [ ] Hot reload works in development
- [ ] Static files are served correctly in production
- [ ] Docker scripts execute without errors