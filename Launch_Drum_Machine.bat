@echo off
setlocal enabledelayedexpansion
title METROTUNE DRUM MACHINE WORKSTATION
echo ===================================================================
echo   Launching METROTUNE DRUM MACHINE WORKSTATION
echo ===================================================================

cd /d "%~dp0"

:: 1. Start the High-Speed Streaming Audio Server on Port 8484 in the background
echo [*] Starting Local Audio Server on http://127.0.0.1:8484 ...
start "DrumMachineAudioServer" /min node "%~dp0server.js"

:: Allow server a moment to bind port
ping 127.0.0.1 -n 2 >nul

:: 2. Check if Electron runtime is available from METROTUNE DJ MACHINE
if exist "%~dp0..\METROTUNE DJ MACHINE\node_modules\electron\dist\electron.exe" (
    echo [*] Launching Native Desktop Studio Window...
    start "" "%~dp0..\METROTUNE DJ MACHINE\node_modules\electron\dist\electron.exe" "%~dp0."
    exit /b
)

:: 3. Launch in Microsoft Edge App Mode (Dedicated window without address bar)
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo [*] Launching in Dedicated Edge App Mode...
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required --disable-background-timer-throttling
    exit /b
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    echo [*] Launching in Dedicated Edge App Mode...
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required --disable-background-timer-throttling
    exit /b
)

:: 4. Launch in Google Chrome App Mode
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    echo [*] Launching in Dedicated Chrome App Mode...
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required --disable-background-timer-throttling
    exit /b
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    echo [*] Launching in Dedicated Chrome App Mode...
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="http://127.0.0.1:8484/" --autoplay-policy=no-user-gesture-required --disable-background-timer-throttling
    exit /b
)

:: 5. Default Browser Fallback
echo [*] Opening in Default Web Browser...
start "" "http://127.0.0.1:8484/"
exit /b
