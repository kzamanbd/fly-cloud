#!/bin/bash

# Build for Windows
echo "Building for Windows..."
GOOS=windows GOARCH=amd64 go build -o bin/fly.exe

if [ $? -ne 0 ]; then
    echo "An error has occurred! Aborting the script execution for windows..."
    exit 1
fi

# Build for macOS
echo "Building for macOS..."
GOOS=darwin GOARCH=amd64 go build -o bin/fly-mac

if [ $? -ne 0 ]; then
    echo "An error has occurred! Aborting the script execution for macOS..."
    exit 1
fi

# Build for Linux
echo "Building for Linux..."
GOOS=linux GOARCH=amd64 go build -o bin/fly-linux

if [ $? -ne 0 ]; then
    echo "An error has occurred! Aborting the script execution for linux..."
    exit 1
fi

echo "Build completed!"
