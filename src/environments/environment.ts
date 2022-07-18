
export const environment = {
  production: false
};
export const API_URL = 'http://localhost:8080/';
export enum DTO_TYPES {
  TITRE_PRO,
  BLOC_COMPETENCES,
  VILLE,
  PROMOTION,
  ETUDIANT,
  EVALUATION
}
export const TYPE_NAME: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'Titres Professionnel'],
  [DTO_TYPES.BLOC_COMPETENCES, 'Blocs de Compétences'],
  [DTO_TYPES.VILLE, 'Villes'],
  [DTO_TYPES.PROMOTION, 'Promotions'],
  [DTO_TYPES.ETUDIANT, 'Etudiants'],
  [DTO_TYPES.EVALUATION, 'Evaluations'],
]);
export const API_SERVICE_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'titreProfessionnel'],
  [DTO_TYPES.BLOC_COMPETENCES, 'blocCompetences'],
  [DTO_TYPES.VILLE, 'ville'],
  [DTO_TYPES.PROMOTION, 'promotion'],
  [DTO_TYPES.ETUDIANT, 'etudiant'],
  [DTO_TYPES.EVALUATION, 'evaluation'],
]);
export const ICON_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, 'school'],
  [DTO_TYPES.BLOC_COMPETENCES, 'folder_special'],
  [DTO_TYPES.VILLE, 'location_city'],
  [DTO_TYPES.PROMOTION, 'people'],
  [DTO_TYPES.ETUDIANT, 'person'],
  [DTO_TYPES.EVALUATION, 'insert_chart'],
]);
export const ROUTE_BY_TYPE: Map<DTO_TYPES, string> = new Map<DTO_TYPES, string>([
  [DTO_TYPES.TITRE_PRO, '/TitresProfessionnels'],
  [DTO_TYPES.BLOC_COMPETENCES, '/BlocCompetences'],
  [DTO_TYPES.VILLE, '/Villes'],
  [DTO_TYPES.PROMOTION, '/Promotions'],
  [DTO_TYPES.ETUDIANT, '/Etudiants'],
  [DTO_TYPES.EVALUATION, '/Evaluations'],
]);
export const CHILD_TYPES_BY_TYPE: Map<DTO_TYPES, DTO_TYPES[]> = new Map<DTO_TYPES, DTO_TYPES[]>([
  [DTO_TYPES.TITRE_PRO, Array.of(DTO_TYPES.BLOC_COMPETENCES, DTO_TYPES.PROMOTION)],
  [DTO_TYPES.VILLE, Array.of(DTO_TYPES.PROMOTION, DTO_TYPES.ETUDIANT)],
  [DTO_TYPES.PROMOTION, Array.of(DTO_TYPES.ETUDIANT)],
  [DTO_TYPES.ETUDIANT, Array.of(DTO_TYPES.EVALUATION)],
]);

export function NAME_BY_TYPE(type: DTO_TYPES, item: any): string {
  switch (type) {
    case DTO_TYPES.TITRE_PRO:
      return item.titre.replace('Titre professionnel ', '').split('(')[0];
    case DTO_TYPES.BLOC_COMPETENCES:
      return item.titre;
    case DTO_TYPES.VILLE:
      return item.name;
    case DTO_TYPES.PROMOTION:
      return item.dateDebut + ' ' + '(' + item.villeName + ')';
    case DTO_TYPES.ETUDIANT:
      return item.utilisateurNom + ' ' + item.utilisateurPrenom;
    case DTO_TYPES.EVALUATION:
      return item.epreuveTitre + ' ' + '(' + item.note + ')';
    default:
      return 'Booyah ?';
  }
}
