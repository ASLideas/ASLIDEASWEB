import { supabase } from "./supabase";

export interface PeticionVitrinaPayload {
  file: File;
  clienteNombre: string;
  clienteEmail: string;
  appOrigen: 'LAWENMOLL' | 'Wellness' | 'Bienestar';
  region?: string;
}

export async function subirPeticionPdf({
  file,
  clienteNombre,
  clienteEmail,
  appOrigen,
  region = "Región de Chile"
}: PeticionVitrinaPayload) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${appOrigen.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `peticiones/${fileName}`;

    const { error: storageError } = await supabase
      .storage
      .from('documentos-peticiones')
      .upload(filePath, file);

    if (storageError) throw storageError;

    const { data: publicUrlData } = supabase
      .storage
      .from('documentos-peticiones')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    const { error: dbError } = await supabase
      .from('peticiones_vitrina')
      .insert([
        {
          cliente_nombre: clienteNombre,
          cliente_email: clienteEmail,
          region: region,
          app_origen: appOrigen,
          archivo_url: publicUrl,
          archivo_nombre: file.name,
          estado: 'pendiente'
        }
      ]);

    if (dbError) throw dbError;

    return { success: true, url: publicUrl };
  } catch (error: any) {
    console.error("Error al subir la petición:", error);
    return { success: false, error: error.message || error };
  }
}
