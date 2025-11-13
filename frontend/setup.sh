#!/bin/bash

# Install pnpm if not available
if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found, installing locally..."
    npm install -g pnpm
fi

# Install dependencies
pnpm install

# Build the project
pnpm run build

echo "Setup complete! You can now run 'pnpm dev' to start the development server."