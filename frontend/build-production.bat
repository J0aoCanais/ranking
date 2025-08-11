@echo off
echo 🚀 Building for production...

REM Copiar variáveis de ambiente de produção
if exist .env.production (
    copy .env.production .env
    echo ✅ Environment variables loaded from .env.production
) else (
    echo ⚠️ No .env.production file found
)

REM Instalar dependências se necessário
if not exist node_modules (
    echo 📦 Installing dependencies...
    npm install
)

REM Build da aplicação
echo 🔧 Building application...
npm run build

REM Verificar se o build foi bem sucedido
if exist dist (
    echo ✅ Build completed successfully!
    echo 📁 Build output in dist/ folder
    
    REM Copiar CNAME se existir
    if exist ..\CNAME (
        copy ..\CNAME dist\CNAME
        echo ✅ CNAME copied to dist/
    )
    
    echo.
    echo 🌐 Ready for deployment!
    echo 📝 Files in dist/:
    dir dist /b
) else (
    echo ❌ Build failed!
    exit /b 1
)

pause
