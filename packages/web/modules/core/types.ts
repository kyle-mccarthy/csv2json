export interface UploadedDocument {
  id: string;
  title: string;
  updated_at: string;
  created_at: string;
  contents: Array<Record<string, string | number | null>>;
}
