@echo off
title METROTUNE DRUM MACHINE - BROWSER MODE
echo ===================================================================
echo   Starting Local Audio Server & Browser App
echo ===================================================================

cd /d "%~dp0"

start "Drum Machine Audio Server" /b node "%~dp0server.js"
timeout /t 1 /nobreak >nul

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required
    exit /b
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required
    exit /b
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required
    exit /b
)

start "" "http://127.0.0.1:8484/"
exit /b
