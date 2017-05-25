import * as CryptoJs from 'crypto-js';

export class Encrypt {

  encKey: string = '1234567890';

  encrypt(data: string) {
    let ciphertext = CryptoJs.AES.encrypt(data, this.encKey);
    return ciphertext.toString();
  }

  decrypt(enc: string) {
    let bytes = CryptoJs.AES.decrypt(enc, this.encKey);
    let plaintext = bytes.toString(CryptoJs.enc.Utf8);

    return plaintext;
  }
}