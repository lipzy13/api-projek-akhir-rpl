import { Budaya } from "../../entities/Budaya.ts";
import { BudayaRepository } from "../../repositories/BudayaRepository.ts";

export class GetBudayaById {
  constructor(private repository: BudayaRepository) {}

  async execute(id: number): Promise<Budaya | null> {
    const budaya = await this.repository.findById(id);
    return budaya;
  }
}
