import {
  createAnggotaHandler,
  deleteAnggotaHandler,
  getAllAnggotaHandler,
  getAnggotaByIdHandler,
  updateAnggotaHandler,
} from "./controllers/AnggotaController.ts";
import {
  createBudayaHandler,
  deleteBudayaHandler,
  getAllBudayaHandler,
  getBudayaByIdHandler,
  updateBudayaHandler,
} from "./controllers/BudayaController.ts";

Deno.serve(async (req): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const id = path.split("/")[2];

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Max-Age": "86400"
      }),
    });
  }

  if (path.startsWith("/budaya")) {
    if (req.method === "GET" && !id) {
      try {
        const allBudaya = await getAllBudayaHandler(req);
        return new Response(allBudaya.body, {
          status: allBudaya.status,
          headers: allBudaya.headers,
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
    }

    if (req.method === "GET" && id) {
      try {
        const budaya = await getBudayaByIdHandler(req);
        return new Response(budaya.body, {
          status: budaya.status,
          headers: budaya.headers,
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
    }

    if (req.method === "POST" && !id) {
      try {
        const createResponse = await createBudayaHandler(req);
        return new Response(createResponse.body, {
          status: createResponse.status,
          headers: createResponse.headers,
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
    }

    if (req.method === "POST" && id) {
      try {
        const updateResponse = await updateBudayaHandler(req);
        return new Response(updateResponse.body, {
          status: updateResponse.status,
          headers: updateResponse.headers,
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
    }

    if (req.method === "DELETE" && id) {
      try {
        const deleteResponse = await deleteBudayaHandler(req);
        return new Response(deleteResponse.body, {
          status: deleteResponse.status,
          headers: deleteResponse.headers,
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
    }
  } else if (path.startsWith("/anggota")) {
    if (req.method === "GET" && !id) {
      try {
        const allAnggota = await getAllAnggotaHandler(req);
        return new Response(allAnggota.body, {
          status: allAnggota.status,
          headers: allAnggota.headers,
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
    }

    if (req.method === "GET" && id) {
      try {
        const anggota = await getAnggotaByIdHandler(req);
        return new Response(anggota.body, {
          status: anggota.status,
          headers: anggota.headers,
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
    }

    if (req.method === "POST" && !id) {
      try {
        const createResponse = await createAnggotaHandler(req);
        return new Response(createResponse.body, {
          status: createResponse.status,
          headers: createResponse.headers,
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
    }

    if (req.method === "POST" && id) {
      try {
        const updateResponse = await updateAnggotaHandler(req);
        return new Response(updateResponse.body, {
          status: updateResponse.status,
          headers: updateResponse.headers,
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
    }

    if (req.method === "DELETE" && id) {
      try {
        const deleteResponse = await deleteAnggotaHandler(req);
        return new Response(deleteResponse.body, {
          status: deleteResponse.status,
          headers: deleteResponse.headers,
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
    }
  }

  return new Response("Not found");

}
);
