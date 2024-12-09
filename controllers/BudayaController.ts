import { BudayaRepository } from "../repositories/BudayaRepository.ts";
import { CreateBudaya } from "../use-case/Budaya/CreateBudaya.ts";
import { GetAllBudaya } from "../use-case/Budaya/GetAllBudaya.ts";
import { GetBudayaById } from "../use-case/Budaya/GetBudayaById.ts";
import { UpdateBudaya } from "../use-case/Budaya/UpdateBudaya.ts";
import { DeleteBudaya } from "../use-case/Budaya/DeleteBudaya.ts";

const getAllBudayaUseCase = new GetAllBudaya(new BudayaRepository());
const getBudayaByIdUseCase = new GetBudayaById(new BudayaRepository());
const createBudayaUseCase = new CreateBudaya(new BudayaRepository());
const updateBudayaUseCase = new UpdateBudaya(new BudayaRepository());
const deleteBudayaUseCase = new DeleteBudaya(new BudayaRepository());

export const getAllBudayaHandler = async (_req: Request): Promise<Response> => {
  try {
    const allBudaya = await getAllBudayaUseCase.execute();

    return new Response(JSON.stringify(allBudaya), {
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

export const getBudayaByIdHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/")[2]);

  try {
    const budaya = await getBudayaByIdUseCase.execute(id);

    if (budaya === null) {
      return new Response(
        JSON.stringify({ message: `Budaya dengan id:${id} tidak ada` }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(JSON.stringify(budaya), {
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

export const createBudayaHandler = async (req: Request): Promise<Response> => {
  const { nama_budaya, deskripsi_budaya, image_path } = await req.json();
  if (!nama_budaya) {
    return new Response(
      JSON.stringify({ message: "nama_budaya harus dimasukkan" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const newBudaya = await createBudayaUseCase.execute(
      nama_budaya,
      deskripsi_budaya,
      image_path,
    );

    return new Response(JSON.stringify(newBudaya), {
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

export const updateBudayaHandler = async (req: Request): Promise<Response> => {
  const { nama_budaya, deskripsi_budaya, image_path } = await req.json();
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split("/")[2]);

  if (!nama_budaya) {
    return new Response(JSON.stringify({ message: "Masukkan nama budaya" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedBudaya = await updateBudayaUseCase.execute(
      id,
      nama_budaya,
      deskripsi_budaya,
      image_path,
    );

    return new Response(JSON.stringify(updatedBudaya), {
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

export const deleteBudayaHandler = async (req: Request): Promise<Response> => {
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
    const deleted = await deleteBudayaUseCase.execute(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({
          message: "Budaya tidak ditemukan atau gagal dihapus",
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    console.log(`Record with ID ${id} successfully deleted.`);
    return new Response(
      JSON.stringify({ message: "Budaya berhasil dihapus" }),
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
