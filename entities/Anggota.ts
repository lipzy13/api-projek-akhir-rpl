export class Anggota {
  constructor(
    public id: number,
    public nama_anggota: string,
    public deskripsi_anggota: string | null,
    public image_path: string | null,
  ) {}

  validateName(): boolean {
    return this.nama_anggota.length > 0;
  }
}
