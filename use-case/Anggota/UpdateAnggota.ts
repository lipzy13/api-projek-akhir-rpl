import { Anggota } from "../../entities/Anggota.ts";
import { AnggotaRepository } from "../../repositories/AnggotaRepository.ts";

export class UpdateAnggota {
  constructor(private repository: AnggotaRepository) {}

  async execute(
    id: number,
    nama_anggota: string,
    deskripsi_anggota: string | null,
    image_path: string | null,
  ): Promise<Anggota> {
    const updatedAnggota = new Anggota(
      id,
      nama_anggota,
      deskripsi_anggota,
      image_path,
    );

    return await this.repository.editAnggota(id, updatedAnggota);
  }
}
