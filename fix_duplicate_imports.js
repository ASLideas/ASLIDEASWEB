const fs = require('fs');
const path = require('path');

function cleanImports(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  const lines = content.split('\n');
  let hasUseStateImport = false;
  let cleanedLines = [];

  for (let line of lines) {
    if (line.includes("import") && line.includes("useState") && line.includes("react")) {
      if (!hasUseStateImport) {
        hasUseStateImport = true;
        cleanedLines.push("import { useState } from 'react';");
      }
    } else {
      cleanedLines.push(line);
    }
  }

  fs.writeFileSync(filePath, cleanedLines.join('\n'), 'utf8');
  console.log('✔ Importaciones limpiadas en:', filePath);
}

cleanImports('./app/page.tsx');
cleanImports('./src/app/page.tsx');
cleanImports('./app/contacto/page.tsx');
cleanImports('./src/app/contacto/page.tsx');
cleanImports('./app/sala-virtual/page.tsx');
cleanImports('./src/app/sala-virtual/page.tsx');
