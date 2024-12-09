import { Budaya } from "../../entities/Budaya.ts";
import { BudayaRepository } from "../../repositories/BudayaRepository.ts";

export class GetAllBudaya {
  constructor(private repository: BudayaRepository) {}

  async execute(): Promise<Budaya[] | null> {
    return await this.repository.findAll();
  }
}
