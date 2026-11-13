const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = [...findFiles('./app'), ...findFiles('./src')];

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('Agendar Cita') || content.includes('Nombre Completo') || content.includes('correo@ejemplo.com')) {
    console.log('ÌæØ Formulario detectado en:', filePath);
    
    // 1. Inyectar variables de estado rut e invitados
    if (!content.includes('const [rut')) {
      content = content.replace(
        /const \\[email,\s*setEmail\\]\s*=\s*useState\\((.*?)\\);/g,
        `const [email, setEmail] = useState($1);\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
      );
    }

    // 2. Pasar rut e invitados en la peticion API
    content = content.replace(/body:\s*JSON\.stringify\\(\{([\s\S]*?)\}\\)/g, (m, inner) => {
      if (!inner.includes('rut')) {
        return `body: JSON.stringify({ ${inner.trim()}, rut, invitados })`;
      }
      return m;
    });

    // 3. Inyectar los campos visuales en el formulario JSX
    if (!content.includes('RUT o RUT Tributario')) {
      const inputsHtml = `
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">RUT o RUT Tributario *</label>
              <input type="text" required placeholder="Ej: 76.543.210-K / 12.345.678-9" value={rut} onChange={(e) => setRut(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Correos de Invitados Adicionales (Opcional)</label>
              <input type="text" placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl" value={invitados} onChange={(e) => setInvitados(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
              <span className="text-[10px] text-gray-500">Separa varios correos por coma. Recibir√°n la clave de acceso.</span>
            </div>`;

      if (content.includes('Correo Electr√≥nico')) {
        content = content.replace(/(<div[^>]*>[\s\S]*?<label[^>]*>[\s\S]*?Correo Electr√≥nico[\s\S]*?<\/div>)/i, `${inputsHtml}\n$1`);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('‚úî Vista actualizada correctamente en:', filePath);
  }
});
