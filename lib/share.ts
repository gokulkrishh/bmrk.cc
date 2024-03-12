import { customAlphabet } from 'nanoid';

export const nanoid = (chars: number = 7) => {
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    chars,
  )();
};
