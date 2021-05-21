import {LeappBaseError} from './leapp-base-error';
import {LoggerLevel} from '../services/app.service';

export class LeappAwsStsError extends LeappBaseError {
  constructor(context: any, message?: string) {
    super('Leapp Aws Sts Error', context, LoggerLevel.warn, message);
  }
}
