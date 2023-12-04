import {z} from "zod";
const currentYear = new Date().getFullYear();
const idSchema = z.object({
    id: z.string().uuid()
  });
  
  const movieSchema = z.object({
    artist: z.string({ required_error: "Field is required" }),
    start: z.number().int().min(1900).max(currentYear),
    members: z.string({ required_error: "Field is required" }),
    origin: z.string().optional(),
    songs: z.number().int().positive(),
    poster: z.string().optional(),
    genres: z
      .enum([
        'Heavy Metal',
        'Rock', 
        'Rock Progresivo',
        'Reggae',
        'Industrial Metal',
        'Post-Hardcore', 
        'Metal Alternativo', 
        'Rock Industrial',
        'Metalcore',
      ])
      .array(),
  });

  export function validateId(object) {
    return idSchema.safeParse(object);
  }
  
export function validateMusic(object) {
  return movieSchema.safeParse(object);
}