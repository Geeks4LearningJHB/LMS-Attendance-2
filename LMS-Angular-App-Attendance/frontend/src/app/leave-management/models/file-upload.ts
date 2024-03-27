export class FileUpload {
    key: string | undefined;
    name: string | undefined;
    url: string | undefined;
    file: File | null;
  
    constructor(file: File | null) {
      this.file = file;
      this.name = file?.name;
    }
  }