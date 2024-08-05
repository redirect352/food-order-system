import { AES, enc } from 'crypto-js';
import { decodeJwt } from 'jose';

export class CryptoService {
  private static readonly key = process.env.PAYLOAD_SECRET_KEY;
  static decryptObject(payload: string) {
    if (!CryptoService.key) throw new Error('Encryption key not found');
    const decryptedData = AES.decrypt(payload, CryptoService.key).toString(enc.Utf8);
    return JSON.parse(decryptedData);
  }
  static encryptObject(object: any) {
    if (!CryptoService.key) throw new Error('Encryption key not found');
    const payload = JSON.stringify(object);
    return AES.encrypt(payload, CryptoService.key).toString();
  }

  static getPayloadFromUser(user : any) {
    const { token } = user;
    if (!token) {
      return null;
    }
    const decoded: any = decodeJwt(token);
    if (!decoded.encryptedPayload) return null;
    const info = CryptoService.decryptObject(decoded.encryptedPayload);
    return info as { role: string, id: number };
  }
}
