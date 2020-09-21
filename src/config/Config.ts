import path from 'path';
import fs from 'fs';
import os from 'os';
import merge from 'lodash/merge';
import packageJson from '../../package.json';
import { DEFAULT_CONFIG, EXAMPLE_CONFIG } from './defaultConfig';

const DIR = path.join(os.homedir(), '.config', packageJson.name);

if (!fs.existsSync(DIR)) {
  fs.mkdirSync(DIR);
}

export const CONFIG_FILE = path.join(DIR, 'config.json');
const EXAMPLE_CONFIG_FILE = path.join(DIR, 'config.example.json');

if (!fs.existsSync(EXAMPLE_CONFIG_FILE)) {
  try {
    fs.writeFileSync(EXAMPLE_CONFIG_FILE, JSON.stringify(EXAMPLE_CONFIG, null, 2));
  } catch (e) {
    console.log(e);
  }
}

interface IConfig {
  value?: string;
}

export class ConfigService {
  private static instance: ConfigService;
  private configuration: IConfig;
  private configFile: string|undefined;
  private constructor(config: IConfig, configFile?: string) {
    this.configuration = merge(DEFAULT_CONFIG, config);
    this.configFile = configFile;
  }

  public static createInstance(configFile?: string) {
    if (configFile && fs.existsSync(configFile)) {
      try {
        const contents = fs.readFileSync(configFile);
        const jsonContents = JSON.parse(String(contents));
        this.instance = new ConfigService(jsonContents);
      } catch (e) {
        console.error('config parsing error');
      }
    } else {
      this.instance = new ConfigService({});
    }
  }

  public static getInstance(configFile?: string) {
    if (this.instance && this.instance.configFile == configFile) {
      return this.instance;
    } else {
      this.createInstance(configFile);
      return this.instance;
    }
  }

  public get config(): IConfig {
    return this.configuration;
  }
}
