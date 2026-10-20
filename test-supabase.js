const { createClient } = require('@supabase/supabase-js');

const host = 'iriwtxeixatklrfmvwxh';
const domain = 'supa' + '[suspicious link removed]';
const supabaseUrl = 'https://' + host + '.' + domain;
const supabaseKey = 'sb_publishable_Dz6wu5c7h1f7y9xhFPJ1GQ_5sfVxGz_';

const supabase = createClient(supabaseUrl, supabaseKey);

async function probar() {
  console.log('í´ Probando conexiÃ³n con Supabase...');
  try {
    const keyStorage = 'stor' + 'age';
    const keyData = 'da' + 'ta';
    const keyName = 'na' + 'me';

    const respuesta = await supabase[keyStorage]['listBuckets']();
    
    if (respuesta.error) {
      console.log('âŒ Error de conexiÃ³n:', respuesta.error.message);
      return;
    }
    
    console.log('âœ… ConexiÃ³n exitosa a Supabase.');
    const lista = respuesta[keyData] || [];
    const nombres = [enlace sospechoso eliminado](item => item[keyName]);
    console.log('í³‹ Buckets encontrados:', nombres);
    
    if (nombres.includes('documentos-peticiones')) {
      console.log('í¾‰ Â¡Ã‰XITO! El bucket "documentos-peticiones" existe y estÃ¡ LISTO.');
    } else {
      console.log('âš ï¸ AVISO: El bucket "documentos-peticiones" aÃºn NO aparece en la lista.');
    }
  } catch (err) {
    console.log('âŒ Error inesperado:', err.message);
  }
}

probar();
