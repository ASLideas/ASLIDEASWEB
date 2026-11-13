const fs = require('fs');

const filePaths = ['./app/contacto/page.tsx', './src/app/contacto/page.tsx'];

filePaths.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes("'use client'") && !content.includes('"use client"')) {
    content = `'use client';\n` + content;
  }

  if (!content.includes("import { useState }")) {
    content = `import { useState } from 'react';\n` + content;
  }

  if (!content.includes('const [rut,')) {
    content = content.replace(
      /(export\s+default\s+function\s+[A-Za-z0-9_]*\s*\\([^)]*\\)\s*\{)/,
      `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✔ Archivo contacto corregido:', filePath);
});
