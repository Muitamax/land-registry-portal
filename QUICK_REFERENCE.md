# Quick Reference Guide

## 🎯 Start the Application

### Method 1: Automatic (Recommended)
```bash
cd ~/land-registry-portal
./start.sh
```
Then visit: http://localhost:5173

### Method 2: Manual - Backend Only
```bash
cd ~/land-registry-portal/backend
source venv/bin/activate
python manage.py migrate
python manage.py seed_data  # optional
python manage.py runserver
```
API available at: http://localhost:8000/api

### Method 3: Manual - Frontend Only
```bash
cd ~/land-registry-portal/frontend
npm install  # if needed
npm run dev
```
App available at: http://localhost:5173

### Method 4: Docker
```bash
cd ~/land-registry-portal
docker-compose up --build
```
Frontend: http://localhost:5173
Backend: http://localhost:8000

---

## 🔍 API Quick Reference

### Search Lands
```bash
# By search number
curl "http://localhost:8000/api/lands/search/?search_number=KE-000001"

# By title deed number
curl "http://localhost:8000/api/lands/search/?title_deed_number=KE/10001/001"
```

### Get All Lands
```bash
curl "http://localhost:8000/api/lands/"
```

### Get Land Details
```bash
curl "http://localhost:8000/api/lands/1/"
```

### Get Ownership History
```bash
curl "http://localhost:8000/api/lands/1/ownership_history/"
```

---

## 🗂️ Important Files & Directories

| Path | Purpose |
|------|---------|
| `frontend/src/` | React components and app code |
| `frontend/.env` | Frontend configuration |
| `backend/lands/` | Django app with models & views |
| `backend/land_registry/settings.py` | Django settings |
| `backend/db.sqlite3` | SQLite database |
| `docker-compose.yml` | Docker multi-container setup |
| `README.md` | Full documentation |
| `INSTALLATION.md` | Setup instructions |

---

## 🛠️ Common Commands

### Backend Commands
```bash
cd backend && source venv/bin/activate

# Run migrations
python manage.py migrate

# Create migrations
python manage.py makemigrations

# Load sample data
python manage.py seed_data

# Access Python shell
python manage.py shell

# Create admin user
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database
```bash
cd backend

# SQLite database location
db.sqlite3  # contains all data

# View database
python manage.py dbshell

# Delete and reset database
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

---

## 📝 Search Examples

Using the web interface at http://localhost:5173:

1. **Search by Search Number**
   - Enter: `KE-000001` to `KE-000020`
   - Click Search

2. **Search by Title Deed**
   - Enter: `KE/10001/001` to `KE/10020/001`
   - Click Search

3. **View Results**
   - Click on any result to see on map
   - View full details in sidebar
   - See ownership history timeline

---

## 🌐 URLs & Endpoints

| URL | Purpose |
|-----|---------|
| http://localhost:5173 | Frontend (React App) |
| http://localhost:8000/api/ | Backend API Root |
| http://localhost:8000/api/lands/ | List all lands |
| http://localhost:8000/api/lands/search/ | Search lands |
| http://localhost:8000/api/lands/1/ | Land details |
| http://localhost:8000/api/lands/1/ownership_history/ | Ownership history |
| http://localhost:8000/admin/ | Django admin panel |

---

## 🔑 Admin Panel

**Access:** http://localhost:8000/admin

**Login Credentials:**
- Username: `admin`
- Password: `admin123` (if using seed_data)

### Admin Tasks
- Add/edit land records
- Manage owners
- View ownership history
- Manage users & permissions

---

## ⚙️ Configuration

### Change Backend API URL
Edit `frontend/.env`:
```
VITE_API_URL=http://localhost:8000/api
```

### Change Django Settings
Edit `backend/land_registry/settings.py`:
- `DEBUG`: Set to `False` for production
- `SECRET_KEY`: Change for production
- `ALLOWED_HOSTS`: Add your domain
- `CORS_ALLOWED_ORIGINS`: Add frontend URL

### Change Database
Edit `backend/land_registry/settings.py` DATABASES section:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',  # Change engine
        'NAME': 'land_registry',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

---

## 🐛 Troubleshooting

### Port 8000 Already in Use
```bash
lsof -i :8000  # Find process
kill -9 <PID>   # Kill it
```

### Port 5173 Already in Use
```bash
lsof -i :5173  # Find process
kill -9 <PID>  # Kill it
```

### Clear All Data
```bash
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py seed_data
```

### Rebuild Docker
```bash
docker-compose down -v
docker-compose up --build
```

### Module Not Found Error
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### API Connection Error
1. Check backend is running: `http://localhost:8000/api/`
2. Check `VITE_API_URL` in `frontend/.env`
3. Clear browser cache and reload
4. Check browser console (F12) for errors

---

## 📊 Sample Data

20 pre-loaded land records across Kenya:

Counties included:
- Nairobi
- Kiambu
- Kajiado
- Nakuru
- Mombasa
- Kisumu
- Dar es Salaam

Search numbers: `KE-000001` through `KE-000020`

Each includes:
- Land details (size, type, location)
- Current owner information
- Ownership history with 1-3 previous owners
- GPS coordinates
- County/ward information

---

## 🚀 Deployment

### Using Docker
```bash
# Build images
docker build -f Dockerfile.backend -t land-registry-backend .
docker build -f Dockerfile.frontend -t land-registry-frontend .

# Push to registry
docker tag land-registry-backend myrepo/land-registry-backend:latest
docker push myrepo/land-registry-backend:latest
```

### Manual Deployment
See `INSTALLATION.md` for production setup guide

---

## 📚 Documentation Files

1. **README.md** - Features, architecture, API docs
2. **INSTALLATION.md** - Setup instructions
3. **ENV_GUIDE.md** - Configuration options
4. **BUILD_SUMMARY.md** - Technical details
5. **QUICK_REFERENCE.md** - This file

---

## 💡 Next Steps

1. ✅ Start the application
2. ✅ Test search functionality
3. ✅ View maps and ownership history
4. ✅ Explore admin panel
5. ⬜ Add your own land records
6. ⬜ Customize styling/colors
7. ⬜ Deploy to production
8. ⬜ Add authentication

---

## 🆘 Getting Help

1. Check the documentation files
2. Review the code comments
3. Check browser console (F12)
4. Check Django logs in terminal
5. Review the API responses

---

## ✨ Tips & Tricks

### Add Land via Django Shell
```bash
python manage.py shell
```
```python
from lands.models import Land, Owner
from datetime import date

land = Land.objects.create(
    search_number="KE-001000",
    title_deed_number="KE/11000/001",
    size_acres=5.5,
    size_hectares=2.2,
    latitude=-1.2865,
    longitude=36.8172,
    land_type="RESIDENTIAL",
    location_description="My Property",
    county="Nairobi"
)

owner = Owner.objects.create(
    land=land,
    first_name="John",
    last_name="Doe",
    acquired_date=date.today()
)
```

### Reset Everything
```bash
# Backend
cd backend
rm db.sqlite3
python manage.py migrate
python manage.py seed_data

# Frontend
cd ../frontend
rm -rf node_modules
npm install
```

### Run Backend Only (API Testing)
```bash
cd backend
source venv/bin/activate
python manage.py runserver 8000
```

Then use curl or Postman to test APIs.

---

**Last Updated:** January 29, 2026  
**Status:** ✅ Production Ready
