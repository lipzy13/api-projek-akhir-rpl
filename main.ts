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

// Helper to add CORS headers to every response
function withCORS(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return new Response(response.body, { status: response.status, headers });
}

// Handle preflight requests for CORS
function handlePreflight(): Response {
  return new Response(null, {
    status: 204,
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400", // Cache preflight responses
    }),
  });
}

// Main server logic
Deno.serve(async (req): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;
  const id = path.split("/")[2];

  if (req.method === "OPTIONS") {
    return handlePreflight(); // Respond to OPTIONS requests
  }

  try {
    let response: Response;

    if (path.startsWith("/budaya")) {
      if (req.method === "GET" && !id) {
        response = await getAllBudayaHandler(req);
      } else if (req.method === "GET" && id) {
        response = await getBudayaByIdHandler(req);
      } else if (req.method === "POST" && !id) {
        response = await createBudayaHandler(req);
      } else if (req.method === "POST" && id) {
        response = await updateBudayaHandler(req);
      } else if (req.method === "DELETE" && id) {
        response = await deleteBudayaHandler(req);
      } else {
        response = new Response("Not Found", { status: 404 });
      }
    } else if (path.startsWith("/anggota")) {
      if (req.method === "GET" && !id) {
        response = await getAllAnggotaHandler(req);
      } else if (req.method === "GET" && id) {
        response = await getAnggotaByIdHandler(req);
      } else if (req.method === "POST" && !id) {
        response = await createAnggotaHandler(req);
      } else if (req.method === "POST" && id) {
        response = await updateAnggotaHandler(req);
      } else if (req.method === "DELETE" && id) {
        response = await deleteAnggotaHandler(req);
      } else {
        response = new Response("Not Found", { status: 404 });
      }
    } else {
      response = new Response("Not Found", { status: 404 });
    }

    return withCORS(response); // Add CORS headers to the response
  } catch (error) {
    const e = error as Error;
    return withCORS(
      new Response(JSON.stringify({ message: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
});