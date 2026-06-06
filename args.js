#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {select, text, confirm} from "@clack/prompts"


const rl = readline.createInterface({ input, output });

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.findIndex((arg) => arg === `--${name}` || arg.startsWith(`--${name}=`));
  if (index === -1) return undefined;
  const value = args[index].includes('=') ? args[index].split('=').slice(1).join('=') : args[index + 1];
  return value && !value.startsWith('--') ? value : true;
};

const toPackageName = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my-vite-app';

const toSafeTitle = (value) => value.trim() || 'My Brand';

async function prompt(message, fallback) {
  // const answer = await rl.question(`${message}${fallback ? ` (${fallback})` : ''}: `);
  // return answer.trim() || fallback;
  const answer = await text({
    message,
    placeholder: fallback,
  });
  return answer.trim() || fallback;
}

async function selectFramework() {
  const passed = getArg('framework') || "";
  if (passed.includes('react') || passed.includes('vite')) return 'react';
  if (passed.includes("express") || passed.includes('node')) return 'express';

  const answer = await select({
    message: 'Select a framework',
    options: [
      { value: 'react', label: 'React with Vite' },
      // { value: 'express', label: 'Express.js' },
    ],
  });
  return answer;
}

async function selectLanguage() {
  const passed = getArg('template') || getArg('language');
  if (passed === 'js' || passed === 'javascript') return 'js';
  if (passed === 'ts' || passed === 'typescript') return 'ts';

  // const answer = await prompt('Choose language: JavaScript or TypeScript? [js/ts]', 'ts');
  const answer = await select({
    message: 'Select a language',
    options: [
      { value: 'js', label: 'JavaScript' },
      { value: 'ts', label: 'TypeScript' },
    ],
  });
  return answer;
}


async function selectShadcn() {
  const passed = getArg('shadcn');

  if (passed === true) return true;
  if (passed === 'true' || passed === 'yes' || passed === 'y') return true;
  if (passed === 'false' || passed === 'no' || passed === 'n') return false;

  const answer = await confirm({
    message: 'Include shadcn/ui components?',
    defaultValue: true,
  });
  return answer;
}

const projectNameArg = args[0] && !args[0].startsWith('--') ? args[0] : undefined;
    const projectName = toPackageName(projectNameArg || await prompt('Project name', 'my-vite-app'));
    const brandName = toSafeTitle(getArg('brand') || await prompt('Brand name to render on home page', 'My Brand'));
    const language = await selectLanguage();
    const framework = await selectFramework();

    const withShadcn = (framework === 'react' || framework === "next") && await selectShadcn();
    const isTs = language === 'ts';
    const targetDir = path.resolve(process.cwd(), projectName);
    export { projectName, brandName, language, isTs, targetDir, getArg, prompt, toPackageName, toSafeTitle, rl, args, framework, withShadcn };