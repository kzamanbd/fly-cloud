#!/bin/bash

set -e

CLI_NAME="fly"
INSTALL_DIR="/usr/local/bin"
REPO_URL="https://github.com/kzamanbd/fly-cli/releases/download/v1.0.0"

# Determine the operating system
OS="$(uname -s)"
case "$OS" in
    Linux*)     MACHINE=linux;;
    Darwin*)    MACHINE=mac;;
    *)          echo "Unsupported OS: $OS" && exit 1
esac

# Download the appropriate binary
if [ "$MACHINE" == "linux" ]; then
    curl -L -o $CLI_NAME "$REPO_URL/fly-linux"
    elif [ "$MACHINE" == "mac" ]; then
    curl -L -o $CLI_NAME "$REPO_URL/fly-mac"
fi

# Make it executable
chmod +x $CLI_NAME

# Move to the install directory
sudo mv $CLI_NAME $INSTALL_DIR

echo "$CLI_NAME installed successfully to $INSTALL_DIR"
