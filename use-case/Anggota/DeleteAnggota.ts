import { AnggotaRepository } from "../../repositories/AnggotaRepository.ts";

export class DeleteAnggota {
  constructor(private repository: AnggotaRepository) {}

  async execute(id: number): Promise<boolean> {
    return await this.repository.deleteAnggota(id);
  }
}
