# Environment Configuration Guide

## Backend Configuration

### Create `.env` file in `backend/` directory:

```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0
DATABASE_ENGINE=django.db.backends.sqlite3
DATABASE_NAME=db.sqlite3

# For MySQL:
# DATABASE_ENGINE=django.db.backends.mysql
# DATABASE_NAME=land_registry
# DATABASE_USER=root
# DATABASE_PASSWORD=your-password
# DATABASE_HOST=localhost
# DATABASE_PORT=3306

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### settings.py Integration

Add to `land_registry/settings.py`:

```python
from decouple import config

DEBUG = config('DEBUG', default=True, cast=bool)
SECRET_KEY = config('SECRET_KEY', default='insecure-key')
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost', cast=lambda v: [s.strip() for s in v.split(',')])
CORS_ALLOWED_ORIGINS = config('CORS_ALLOWED_ORIGINS', default='', cast=lambda v: [s.strip() for s in v.split(',')] if v else [])

DATABASES = {
    'default': {
        'ENGINE': config('DATABASE_ENGINE', default='django.db.backends.sqlite3'),
        'NAME': config('DATABASE_NAME', default='db.sqlite3'),
        'USER': config('DATABASE_USER', default=''),
        'PASSWORD': config('DATABASE_PASSWORD', default=''),
        'HOST': config('DATABASE_HOST', default='localhost'),
        'PORT': config('DATABASE_PORT', default='3306'),
    }
}
```

## Frontend Configuration

### Create `.env` file in `frontend/` directory:

```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Land Registry Portal
VITE_APP_VERSION=1.0.0
```

### Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_APP_NAME` | Application name | `Land Registry Portal` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |

## Docker Environment

### Docker Compose Override

Create `docker-compose.override.yml` for local development:

```yaml
version: '3.8'

services:
  backend:
    environment:
      DEBUG: "True"
      DJANGO_LOG_LEVEL: DEBUG

  frontend:
    environment:
      VITE_API_URL: http://backend:8000/api
```

## Production Configuration

### Backend Production Settings

```python
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
CSRF_TRUSTED_ORIGINS = ['https://yourdomain.com']
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000
```

### Frontend Production Build

```bash
npm run build
# Serve dist/ folder with web server (Nginx, Apache, etc.)
```

### Database Migration for Production

```bash
# Backup existing database first
# Then run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --no-input
```

## Troubleshooting

### CORS Errors
- Check `CORS_ALLOWED_ORIGINS` in Django settings
- Ensure frontend URL matches allowed origins
- Clear browser cache and retry

### API Connection Failures
- Verify backend is running: `http://localhost:8000/api/`
- Check `VITE_API_URL` in frontend `.env`
- Ensure Django DEBUG mode is appropriate
- Check network tab in browser developer tools

### Database Issues
- Ensure database is running (MySQL if configured)
- Run migrations: `python manage.py migrate`
- Check database credentials in `.env`
- Review Django logs for detailed errors
