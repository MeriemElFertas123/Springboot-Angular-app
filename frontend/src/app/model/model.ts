import { Filiere, Genre } from "./enums"
import { AnneeEtude} from "./enums"
import { StatutRapport } from "./enums"

export interface Etudiant{
    id:number,
    image: Uint8Array | undefined; // Utilisation de Uint8Array pour les données binaires (Lob)
    nom:string,
    prenom:string,
    email:string,
    password:string,
    telephone:string,
    genre:Genre,
    filiere:Filiere,
    anneeEtude:AnneeEtude,
}

export interface DepotRapportStage{
    id:number,
    titre:string,
    description:string,
    etudiants:Etudiant[], 
    evaluation:Evaluation | null,
    statut:StatutRapport,
    submissionDate:Date,
    selectedRadio?:string | null // C'est une propriété optionnelle
}

export interface Evaluation{
    id:number,
    note:number,
    commentaire:string
}

// Meriem
/*
export interface Student {
  id: string; // L'ID est de type string
  name: string;
  email: string;
}

*/