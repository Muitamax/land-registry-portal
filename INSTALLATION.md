# Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.10 or higher**: [Download Python](https://www.python.org/downloads/)
- **Node.js 18 or higher**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- (Optional) **Docker & Docker Compose**: [Download Docker](https://www.docker.com/)

### Verify Installation

```bash
python3 --version  # Should show Python 3.10+
node --version     # Should show Node.js 18+
npm --version      # Should show npm 9+
```

---

## Option 1: Quick Start (Recommended for Development)

### Step 1: Clone or Extract the Project

```bash
cd ~/land-registry-portal
# or if cloning from git
git clone <repository-url>
cd land-registry-portal
```

### Step 2: Run the Startup Script

```bash
# On Linux/macOS
./start.sh

# On Windows (use Git Bash or WSL)
bash start.sh
```

The script will automatically:
- Set up Python virtual environment
- Install backend dependencies
- Install frontend dependencies
- Run database migrations
- Seed sample data
- Start both servers

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Admin Panel: http://localhost:8000/admin

---

## Option 2: Manual Setup

### Backend Setup

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create virtual environment
python3 -m venv venv

# 3. Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Create migrations (if needed)
python manage.py makemigrations

# 6. Apply migrations
python manage.py migrate

# 7. Create superuser (optional, for admin access)
python manage.py createsuperuser

# 8. Seed sample data (optional)
python manage.py seed_data

# 9. Start development server
python manage.py runserver

# Backend will be available at http://localhost:8000
```

### Frontend Setup (In a New Terminal)

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create .env file (if not exists)
echo "VITE_API_URL=http://localhost:8000/api" > .env

# 4. Start development server
npm run dev

# Frontend will be available at http://localhost:5173
```

---

## Option 3: Docker Setup

### Using Docker Compose (Recommended for Deployment)

```bash
# 1. Ensure Docker and Docker Compose are installed
docker --version
docker-compose --version

# 2. Build and start containers
docker-compose up --build

# 3. In another terminal, seed initial data (optional)
docker-compose exec backend python manage.py seed_data

# Access the application:
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000
# Admin: http://localhost:8000/admin (admin / admin123)
```

### Stopping Docker Containers

```bash
# Stop containers
docker-compose down

# Remove volumes (data) as well
docker-compose down -v
```

---

## Configuration

### Backend Configuration

Create `backend/.env` file:

```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### Frontend Configuration

Create `frontend/.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## Verify Installation

### Test Backend API

```bash
# Open terminal and run
curl http://localhost:8000/api/lands/

# Should return JSON with land records
```

### Test Search Functionality

```bash
# Search by search number
curl "http://localhost:8000/api/lands/search/?search_number=KE-000001"

# Search by title deed
curl "http://localhost:8000/api/lands/search/?title_deed_number=KE/10001/001"
```

---

## Initial Data

### Seed Sample Data

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py seed_data
```

This creates 20 sample land records across Kenya with:
- Various land types (Residential, Commercial, Agricultural, etc.)
- Current owner information
- Ownership history with transaction types
- Geographic coordinates

### Add Custom Data

```python
from lands.models import Land, Owner, OwnershipHistory
from datetime import date

# Create a land record
land = Land.objects.create(
    search_number="KE-000999",
    title_deed_number="KE/10999/001",
    size_acres=5.5,
    size_hectares=2.2,
    latitude=-1.2865,
    longitude=36.8172,
    land_type="RESIDENTIAL",
    location_description="My Property",
    county="Nairobi"
)

# Create current owner
owner = Owner.objects.create(
    land=land,
    first_name="John",
    last_name="Doe",
    email="john@example.com",
    acquired_date=date.today()
)
```

---

## Troubleshooting

### Issue: Port Already in Use

**Backend (8000 port):**
```bash
# Find process using port 8000
lsof -i :8000
# Kill the process
kill -9 <PID>
```

**Frontend (5173 port):**
```bash
# Find process using port 5173
lsof -i :5173
# Kill the process
kill -9 <PID>
```

### Issue: Module Not Found (Python)

```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Reinstall requirements
pip install -r requirements.txt
```

### Issue: Node Modules Not Found

```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Database Errors

```bash
# Reset database (warning: deletes all data)
rm db.sqlite3
python manage.py migrate

# Re-seed sample data
python manage.py seed_data
```

### Issue: CORS Errors

- Ensure backend is running on `http://localhost:8000`
- Check `CORS_ALLOWED_ORIGINS` in backend settings
- Verify `VITE_API_URL` in frontend `.env`
- Clear browser cache (Ctrl+Shift+Delete)

---

## Development Commands

### Backend

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Run development server
python manage.py runserver

# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Access Django shell
python manage.py shell

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test
```

### Frontend

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter (if configured)
npm run lint
```

---

## Production Deployment

For production deployment, refer to `ENV_GUIDE.md` for:
- Environment configuration
- Security checklist
- Database setup (MySQL)
- Performance optimization
- HTTPS setup
- Deployment options

---

## Next Steps

1. Explore the admin panel: http://localhost:8000/admin
2. Review sample data in the frontend: http://localhost:5173
3. Test search functionality with different search numbers
4. Check API documentation in `README.md`
5. Customize for your needs

---

## Support

For issues or questions:
- Check the troubleshooting section above
- Review Django logs: `backend/` directory
- Check frontend console: Browser Developer Tools
- Review API responses in Network tab

---

Happy Land Searching! 🗺️
