import crypto from 'crypto';

export function createPassword(password: string) {
  return crypto
    .createHmac('sha256', process.env.purr_HASH)
    .update(password)
    .digest('hex');
}
