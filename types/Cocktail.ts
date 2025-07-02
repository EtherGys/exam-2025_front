export enum CocktailCategorie {
  CLASSIQUE = 'CLASSIQUE',
  MODERNE = 'MODERNE',
  SANS_ALCOOL = 'SANS_ALCOOL',
  SHOT = 'SHOT',
  CHAUD = 'CHAUD',
  PUNCH = 'PUNCH',
  SMASH = 'SMASH',
  SOUR = 'SOUR',
  HIGHBALL = 'HIGHBALL',
  LOWBALL = 'LOWBALL',
  TIKI = 'TIKI',
  FROZEN = 'FROZEN',
  CREMEUX = 'CREMEUX',
  SUCRE = 'SUCRE',
  ACIDE = 'ACIDE',
  AMER = 'AMER',
  FRUITE = 'FRUITE',
  EPICE = 'EPICE',
  RAFRAICHISSANT = 'RAFRAICHISSANT',
  FORT = 'FORT',
  LEGER = 'LEGER',
}

export interface Cocktail {
  id: number;
  nom: string;
  description: string;
  image: string;
  ingredients: string[];
  prixS: number;
  prixM: number;
  prixL: number;
  categories: CocktailCategorie[];
} 