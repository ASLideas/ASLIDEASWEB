const fs = require('fs');

const filePaths = ['./app/contacto/page.tsx', './src/app/contacto/page.tsx'];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Asegurar la directiva 'use client'
  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    content = `'use client';\n` + content;
  }

  // 2. Asegurar la importacion de useState
  if (!content.includes("import { useState }") && !content.includes("import useState")) {
    content = `import { useState } from 'react';\n` + content;
  }

  // 3. Insertar las variables de estado de rut e invitados si faltan
  if (!content.includes('const [rut,')) {
    if (content.includes('const [email')) {
      content = content.replace(
        /(const\s+\[email[\s\S]*?\);)/,
        `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
      );
    } else if (content.includes('const [nombre')) {
      content = content.replace(
        /(const\s+\[nombre[\s\S]*?\);)/,
        `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
      );
    } else {
      content = content.replace(
        /(export\s+default\s+function\s+\w*[\s\S]*?\{)/,
        `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
      );
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✔ Estado de rut e invitados incorporado correctamente:', filePath);
});
