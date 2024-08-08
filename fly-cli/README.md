# Fly CLI - Docker Compose Simplified

Fly CLI is a tool to manage Docker containers using Docker Compose commands. It simplifies the common operations needed to start, stop, and view logs for your Docker containers.

## Features

- `fly up`: Starts Docker containers defined in the Docker Compose file.
- `fly down`: Stops and removes Docker containers defined in the Docker Compose file.
- `fly logs`: Displays logs from Docker containers defined in the Docker Compose file.
- `fly --help`: Provides help texts and usage instructions for the CLI tool.

## Installation

### macOS and Linux

1. Download and run the install script:

    ```sh
    curl -L -o install.sh https://github.com/kzamanbd/fly-cli/releases/download/v1.0.0/install.sh
    chmod +x install.sh
    ./install.sh
    ```

2. Verify the installation by running:

    ```sh
    fly --help
    ```

### Windows

1. Download `fly.exe` from [here](https://github.com/kzamanbd/fly-cli/releases/download/v1.0.0/fly.exe).
2. Move `fly.exe` to a directory included in your system's PATH (e.g., `C:\fly-cli`).

3. Add the directory to your PATH:

    - Open the System Properties window (`Win + Pause/Break`).
    - Click on `Advanced system settings`.
    - Click on `Environment Variables`.
    - In the `System variables` section, find the `Path` variable and click `Edit`.
    - Click `New` and add the path to the directory where you placed `fly.exe` (e.g., `C:\fly-cli`).
    - Click `OK` to close all windows.

4. Verify the installation by opening Command Prompt and running:

    ```sh
    fly --help
    ```

## Usage

Use the following commands to manage your Docker containers:

- **Start containers**: `fly up`
- **Stop and remove containers**: `fly down`
- **Show logs**: `fly logs`
- **Help**: `fly --help`

## Contributing

Please feel free to submit issues, fork the repository, and send pull requests! To get started, you can follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/feature-name`).
3. Make changes and commit them (`git commit -am 'Add new feature'`).
4. Push the changes to the new branch (`git push origin feature/feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License.
