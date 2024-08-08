package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	if len(os.Args) < 2 {
		fmt.Println("usage: fly [up|down|logs|--help|--version] command")
		fmt.Println("Run 'fly --help' for more information.")
		fmt.Println("Available commands: up, down, logs, --help, --version")
		fmt.Println("For more information, visit: https://github.com/kzamanbd/fly-cli")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "up":
		up()
	case "down":
		down()
	case "logs":
		logs()
	case "--help":
		help()
	case "--version":
		version()
	default:
		fmt.Printf("Unknown command: %s\n", os.Args[1])
		fmt.Println("Available commands: up, down, logs, --help")
		os.Exit(1)
	}
}

func up() {
	cmd := exec.Command("docker-compose", "up")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func down() {
	cmd := exec.Command("docker-compose", "down")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func logs() {
	cmd := exec.Command("docker-compose", "logs")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error:", err)
		os.Exit(1)
	}
}

func help() {
	fmt.Println("usage: fly [up|down|logs|--help|--version]")
	fmt.Println("    fly --version  Displays the version of the CLI tool")
	fmt.Println("    fly            Displays details about the application")
	fmt.Println("    fly --help     Provides help texts and usage instructions for the CLI tool")
	fmt.Println("    fly up         Starts Docker containers defined in the Docker Compose file")
	fmt.Println("    fly down       Stops and removes Docker containers defined in the Docker Compose file")
	fmt.Println("    fly logs       Displays logs from Docker containers defined in the Docker Compose file")

	// summary of the application and its commands
	fmt.Println("\nFly is a simple CLI tool for managing Docker containers using Docker Compose.")
}

func version() {
	fmt.Println("fly version 1.0")
	fmt.Println("Fly is a simple CLI tool for managing Docker containers using Docker Compose.")
	fmt.Println("Developed by: Kamruzzaman")
	fmt.Println("Email: kzamanbn@gmail.com")

}