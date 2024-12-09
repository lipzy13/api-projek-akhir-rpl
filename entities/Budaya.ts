export class Budaya {
  constructor(
    public id: number,
    public nama_budaya: string,
    public deskripsi_budaya: string | null,
    public image_path: string | null,
  ) {}

  validateName(): boolean {
    return this.nama_budaya.length > 0;
  }
}
