import {Account} from './account';
import * as uuid from 'uuid';
import {Type} from 'class-transformer';
import {AwsPlainAccount} from './aws-plain-account';
import {AccountType} from './AccountType';
import {environment} from '../../environments/environment';

export class Session {
  sessionId: string;
  profileId: string;
  startDateTime: string;
  lastStopDateTime: string;
  active: boolean;
  loading: boolean;
  @Type(() => Account, {

    discriminator: {
      property: 'type',
      subTypes: [
        { value: AwsPlainAccount, name: AccountType.AWS_PLAIN_USER},
      ],
    },
  })
  account: Account;

  constructor(account: Account, profileId: string) {
    this.sessionId = uuid.v4();
    this.profileId = profileId;
    this.startDateTime = undefined;
    this.lastStopDateTime = new Date().toISOString();
    this.active = false;
    this.loading = false;
    this.account = account;
  }

  expired(): boolean {
    const currentTime = new Date().getTime();
    const startTime = new Date(this.startDateTime).getTime();
    return (currentTime - startTime) / 1000 > environment.sessionDuration;
  };
}
