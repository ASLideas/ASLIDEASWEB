const fs = require('fs');

const targets = ['./app/contacto/page.tsx', './src/app/contacto/page.tsx'];

targets.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Asegurar 'use client'; al inicio
  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    content = `'use client';\n` + content;
  }

  // 2. Limpiar e insertar import { useState } único
  let lines = content.split('\n').filter(l => !(l.includes('import') && l.includes('useState') && l.includes('react')));
  lines.unshift("import { useState } from 'react';");
  if (!lines[0].includes('use client')) {
    lines.unshift("'use client';");
  }
  content = lines.join('\n');

  // 3. Inyectar const [rut, setRut] y const [invitados, setInvitados] dentro de la función del componente
  if (!content.includes('const [rut,')) {
    content = content.replace(
      /(export\s+default\s+function\s+\w*[\s\S]*?\{)/,
      `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✔ Archivo contacto corregido exitosamente:', filePath);
});
