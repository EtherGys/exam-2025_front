import type { User } from './User';
import type { Cocktail } from './Cocktail';

export interface Carte {
  id: number;
  nom: string;
  description: string;
  image: string;
  dateCreation: string;
  barmaker: User;
  cocktails: Cocktail[];
} 