import { Injectable } from '@angular/core';
import { HttpUrlEncodingCodec } from '@angular/common/http';

@Injectable()
export class MagnetParserService {

  constructor(private encoder: HttpUrlEncodingCodec) {
  }

  parseMagnet(magnet: string) {
    const decoded = this.encoder.decodeValue(magnet);
    const params = decoded.substr(8).split('&');

    const result = params.map(el => {
      const [ key, value ] = el.split('=');
      return {
        key,
        value
      };
    });

    const torrentMeta: { [key: string]: string | string[] } = {};

    result.forEach(({key, value}) => {
      if (torrentMeta[key]) {
        const currentKeyValue = torrentMeta[key];
        if (!Array.isArray(currentKeyValue)) {
          torrentMeta[key] = [ currentKeyValue, value ];
        } else {
          torrentMeta[key] = [ ...currentKeyValue, value ];
        }
      } else {
        torrentMeta[key] = value;
      }
    });
    return torrentMeta;
  }

}
