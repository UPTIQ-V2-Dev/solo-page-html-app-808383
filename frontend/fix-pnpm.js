#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing PNPM issue...');

try {
  // Check if pnpm is available
  execSync('pnpm --version', { stdio: 'ignore' });
  console.log('✅ PNPM is already available');
} catch (error) {
  console.log('❌ PNPM not found, attempting fixes...');
  
  // Method 1: Try to install pnpm locally
  try {
    console.log('📦 Installing pnpm as dev dependency...');
    execSync('npm install --save-dev pnpm', { stdio: 'inherit' });
    console.log('✅ PNPM installed locally');
    
    // Try to use local pnpm
    execSync('npx pnpm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed with local pnpm');
    
  } catch (installError) {
    console.log('⚠️ Local pnpm installation failed, using npm instead...');
    
    // Method 2: Use npm instead
    try {
      // Remove pnpm-lock.yaml
      const lockFile = path.join(process.cwd(), 'pnpm-lock.yaml');
      if (fs.existsSync(lockFile)) {
        fs.unlinkSync(lockFile);
        console.log('🗑️ Removed pnpm-lock.yaml');
      }
      
      // Install with npm
      execSync('npm install', { stdio: 'inherit' });
      console.log('✅ Dependencies installed with npm');
      
    } catch (npmError) {
      console.error('❌ All methods failed. Please manually install pnpm:');
      console.error('   npm install -g pnpm');
      process.exit(1);
    }
  }
}

console.log('🎉 Setup complete! You can now run your application.');
console.log('💡 Available commands:');
console.log('   npm run dev    - Start development server');
console.log('   npm run build  - Build for production');
console.log('   npx pnpm dev   - Use pnpm via npx');