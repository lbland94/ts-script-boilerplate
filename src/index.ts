#!/usr/bin/env node
import Getopt from 'node-getopt';
import { RuntimeOptions } from './RuntimeOptions';
import { ConfigService } from './config/Config';
import colors from 'colors';
import packageJson from '../package.json';

colors.america;

// Parse runtime options
const cmdOpts = Getopt.create([
  ['l', 'exampleList=ARG+', 'List example'],
  ['C', 'config=ARG', 'Config file'],
])
  .bindHelp(`Usage: ${Object.keys(packageJson.bin)[0]}\n\n[[OPTIONS]]\n\nConfig:\n\nDefault config is looking for ` +
            `~/.config/${packageJson.name}/config.json.`.yellow + `\nAn example config is generated at ` +
            `~/.config/${packageJson.name}/config.example.json.\n`.green)
  .parseSystem();
const runtimeOpts = new RuntimeOptions(cmdOpts.options);

const config = ConfigService.getInstance(runtimeOpts.config).config;

(async () => {
})().then(() => {
}).catch(() => {
});
