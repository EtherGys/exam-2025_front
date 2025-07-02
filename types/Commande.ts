export enum StatutCommande {
  COMMANDEE = 'COMMANDEE',
  EN_PREPARATION = 'EN_PREPARATION',
  TERMINEE = 'TERMINEE',
}

export enum StatutCocktail {
  COMMANDE = 'COMMANDE',
  PREPARATION_INGREDIENTS = 'PREPARATION_INGREDIENTS',
  ASSEMBLAGE = 'ASSEMBLAGE',
  DRESSAGE = 'DRESSAGE',
  TERMINE = 'TERMINE',
}

export enum Taille {
  S = 'S',
  M = 'M',
  L = 'L',
}

export interface LigneDeCommande {
  cocktailId: number; // id du cocktail
  taille: string;
  prixTaille: number;
  quantite: number;
  statutCocktail?: StatutCocktail;
}

export interface Commande {
  id?: string
  dateHeureCommande?: string; // ISO string
  dateCreation?: string; // ISO string
  statutCommande?: StatutCommande;
  lignesDeCommande: LigneDeCommande[];
} 