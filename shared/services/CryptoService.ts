import 'server-only';
import { decodeJwt } from 'jose';
import { sealData, unsealData } from 'iron-session';

export class CryptoService {
  private static readonly key = process.env.PAYLOAD_SECRET_KEY;
  static async decryptObject(payload: string) {
    if (!CryptoService.key) throw new Error('Encryption key not found');
    const decryptedData = await unsealData(payload, {password: CryptoService.key}) as string;
    return JSON.parse(decryptedData);
  }
  static async encryptObject(object: any) {
    if (!CryptoService.key) throw new Error('Encryption key not found');
    const payload = JSON.stringify(object);
    return await sealData(payload, {password: CryptoService.key});
  }

  static async getPayloadFromUser(user : any) {
    const { token } = user;
    if (!token) {
      return null;
    }
    const decoded: any = decodeJwt(token);
    if (!decoded.encryptedPayload) return null;
    const info = await CryptoService.decryptObject(decoded.encryptedPayload);
    return info as { role: string, id: number };
  }
}
