# Capacitor Task Manager App - Complete Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- Android Studio installed
- Java JDK 11 or higher

## Step 1: Project Setup

```bash
# Create project directory
mkdir task-manager-app
cd task-manager-app

# Initialize npm project
npm init -y

# Install Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor (answer the prompts)
npx cap init
# App name: Task Manager
# Package ID: com.example.taskmanager
# Web asset directory: www
```

## Step 2: Create Project Structure

Create the following folder structure:
```
task-manager-app/
├── www/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── app.js
├── package.json
└── capacitor.config.json
```

## Step 3: Add Files

Copy the HTML, CSS, and JavaScript files from the artifacts provided.

Place them in:
- `www/index.html`
- `www/css/style.css`
- `www/js/app.js`

## Step 4: Configure Capacitor

Edit `capacitor.config.json`:
```json
{
  "appId": "com.example.taskmanager",
  "appName": "Task Manager",
  "webDir": "www",
  "bundledWebRuntime": false,
  "android": {
    "minWebViewVersion": 55
  }
}
```

## Step 5: Add Android Platform

```bash
# Add Android platform
npx cap add android

# Copy web assets to Android
npx cap copy android

# Sync project
npx cap sync android
```

## Step 6: Open in Android Studio

```bash
npx cap open android
```

This will open Android Studio. Wait for Gradle to finish building.

## Step 7: Run the App

In Android Studio:
1. Select a device (emulator or physical tablet)
2. Click the green "Run" button (or press Shift+F10)
3. Wait for the app to install and launch

## Step 8: Making Changes

After modifying HTML/CSS/JS files:
```bash
# Copy changes to Android
npx cap copy android

# Then re-run from Android Studio
```

## Troubleshooting

**Gradle build fails:**
- Ensure JAVA_HOME is set correctly
- Check Android Studio SDK is installed

**App doesn't update:**
- Run `npx cap sync android` instead of just `copy`
- In Android Studio: Build > Clean Project, then rebuild

**Emulator issues:**
- Create a new AVD (Android Virtual Device) with API level 29+
- Ensure emulator has enough RAM allocated (4GB recommended)

## Next Steps

1. Test the app on both emulator and physical tablet
2. Explore Capacitor plugins: `npm install @capacitor/camera`
3. Add icons and splash screens
4. Build release APK for distribution

## Building Release APK

```bash
# In Android Studio:
# Build > Generate Signed Bundle / APK
# Follow the wizard to create a keystore and sign your app
```

Your APK will be in: `android/app/build/outputs/apk/release/`