const fs = require('fs');
const filePath = './app/contacto/page.tsx';

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Asegurar la directiva de cliente y useState
  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    content = `'use client';\n` + content;
  }
  if (!content.includes("import { useState }")) {
    content = `import { useState } from 'react';\n` + content;
  }

  // Declarar el estado para rut e invitados si el archivo utiliza esos campos
  if (!content.includes('const [rut,')) {
    content = content.replace(
      /(export\s+default\s+function\s+[A-Za-z0-9_]*\s*\\([^)]*\\)\s*\{)/,
      `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✔ Archivo app/contacto/page.tsx corregido con éxito');
}
