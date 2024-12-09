import { Anggota } from "../../entities/Anggota.ts";
import { AnggotaRepository } from "../../repositories/AnggotaRepository.ts";

export class GetAnggotaById {
    constructor(private repository: AnggotaRepository) { }
    
    async execute(id: number): Promise<Anggota | null> {
        const anggota = await this.repository.findById(id);
        return anggota
    }
}