import * as jwt from 'jsonwebtoken';

export class Jwt {

  secretKey = '123456789000001234567890';

  singn(payload: any) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, this.secretKey, {
        expiresIn: '1d'
      }, (error, token) => {
        if (error) reject(error);
        else resolve(token);
      });
    });
  }

  verify(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secretKey, (error, decoded) => {
        if (error) reject(error);
        else resolve(decoded);
      });
    });
  }
}
