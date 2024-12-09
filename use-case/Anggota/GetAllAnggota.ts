import { Anggota } from "../../entities/Anggota.ts";
import { AnggotaRepository } from "../../repositories/AnggotaRepository.ts";

export class GetAllAnggota {
    constructor(private repository: AnggotaRepository){}

    async execute(): Promise<Anggota[] | null> {
        return await this.repository.findAll()
    }
}