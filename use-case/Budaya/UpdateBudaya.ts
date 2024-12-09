import { Budaya } from "../../entities/Budaya.ts";
import { BudayaRepository } from "../../repositories/BudayaRepository.ts";

export class UpdateBudaya {
  constructor(private repository: BudayaRepository) {}

  async execute(
    id: number,
    nama_budaya: string,
    deskripsi_anggota: string | null,
    image_path: string | null,
  ): Promise<Budaya> {
    const updatedBudaya = new Budaya(
      id,
      nama_budaya,
      deskripsi_anggota,
      image_path,
    );

    return await this.repository.editBudaya(id, updatedBudaya);
  }
}
