import { BudayaRepository } from "../../repositories/BudayaRepository.ts";

export class DeleteBudaya {
  constructor(private repository: BudayaRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.repository.deleteBudaya(id);
  }
}
