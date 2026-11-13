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
  let modified = false;

  // Si usa rut o setRut y no está declarado el estado
  if ((content.includes('value={rut}') || content.includes('setRut')) && !content.includes('const [rut,')) {
    content = content.replace(
      /(export\s+default\s+function\s+\w+[\s\S]*?\{)/,
      `$1\n  const [rut, setRut] = useState('');\n  const [invitados, setInvitados] = useState('');`
    );
    modified = true;
  }

  // Asegurar 'use client' e importación de useState si usa el estado
  if (content.includes('useState') && !content.includes("'use client'") && !content.includes('"use client"')) {
    content = `'use client';\n` + content;
    modified = true;
  }

  if (!content.includes("import { useState }") && content.includes("useState(")) {
    content = `import { useState } from 'react';\n` + content;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✔ Estado TypeScript corregido en:', filePath);
  }
});
