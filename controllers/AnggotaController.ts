import { AnggotaRepository } from "../repositories/AnggotaRepository.ts";
import { CreateAnggota } from "../use-case/Anggota/CreateAnggota.ts";
import { GetAllAnggota } from "../use-case/Anggota/GetAllAnggota.ts";
import { GetAnggotaById } from "../use-case/Anggota/GetAnggotaById.ts";
import { UpdateAnggota } from "../use-case/Anggota/UpdateAnggota.ts";
import { DeleteAnggota } from "../use-case/Anggota/DeleteAnggota.ts";

const getAllAnggotaUseCase = new GetAllAnggota(new AnggotaRepository());
const getAnggotaByIdUseCase = new GetAnggotaById(new AnggotaRepository());
const createAnggotaUseCase = new CreateAnggota(new AnggotaRepository());
const updateAnggotaUseCase = new UpdateAnggota(new AnggotaRepository());
const deleteAnggotaUseCase = new DeleteAnggota(new AnggotaRepository());

export const getAllAnggotaHandler = async (_req: Request): Promise<Response> => {
    try {
      const allAnggota = await getAllAnggotaUseCase.execute();
  
      return new Response(JSON.stringify(allAnggota), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      const e = error as Error;
      return new Response(JSON.stringify({ message: e.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  
  export const getAnggotaByIdHandler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/")[2]);
  
    try {
      const anggota = await getAnggotaByIdUseCase.execute(id);
  
      if (anggota === null) {
        return new Response(
          JSON.stringify({ message: `Anggota dengan id:${id} tidak ada` }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      }
  
      return new Response(JSON.stringify(anggota), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      const e = error as Error;
      return new Response(JSON.stringify({ message: e.stack }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
  
  export const createAnggotaHandler = async (req: Request): Promise<Response> => {
    const { nama_anggota, deskripsi_anggota, image_path } = await req.json();
    if (!nama_anggota) {
      return new Response(
        JSON.stringify({ message: "nama_anggota harus dimasukkan" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }
  
    try {
      const newAnggota = await createAnggotaUseCase.execute(
        nama_anggota,
        deskripsi_anggota,
        image_path,
      );
  
      return new Response(JSON.stringify(newAnggota), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      const e = error as Error;
      return new Response(JSON.stringify({ message: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  export const updateAnggotaHandler = async (req: Request): Promise<Response> => {
    const { nama_anggota, deskripsi_anggota, image_path } = await req.json();
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/")[2]);
  
    if (!nama_anggota) {
      return new Response(JSON.stringify({ message: "Masukkan nama Anggota" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    try {
      const updatedAnggota = await updateAnggotaUseCase.execute(
        id,
        nama_anggota,
        deskripsi_anggota,
        image_path,
      );
  
      return new Response(JSON.stringify(updatedAnggota), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      const e = error as Error;
      return new Response(JSON.stringify({ message: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
  
  export const deleteAnggotaHandler = async (req: Request): Promise<Response> => {
    const url = new URL(req.url);
    const id = parseInt(url.pathname.split("/")[2]);
  
    if (!id) {
      return new Response(
        JSON.stringify({ message: "ID budaya tidak ditemukan" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  
    try {
      const deleted = await deleteAnggotaUseCase.execute(id);
  
      if (!deleted) {
        return new Response(
          JSON.stringify({
            message: "Anggota tidak ditemukan atau gagal dihapus",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
  
      console.log(`Record with ID ${id} successfully deleted.`);
      return new Response(
        JSON.stringify({ message: "Anggota berhasil dihapus" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      const e = error as Error;
      console.error("Error deleting Budaya:", e.message);
      return new Response(JSON.stringify({ message: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };