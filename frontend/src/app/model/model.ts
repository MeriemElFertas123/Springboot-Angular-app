import { FiliereEtude } from "./enums"
import { AnneeEtude} from "./enums"
import { StatutRapport } from "./enums"

export interface Student{
    id:number,
    nom:string,
    prenom:string,
    email:string,
    filiere:FiliereEtude,
    anneeEtude:AnneeEtude,
    imageUrl:string
}

export interface DepotRapportStage{
    id:number,
    titre:string,
    description:string,
    etudiants:Student[], 
    evaluation:Evaluation | null,
    statut:StatutRapport,
    submissionDate:Date,
    selectedRadio?:string | null // C'est une propriété optionnelle
}

export interface Evaluation{
    id:number,
    note:number,
    comment:string
}

// Meriem
/*
export interface Student {
  id: string; // L'ID est de type string
  name: string;
  email: string;
}

*/