@echo off
echo ------------------
echo Deleting Django DB
echo ------------------

REM Delete the database file
if exist db.sqlite3 (
    del db.sqlite3
    echo Deleted db.sqlite3
) else (
    echo db.sqlite3 not found
)

REM Delete migration files for each app
set apps=users gamification materials

for %%A in (%apps%) do (
    echo Cleaning migrations for app: %%A
    del /Q %%A\migrations\*.py
    del /Q %%A\migrations\__pycache__\*.pyc
    echo Removed migration files from %%A\migrations
    REM Recreate init file if needed
    if not exist %%A\migrations\__init__.py (
        echo. > %%A\migrations\__init__.py
    )
)