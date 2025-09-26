#!/bin/bash

# KJ Financial Website Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Help function
show_help() {
    echo "KJ Financial Website Docker Management Script"
    echo ""
    echo "Usage: ./docker-scripts.sh [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  build       Build the Docker images"
    echo "  stop        Stop all containers"
    echo "  clean       Remove containers and images"
    echo "  logs        Show container logs"
    echo "  shell       Access container shell (development)"
    echo "  health      Check container health"
    echo "  help        Show this help message"
}

# Build Docker images
build_images() {
    print_status "Building Docker images..."
    docker-compose build
    print_success "Docker images built successfully!"
}

# Start development environment
start_dev() {
    print_status "Starting development environment..."
    docker-compose up -d kj-website-dev
    print_success "Development environment started!"
    print_status "Website available at: http://localhost:3001"
}

# Start production environment
start_prod() {
    print_status "Starting production environment..."
    docker-compose up -d kj-website-prod
    print_success "Production environment started!"
    print_status "Website available at: http://localhost:8080"
}

# Stop containers
stop_containers() {
    print_status "Stopping containers..."
    docker-compose down
    print_success "Containers stopped!"
}

# Clean up containers and images
clean_up() {
    print_status "Cleaning up containers and images..."
    docker-compose down --rmi all --volumes --remove-orphans
    print_success "Cleanup completed!"
}

# Show logs
show_logs() {
    if [ "$2" = "prod" ]; then
        print_status "Showing production logs..."
        docker-compose logs -f kj-website-prod
    else
        print_status "Showing development logs..."
        docker-compose logs -f kj-website-dev
    fi
}

# Access shell
access_shell() {
    print_status "Accessing development container shell..."
    docker-compose exec kj-website-dev /bin/sh
}

# Health check
health_check() {
    print_status "Checking container health..."
    
    # Check if containers are running
    if docker-compose ps | grep -q "Up"; then
        print_success "Containers are running!"
        
        # Check development endpoint
        if curl -s http://localhost:3001 > /dev/null; then
            print_success "Development server is healthy (http://localhost:3001)"
        else
            print_warning "Development server is not responding"
        fi
        
        # Check production endpoint
        if curl -s http://localhost:8080/health > /dev/null; then
            print_success "Production server is healthy (http://localhost:8080)"
        else
            print_warning "Production server is not responding"
        fi
    else
        print_error "No containers are running"
    fi
}

# Main script logic
case "$1" in
    "dev")
        build_images
        start_dev
        ;;
    "prod")
        build_images
        start_prod
        ;;
    "build")
        build_images
        ;;
    "stop")
        stop_containers
        ;;
    "clean")
        clean_up
        ;;
    "logs")
        show_logs "$@"
        ;;
    "shell")
        access_shell
        ;;
    "health")
        health_check
        ;;
    "help"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac