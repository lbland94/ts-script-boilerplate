import { CONFIG_FILE, ConfigService } from './config/Config';
import flattenDeep from 'lodash/flattenDeep';

/**
 * Convenience class to provide strict typing and reliable defaults for our command line arguments. To add an argument,
 * add a public variable to this class with the same name as the long name passed in to `node-getopt`.
 */
export class RuntimeOptions {
  public exampleList = ['default1', 'default2'];
  public config = CONFIG_FILE;
  private configService: ConfigService;

  private transformers = {
    // Example transformer to allow passing lists as comma separated strings
    exampleList: (value: string[]) => flattenDeep(value.map(value => {
      value = value.toUpperCase();
      if (value.indexOf(',') > -1) return value.split(',');
      return value;
    })),
  };

  /**
   * @param options - Variable passed in from output of `node-getopt` parsing.
   */
  constructor(options: {[index: string]: string | string[] | boolean}) {
    for (const key in options) {
      if (this[key] !== undefined && options[key] !== undefined) {
        if (this.transformers[key] !== undefined) {
          this[key] = this.transformers[key](options[key]);
        } else if (typeof this[key] === 'number' && typeof options[key] === 'string' && options[key] !== ''
            && !isNaN(+options[key])) {
          this[key] = +options[key];
        } else if (typeof this[key] === 'string' && typeof options[key] === 'string') {
          this[key] = options[key];
        } else if (typeof this[key] === 'boolean' && typeof options[key] === 'boolean') {
          this[key] = options[key];
        } else if (typeof this[key] === 'object' && typeof options[key] === 'object') {
          this[key] = options[key];
        }
      }
    }
    this.configService = ConfigService.getInstance(this.config);
  }
}
