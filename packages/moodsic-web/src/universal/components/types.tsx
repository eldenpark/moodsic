export interface FileMap {
  [fileName: string]: number;
}

export type FormType = (HTMLElement | null) & FormExtended;

interface FormExtended {
  labels;
  sources;
}
