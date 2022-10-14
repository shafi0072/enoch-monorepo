import mongoose from 'mongoose';

export const generateMongooseId = (hex) => new mongoose.Types.ObjectId(hex);

export function tagsFromText(text: string): string[] {
  const regex = /\B#([^\W\d]\w*)\b/g;
  return Array.from(text.matchAll(regex), (m) => m[1]);
  //no empty values and a tag can't be ONLY a number
}
