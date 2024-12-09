import { Budaya } from "../../entities/Budaya.ts";
import { BudayaRepository } from "../../repositories/BudayaRepository.ts";

export class CreateBudaya {
  constructor(private repository: BudayaRepository) {}

  async execute(
    nama_budaya: string,
    deskripsi_budaya?: string,
    image_path?: string,
  ): Promise<Budaya> {
    const newBudaya = new Budaya(
      0, // id will be generated automatically by the database
      nama_budaya,
      deskripsi_budaya ?? null,
      image_path ?? null,
    );

    return await this.repository.createNewBudaya(newBudaya);
  }
}
