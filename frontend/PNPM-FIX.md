# 🔧 PNPM Issue Fix Guide

## Error: spawn pnpm ENOENT

This error means pnpm is not installed on your system. Here are **6 proven solutions**:

## 🚀 Quick Fixes (Choose One)

### 1. ⚡ Automatic Fix (BEST)
```bash
npm run fix-pnpm
```
**What it does:** Automatically detects and fixes pnpm issues using multiple fallback methods.

### 2. 📦 Simple Setup
```bash
npm run setup
```
**What it does:** Installs with npm and builds the project.

### 3. 🔄 Use npx
```bash
npm run pnpm:install
npm run pnpm:build  
npm run pnpm:dev
```
**What it does:** Uses pnpm via npx without global installation.

### 4. 🌍 Global Install
```bash
npm install -g pnpm
pnpm install
```
**What it does:** Installs pnpm globally (requires admin rights).

### 5. 📝 Use npm Instead
```bash
rm pnpm-lock.yaml
npm install
npm run build
```
**What it does:** Switches to npm package manager.

### 6. 🧶 Use Yarn Instead  
```bash
rm pnpm-lock.yaml
yarn install
yarn build
```
**What it does:** Switches to yarn package manager.

## ✅ Verification

After running any fix, verify it worked:
```bash
npm run build  # Should build successfully
npm run dev    # Should start dev server
```

## 🆘 Still Having Issues?

1. Clear node_modules: `rm -rf node_modules`
2. Clear package locks: `rm -f pnpm-lock.yaml package-lock.json yarn.lock`  
3. Run: `npm run fix-pnpm`

## 📞 Support

If none of these solutions work, the issue might be:
- Network/firewall blocking npm registry
- Corrupted npm cache: `npm cache clean --force`
- Node.js version incompatibility