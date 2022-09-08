import {ControlInfo, ControlInputType, FormInfo} from '../models/form-info';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

export const environment = {
  production: false,
};
export const API_URL = 'http://localhost:8080/';
export enum DTO_TYPES {
  TITRE_PRO,
  BLOC_COMPETENCES,
  COMPETENCE,
  VILLE,
  PROMOTION,
  ETUDIANT,
  EVALUATION,
  EPREUVE,
  UTILISATEURS,
  POSITION,
  NIVEAUX
}
export const TYPE_NAME: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'Titres Professionnel'],
  [DTO_TYPES.BLOC_COMPETENCES, 'Blocs de Compétences'],
  [DTO_TYPES.COMPETENCE, 'Compétences'],
  [DTO_TYPES.VILLE, 'Villes'],
  [DTO_TYPES.PROMOTION, 'Promotions'],
  [DTO_TYPES.ETUDIANT, 'Etudiants'],
  [DTO_TYPES.EVALUATION, 'Evaluations'],
  [DTO_TYPES.EPREUVE, 'Epreuves'],
  [DTO_TYPES.UTILISATEURS, 'Utilisateurs'],
  [DTO_TYPES.POSITION, 'Position'],
  [DTO_TYPES.POSITION, 'Niveaux'],
]);
export const API_SERVICE_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'titreProfessionnel'],
  [DTO_TYPES.BLOC_COMPETENCES, 'blocCompetences'],
  [DTO_TYPES.COMPETENCE, 'competence'],
  [DTO_TYPES.VILLE, 'ville'],
  [DTO_TYPES.PROMOTION, 'promotion'],
  [DTO_TYPES.ETUDIANT, 'etudiant'],
  [DTO_TYPES.EVALUATION, 'evaluation'],
  [DTO_TYPES.EPREUVE, 'epreuve'],
  [DTO_TYPES.UTILISATEURS, 'utilisateur'],
  [DTO_TYPES.POSITION, 'position'],
  [DTO_TYPES.NIVEAUX, 'position'],
]);
export const ICON_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'school'],
  [DTO_TYPES.BLOC_COMPETENCES, 'folder_special'],
  [DTO_TYPES.COMPETENCE, 'folder_special'],
  [DTO_TYPES.VILLE, 'location_city'],
  [DTO_TYPES.PROMOTION, 'people'],
  [DTO_TYPES.ETUDIANT, 'person'],
  [DTO_TYPES.EVALUATION, 'class'],
  [DTO_TYPES.EPREUVE, 'insert_chart'],
  [DTO_TYPES.UTILISATEURS, 'person'],
  [DTO_TYPES.POSITION, 'spellcheck'],
]);
export const ROUTE_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, '/TitresProfessionnels'],
  [DTO_TYPES.BLOC_COMPETENCES, '/BlocCompetences'],
  [DTO_TYPES.COMPETENCE, '/Competences'],
  [DTO_TYPES.VILLE, '/Villes'],
  [DTO_TYPES.PROMOTION, '/Promotions'],
  [DTO_TYPES.ETUDIANT, '/Etudiants'],
  [DTO_TYPES.EVALUATION, '/Evaluations'],
  [DTO_TYPES.EPREUVE, '/Epreuves'],
  [DTO_TYPES.UTILISATEURS, '/Utilisateurs'],
  [DTO_TYPES.POSITION, '/Positions'],
]);
export const CHILD_TYPES_BY_TYPE: Map<DTO_TYPES, DTO_TYPES[]> = new Map<DTO_TYPES, DTO_TYPES[]>([
  [DTO_TYPES.TITRE_PRO, Array.of(DTO_TYPES.BLOC_COMPETENCES, DTO_TYPES.PROMOTION)],
  [DTO_TYPES.BLOC_COMPETENCES, Array.of(DTO_TYPES.COMPETENCE, DTO_TYPES.EPREUVE)],
  [DTO_TYPES.VILLE, Array.of(DTO_TYPES.PROMOTION, DTO_TYPES.ETUDIANT)],
  [DTO_TYPES.PROMOTION, Array.of(DTO_TYPES.ETUDIANT)],
  [DTO_TYPES.ETUDIANT, Array.of(DTO_TYPES.EVALUATION)],
]);
const fb: FormBuilder = new FormBuilder();
const defaultErrorMessageMap = new Map<string, string>([['required', 'Information requise']]);
const emptyErrorMessageMap = new Map<string, string>();
export const FORM_BY_TYPE: Map<DTO_TYPES, FormInfo> = new Map<DTO_TYPES, FormInfo>([
  [DTO_TYPES.TITRE_PRO, new FormInfo([
    new ControlInfo('Titre Professionnel', 'titre',
      new FormControl(null), ControlInputType.TEXT, 'Titre', emptyErrorMessageMap, true),
    new ControlInfo('Slug', 'slug',
      new FormControl(null), ControlInputType.TEXT, 'Slug', emptyErrorMessageMap, false),
    new ControlInfo('Description', 'description',
      new FormControl(null), ControlInputType.TEXTAREA, 'Description du Titre', emptyErrorMessageMap, true),
    new ControlInfo('Objectifs', 'objectives',
      new FormControl(null), ControlInputType.TEXTAREA, 'Objectifs du Titre', emptyErrorMessageMap, true),
  ], fb, false)],
  [DTO_TYPES.BLOC_COMPETENCES, new FormInfo([
    new ControlInfo('Bloc de Compétences', 'titre',
      new FormControl('', Validators.required), ControlInputType.TEXT, 'Nom du Bloc', defaultErrorMessageMap, true),
    new ControlInfo('Description', 'description',
      new FormControl('', Validators.required), ControlInputType.TEXTAREA, 'Description du bloc', defaultErrorMessageMap, true),
    new ControlInfo('Titre Professionnel', 'titreProfessionnelId',
      new FormControl('', Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.TITRE_PRO),
  ], fb)],
  [DTO_TYPES.COMPETENCE,  new FormInfo([
    new ControlInfo('Compétence', 'titre',
      new FormControl('', Validators.required), ControlInputType.TEXT, 'Nom de la compétence', defaultErrorMessageMap, true),
    new ControlInfo('Description', 'description',
      new FormControl('', Validators.required), ControlInputType.TEXTAREA, 'Description de la compétence', defaultErrorMessageMap, true),
    new ControlInfo('Bloc de Compétences', 'blocCompetencesId',
      new FormControl('', Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.BLOC_COMPETENCES),
  ], fb)],
  [DTO_TYPES.VILLE,  new FormInfo([
    new ControlInfo('Nom', 'name',
      new FormControl(null), ControlInputType.TEXT, 'Titre', emptyErrorMessageMap, true),
  ], fb, false)],
  [DTO_TYPES.PROMOTION,  new FormInfo([
    new ControlInfo('Période', '',
      null, ControlInputType.DATE_RANGE, '', defaultErrorMessageMap, true, null, [
        new ControlInfo('Date de Début', 'dateDebut',
        new FormControl(null, Validators.required), null, '', defaultErrorMessageMap, true),
        new ControlInfo('Date de Fin', 'dateFin',
        new FormControl(null, Validators.required), null, '', defaultErrorMessageMap, true)]),
    new ControlInfo('Titre Professionnel', 'titreProfessionnelId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.TITRE_PRO),
    new ControlInfo('Ville', 'villeId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.VILLE),
  ], fb)],
  [DTO_TYPES.ETUDIANT,  new FormInfo([
    new ControlInfo('Promotion', 'promotionId',
    new FormControl(null), ControlInputType.SELECT, '', defaultErrorMessageMap, true, DTO_TYPES.PROMOTION),
    new ControlInfo('Ville', 'villeId',
    new FormControl(null), ControlInputType.SELECT, '', defaultErrorMessageMap, true, DTO_TYPES.VILLE)
  ], fb, false)],
  [DTO_TYPES.EVALUATION,  new FormInfo([
    new ControlInfo('Etudiant', 'etudiantId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.ETUDIANT),
    new ControlInfo('Promotion', 'promotionId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.PROMOTION, null, 'AllByPage', 'etudiantId'),
    new ControlInfo('Bloc de Compétences', 'blocCompetencesId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, false,
      DTO_TYPES.BLOC_COMPETENCES, null, 'AllByPage', 'promotionId'),
    new ControlInfo('Epreuve', 'epreuveId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.EPREUVE, null, 'AllByPage', 'blocCompetencesId'),
    new ControlInfo('Note', 'note',
      new FormControl(0, Validators.required), ControlInputType.TEXT, '', defaultErrorMessageMap, true),
  ], fb)],
  [DTO_TYPES.EPREUVE,  new FormInfo([], fb)],
  [DTO_TYPES.UTILISATEURS, new FormInfo([
    new ControlInfo('Titre Professionnel', 'titre',
      new FormControl(null), ControlInputType.TEXT, 'Titre', emptyErrorMessageMap, true),
    new ControlInfo('Slug', 'slug',
      new FormControl(null), ControlInputType.TEXT, 'Slug', emptyErrorMessageMap, false),
    new ControlInfo('Description', 'description',
      new FormControl(null), ControlInputType.TEXTAREA, 'Description du Titre', emptyErrorMessageMap, true),
    new ControlInfo('Objectifs', 'objectives',
      new FormControl(null), ControlInputType.TEXTAREA, 'Objectifs du Titre', emptyErrorMessageMap, true),
  ], fb)],
  [DTO_TYPES.POSITION,  new FormInfo([
    new ControlInfo('Etudiant', 'etudiantId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.ETUDIANT),
    new ControlInfo('Promotion', 'promotionId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.PROMOTION, null, 'AllByPage', 'etudiantId'),
    new ControlInfo('Bloc de Compétences', 'blocCompetencesId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, false,
      DTO_TYPES.BLOC_COMPETENCES, null, 'AllByPage', 'promotionId'),
    new ControlInfo('Compétence', 'competenceId',
      new FormControl(null, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.COMPETENCE, null, 'AllByPage', 'blocCompetencesId'),
    new ControlInfo('Avant', 'avant',
      new FormControl(0, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.NIVEAUX, null, 'Niveaux'),
    new ControlInfo('Apres', 'apres',
      new FormControl(0, Validators.required), ControlInputType.SELECT, '', defaultErrorMessageMap, true,
      DTO_TYPES.NIVEAUX, null, 'Niveaux'),
  ], fb)],
]);
export function NAME_BY_TYPE(type: DTO_TYPES, item: any): string {
  switch (type) {
    case DTO_TYPES.TITRE_PRO:
      return reduceTitre(item.titre);
    case DTO_TYPES.BLOC_COMPETENCES:
    case DTO_TYPES.COMPETENCE:
      return item.titre;
    case DTO_TYPES.EPREUVE:
      return `(${item.blocCompetencesTitre}) ${item.titre}`;
    case DTO_TYPES.VILLE:
      return item.name;
    case DTO_TYPES.PROMOTION:
      return `${reduceTitre(item.titreProfessionnelTitre)} - ${yearDate(item.dateDebut)} (${item.villeName})`;
    case DTO_TYPES.ETUDIANT:
      return `${item.utilisateurNom} ${item.utilisateurPrenom}`;
    case DTO_TYPES.EVALUATION:
      return `${item.epreuveTitre} (${item.note})`;
    case DTO_TYPES.UTILISATEURS:
      return `${item.nom} ${item.prenom}`;
    case DTO_TYPES.POSITION:
      return `${item.competenceTitre} (${item.avant} - ${item.apres})`;
    case DTO_TYPES.NIVEAUX:
      return item.name;
    default:
      return 'Booyah ?';
  }

  function reduceTitre(titre: string): string {
    return titre.replace('Titre professionnel ', '').split('(')[0];
  }

  function yearDate(date: string): string {
    return new Date(date).getFullYear().toString();
  }
}
