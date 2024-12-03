export interface Note {
  id_note: string;
  id_user: string;
  title: string;
  description: string;
  creation_date?: Date;
  modification_date?: Date;
}
