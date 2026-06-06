#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { projectName, brandName, language, isTs, targetDir, args, rl, withShadcn, getArg, prompt, toPackageName, toSafeTitle, framework } from "../args.js"
import { LoginPage } from '../screens/LoginPage.js';
import { DashboardPage } from '../screens/DashboardPage.js';
import { HomePage } from '../screens/HomePage.js';
import { tsconfig } from '../ts-files/tsconfig.js';
import { authContext } from '../contexts/authContext.js';
import { Main } from '../source-files/main.js';
import { App } from '../source-files/app.js';
import { Header } from '../components/layout/header.js';
import { shadcnFiles } from '../shadcn-files/component.js';
import { vite } from '../common-files/vite.js';


function ensureEmptyDir(targetDir) {
  if (!fs.existsSync(targetDir)) return;
  const files = fs.readdirSync(targetDir);
  if (files.length > 0) {
    throw new Error(`Target directory is not empty: ${targetDir}`);
  }
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trimStart(), 'utf8');
}

const commonFiles = () => framework === 'react' ? vite : {};

function sourceFiles({ isTs }) {
  const ext = isTs ? 'tsx' : 'jsx';
  return  framework === 'react' ? {
    [`src/main.${ext}`]:Main ,
    [`src/App.${ext}`]: App,
    [`src/components/layout/Header.${ext}`]: Header,
    [`src/auth/AuthContext.${ext}`]: authContext,
    [`src/pages/HomePage.${ext}`]:HomePage,
    [`src/pages/LoginPage.${ext}`]: LoginPage,
    [`src/pages/DashboardPage.${ext}`]:DashboardPage,
  } 
  : {};
}

function tsFiles() {
  return {
    'tsconfig.json':tsconfig ,
  };
}

async function main() {
  try {

    ensureEmptyDir(targetDir);
    fs.mkdirSync(targetDir, { recursive: true });

    const files = {
      ...commonFiles(),
      ...sourceFiles({ isTs }),
      ...(withShadcn ? shadcnFiles() : {}),
      ...(isTs ? tsFiles() : {}),
    };

    Object.entries(files).forEach(([relativePath, content]) => {
      writeFile(path.join(targetDir, relativePath), content);
    });

    console.log(`\nCreated ${projectName} successfully.\n`);
    console.log('Next steps:');
    console.log(`  cd ${projectName}`);
    console.log('  npm install');
    console.log('  npm run dev\n');
  } catch (error) {
    console.error(`\nError: ${error.message}\n`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
