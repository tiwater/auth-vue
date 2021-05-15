import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Logger } from '../utils/logger';
import axios from 'axios';
import { AuthConstants } from './constants';
import { stringify } from 'qs';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  private readonly logger = Logger.createLogger(HttpStrategy.name);

  async validate(token: string) {
    let active = false;
    let client_id = undefined;
    let exp = undefined;

    const encodedData = stringify({ token: token }, { encodeValuesOnly: true });

    await axios({
      method: 'post',
      url: AuthConstants.Issuer + AuthConstants.ValidateMethod,
      auth: {
        username: AuthConstants.ClientId,
        password: AuthConstants.Secret,
      },
      data: encodedData,
    })
      .then((response) => {
        this.logger.debug('Token validated: ', response.data);
        if (response.status == 200) {
          // Checking the data...
          active = response.data['active'];
          client_id = response.data['client_id'];
          exp = response.data['exp'];
          this.logger.debug(
            `Token status - active:${active}, client_id: ${client_id}, exp:${exp}.`,
          );
        }
      })
      .catch((reason) => {
        this.logger.debug('Validating token failed ', reason);
        throw new UnauthorizedException(reason);
      });

    return active ? { active, client_id, exp } : null;
  }
}
