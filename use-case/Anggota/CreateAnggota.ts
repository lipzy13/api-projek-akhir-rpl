import { Anggota } from "../../entities/Anggota.ts";
import { AnggotaRepository } from "../../repositories/AnggotaRepository.ts";

export class CreateAnggota {
  constructor(private repository: AnggotaRepository) {}

  async execute(
    nama_anggota: string,
    deskripsi_anggota?: string,
    image_path?: string,
  ): Promise<Anggota> {
    const newAnggota = new Anggota(
      0,
      nama_anggota,
      deskripsi_anggota ?? null,
      image_path ?? null,
    );

    return await this.repository.createNewAnggota(newAnggota)
  }
}
