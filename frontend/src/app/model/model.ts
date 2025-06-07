import { TypeStage } from "../type-stage.enum";
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



export interface Enseignant {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone:string;
    password:string;
    genre:Genre;
    specialite: string;
    image: Uint8Array | undefined;
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

export interface Stage{
    id?: number;
    nomEntreprise:string,
    adresseEntreprise:string,
    numEncadrant:string,
    nomEncadrant:string,
    intituleSujet:string,
     descriptionSujet:string,
    typeStage:TypeStage,
    dateDepot?: string | Date; // au format ISO (ex : 2024-06-01)
    domaine?: string;

    nomFichierRapport?: string;
    typeFichierRapport?: string;
    contenuRapport?: Blob;
    etudiant :{
        id:number
    }
}
export interface Rapport {
    id: number;
    etudiantId: number;  // Référence à l'étudiant
    stageId: number;     // Référence au stage associé
    titre: string;
    tuteur: string;     // Tuteur entreprise
    dateDepot: Date;
    etat: 'DEPOSE' | 'VALIDE' | 'NOTE' | 'REJETE';
    note: number | null;
    annee: string;
    cheminFichier: string;
    nomOriginal: string;

    nomFichierRapport?: string;
    typeFichierRapport?: string;
    contenuRapport?: Blob;
  }
