# Real-Time Dashboard

A full-stack application featuring a real-time dashboard that displays data through multiple communication methods (WebSocket and REST API).

## Live Demo Links

- Frontend: [https://dashboard-frontend-latest-a2vg.onrender.com/](https://dashboard-frontend-latest-a2vg.onrender.com/)
- Backend: [https://dashboard-backend-latest.onrender.com](https://dashboard-backend-latest.onrender.com)

> **Note**: While the Docker setup and Render deployment are working fine, the CI/CD automation is currently in progress. Manual deployments are being used temporarily.

## Features

### Frontend (React.js)

- Responsive dashboard interface for both desktop and mobile devices
- Real-time data section with WebSocket updates
- Historical data section using REST API polling (30-second intervals)
- Toggle between WebSocket and polling data retrieval methods
- Modern React practices (functional components, hooks)
- Beautiful UI with Tailwind CSS and Radix UI components

### Backend (Node.js)

- WebSocket server sending system metrics every 5 seconds
- REST API endpoints for current and historical data
  - `/api/metrics` - Get current metrics
  - `/api/historical/:timeRange` - Get historical data (1h, 6h, 24h, 7d, 30d)
  - `/health` - Health check endpoint
- Metrics tracked:
  - CPU Usage (%)
  - Memory Usage (MB)
  - Network In/Out (Mbps)
  - Disk I/O (MB/s)
  - Response Time (ms)
  - Error Rate (%)
  - Requests (req/s)
- Error handling and logging
- Configurable update intervals

### Docker Implementation

- Multi-stage Dockerfile for optimized builds
- Docker Compose setup for easy deployment
- Nginx reverse proxy configuration
- Container communication and networking

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Radix UI, Recharts
- **Backend**: Node.js, Express, WebSocket (ws), CORS
- **Containerization**: Docker, Docker Compose
- **Other Tools**: Nginx (reverse proxy)

## Getting Started

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### Running with Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/JiyauddinSaiyad/real-time-dashboard-ss.git
   cd real-time-dashboard
   ```

2. Start the application:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:8080 (Development)
   - Backend API: http://localhost:3001
   - WebSocket: ws://localhost:3001

### Local Development

1. Install frontend dependencies:

   ```bash
   npm install
   ```

2. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Start the development servers:

   ```bash
   # Terminal 1 - Frontend
   npm run dev

   # Terminal 2 - Backend
   cd server
   npm run dev
   ```

## Implementation Details

### Frontend Architecture

- Custom hooks for data management (`useWebSocket`, `usePolling`)
- Responsive design using Tailwind CSS
- Component-based architecture with proper separation of concerns
- Error boundaries and loading states
- Theme support (light/dark mode)

### Backend Architecture

- WebSocket server for real-time metrics updates (5-second intervals)
- REST API endpoints for current and historical data
- Configurable time ranges for historical data:
  - 1 hour (60 data points)
  - 6 hours (72 data points)
  - 24 hours (96 data points)
  - 7 days (56 data points)
  - 30 days (60 data points)
- Error handling middleware
- CORS enabled for development
- Mock data generation with realistic patterns

### Docker Configuration

- Multi-stage builds for smaller image sizes
- Nginx reverse proxy for routing
- Volume mounts for development
- Environment variable configuration

## AI Tools Usage and Development Process

This project was developed with a combination of manual implementation and AI assistance. Here's a transparent breakdown of AI tool usage and personal contributions:

### Planning and Design Phase

1. **Business Requirements Document (BRD)**

   - Tool: ChatGPT
   - Usage: Generated initial BRD based on provided requirements
   - Outcome: Clear project scope and requirements documentation

2. **Design Inspiration and Research**
   - Tool: Perplexity AI
   - Usage: Research on dashboard design patterns and best practices
   - Reference: [Snowul Dashboard Design](https://www.figma.com/community/file/1436048774299043413/snowul-dashboard-app-projects-ecommerce-order-user-admin-mobile-dashboard)

### Development Phase

1. **Project Setup**

   - Tool: Cursor IDE
   - Usage: Initial Vite project setup and folder structure creation
   - Scope: Basic project scaffolding and configuration files

2. **Frontend Development**

   - **Personal Implementation**:

     - Component architecture and implementation
     - UI/UX design and implementation
     - Dashboard layout and responsiveness
     - Data visualization components

   - **AI Assistance (Cursor)**:
     - Debugging support
     - Error resolution
     - Code optimization suggestions

3. **Backend Development**

   - **Personal Implementation**:

     - Server architecture
     - WebSocket implementation
     - REST API endpoints
     - Data generation logic

   - **AI Assistance**:
     - Tool: Cursor IDE and ChatGPT
     - Usage: Error debugging and troubleshooting
     - Scope: Code quality improvements and bug fixes

### Code Quality and Documentation

1. **Error Resolution**

   - Tools: Cursor IDE, ChatGPT
   - Usage: Identifying and fixing code issues
   - Scope: Runtime errors, type errors, and edge cases

2. **Documentation**
   - Tools: ChatGPT
   - Usage: README and technical documentation generation
   - Scope: Setup instructions and implementation details

### Summary of Personal Contributions

- Complete UI/UX design implementation
- Frontend component architecture and development
- Backend server implementation
- WebSocket and REST API integration
- Data visualization and real-time updates
- Responsive design implementation
- Docker configuration and setup

The AI tools were primarily used for:

- Initial project planning
- Design research and inspiration
- Development environment setup
- Error resolution and debugging
- Documentation assistance

## Limitations and Future Improvements

- Currently using mock data generation instead of real system metrics
- WebSocket reconnection could be more robust
- Could implement real data collection from system metrics
- Add authentication and user management
- Implement data persistence
- Add more comprehensive error handling
- Implement unit and integration tests
