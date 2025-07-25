@echo off
echo -------------------------
echo Running Django Migrations
echo -------------------------

python manage.py makemigrations
if %errorlevel% neq 0 (
    echo Error while running makemigrations
    exit /b %errorlevel%
)

python manage.py migrate
if %errorlevel% neq 0 (
    echo Error while running migrate
    exit /b %errorlevel%
)

echo Migrations completed successfully!