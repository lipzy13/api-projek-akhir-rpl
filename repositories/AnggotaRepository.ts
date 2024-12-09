import { Tables } from "../database.types.ts";
import { Anggota } from "../entities/Anggota.ts";
import { supabaseClient } from "../SupabaseClient.ts";

export class AnggotaRepository {
  private supabase = supabaseClient;

  async findAll(): Promise<Anggota[] | null> {
    const { data, error } = await this.supabase.from("anggota").select().order(
      "id",
    ).returns<Tables<"anggota">[]>();

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    return (data ?? []).map((item) =>
      new Anggota(
        item.id,
        item.nama_anggota,
        item.deskripsi_anggota ?? null,
        item.image_path ?? null,
      )
    );
  }

  async findById(id: number): Promise<Anggota | null> {
    const { data, error } = await this.supabase
      .from("anggota")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) {
      return null;
    }

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      throw new Error(error || "An unknown error occurred");
    }

    return new Anggota(
      data.id,
      data.nama_anggota,
      data.deskripsi_anggota,
      data.image_path ?? null,
    );
  }

  async createNewAnggota(anggota: Anggota): Promise<Anggota> {
    // Specify only the type for the table rows
    const { data, error } = await this.supabase
      .from("anggota") // The table name and row type
      .insert(
        {
          nama_anggota: anggota.nama_anggota,
          deskripsi_anggota: anggota.deskripsi_anggota,
          image_path: anggota.image_path,
        },
      )
      .select("id, nama_anggota, deskripsi_anggota, image_path");

    if (error) {
      console.error("Error inserting data into Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    return new Anggota(
      data[0].id,
      data[0].nama_anggota,
      data[0].deskripsi_anggota ?? null,
      data[0].image_path ?? null,
    );
  }

  async editAnggota(id: number, updatedAnggota: Anggota): Promise<Anggota> {
    const { data, error } = await this.supabase.from("anggota").update({
      nama_anggota: updatedAnggota.nama_anggota,
      deskripsi_anggota: updatedAnggota.deskripsi_anggota,
      image_path: updatedAnggota.image_path,
    }).eq("id", id).select("id, nama_anggota, deskripsi_anggota, image_path");

    if (error) {
      console.error("Error updating data in Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    if (!data || !data[0]) {
      throw new Error(`Anggota dengan id ${id} tidak ditemukan`);
    }

    return new Anggota(
      data[0].id,
      data[0].nama_anggota,
      data[0].deskripsi_anggota ?? null,
      data[0].image_path ?? null,
    );
  }

  async deleteAnggota(id: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("anggota")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting data from Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    return Array.isArray(data) && data.length > 0;
  }
}
