export enum Role {
  USER = 'USER',
  BARMAKER = 'BARMAKER',
}

export interface UserAuth {
    nom: string
    email: string
}


export interface User {
  id: number
  nom: string
  prenom: string
  email: string
  adresse: string
  role: Role
}