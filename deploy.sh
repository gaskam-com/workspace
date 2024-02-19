@echo off
clear
echo "Deploying..."
echo "Installing bun: "
curl -fsSL https://bun.sh/install | bash
echo "Installing dependencies: "
bun i
echo "Set environment variables: "
bun run deploy