const fs = require('fs');

const filePaths = [
  './app/sala-virtual/page.tsx', 
  './src/app/sala-virtual/page.tsx', 
  './app/page.tsx', 
  './src/app/page.tsx'
];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Inyectar los estados de rut e invitados si no existen
  if (!content.includes('const [rut,')) {
    content = content.replace(
      /(export\s+default\s+function\s+\w+[\s\S]*?\{)/,
      `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
    );
  }

  // 2. Incluir rut e invitados en la peticion POST al servidor
  content = content.replace(/body:\s*JSON\.stringify\\(\{([\s\S]*?)\}\\)/g, (match, inner) => {
    if (!inner.includes('rut')) {
      return `body: JSON.stringify({ ${inner.trim()}, rut, invitados })`;
    }
    return match;
  });

  // 3. Insertar visualmente los campos en el formulario de la Sala Virtual
  if (!content.includes('RUT o RUT Tributario')) {
    const rutInputHtml = `
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">RUT o RUT Tributario *</label>
              <input type="text" required placeholder="Ej: 76.543.210-K / 12.345.678-9" value={rut} onChange={(e) => setRut(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Correos de Invitados Adicionales (Opcional)</label>
              <input type="text" placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl" value={invitados} onChange={(e) => setInvitados(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
              <span className="text-[10px] text-gray-500">Separa varios correos por coma. Recibirán la clave de acceso.</span>
            </div>`;

    if (content.includes('Correo Electrónico')) {
      content = content.replace(/(<div[^>]*>[\s\S]*?<label[^>]*>[\s\S]*?Correo Electrónico[\s\S]*?<\/div>)/i, `${rutInputHtml}\n$1`);
    }
  }

  // 4. Limpiar duplicados de importacion useState
  let lines = content.split('\n');
  let seenUseState = false;
  let newLines = [];
  for (let line of lines) {
    if (line.includes("import") && line.includes("useState") && line.includes("react")) {
      if (!seenUseState) {
        seenUseState = true;
        newLines.push("import { useState } from 'react';");
      }
    } else {
      newLines.push(line);
    }
  }
  content = newLines.join('\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✔ Formulario de Sala Virtual actualizado:', filePath);
});
