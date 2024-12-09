import "jsr:@std/dotenv/load";
import { Budaya } from "../entities/Budaya.ts";
import { Tables } from "../database.types.ts";
import { supabaseClient } from "../SupabaseClient.ts";

export class BudayaRepository {
  private supabase = supabaseClient;

  async findAll(): Promise<Budaya[] | null> {
    const { data, error } = await this.supabase
      .from("budaya")
      .select()
      .order("id")
      .returns<Tables<"budaya">[]>();

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    return (data ?? []).map((item) =>
      new Budaya(
        item.id,
        item.nama_budaya,
        item.deskripsi_budaya ?? null,
        item.image_path ?? null,
      )
    );
  }

  async findById(id: number): Promise<Budaya | null> {
    const { data, error } = await this.supabase
      .from("budaya")
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

    return new Budaya(
      data.id,
      data.nama_budaya,
      data.deskripsi_budaya,
      data.image_path ?? null,
    );
  }

  async createNewBudaya(budaya: Budaya): Promise<Budaya> {
    // Specify only the type for the table rows
    const { data, error } = await this.supabase
      .from("budaya") // The table name and row type
      .insert(
        {
          nama_budaya: budaya.nama_budaya,
          deskripsi_budaya: budaya.deskripsi_budaya,
          image_path: budaya.image_path,
        },
      )
      .select("id, nama_budaya, deskripsi_budaya, image_path");

    if (error) {
      console.error("Error inserting data into Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    return new Budaya(
      data[0].id,
      data[0].nama_budaya,
      data[0].deskripsi_budaya ?? null,
      data[0].image_path ?? null,
    );
  }

  async editBudaya(id: number, updatedBudaya: Budaya): Promise<Budaya> {
    const { data, error } = await this.supabase.from("budaya").update({
      nama_budaya: updatedBudaya.nama_budaya,
      deskripsi_budaya: updatedBudaya.deskripsi_budaya,
      image_path: updatedBudaya.image_path,
    }).eq("id", id).select("id, nama_budaya, deskripsi_budaya, image_path");

    if (error) {
      console.error("Error updating data in Supabase:", error);
      throw new Error(error.message || "An unknown error occurred");
    }

    if (!data || !data[0]) {
      throw new Error(`Budaya dengan id ${id} tidak ditemukan`);
    }

    return new Budaya(
      data[0].id,
      data[0].nama_budaya,
      data[0].deskripsi_budaya ?? null,
      data[0].image_path ?? null,
    );
  }

  async deleteBudaya(id: number): Promise<boolean> {
    const { data, error } = await this.supabase
      .from("budaya")
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
