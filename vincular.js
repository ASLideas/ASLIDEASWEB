const fs = require('fs');

const files = ['app/page.tsx', 'src/app/page.tsx'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    if (!content.includes('import Header')) {
      if (content.includes("'use client'") || content.includes('"use client"')) {
        content = content.replace(/(["']use client["'];?\s*\n?)/, "$1import Header from '@/components/Header';\n");
      } else {
        content = "import Header from '@/components/Header';\n" + content;
      }
    }

    if (/<header[\s\S]*?<\/header>/i.test(content)) {
      content = content.replace(/<header[\s\S]*?<\/header>/gi, '<Header />');
    } else if (!content.includes('<Header />')) {
      content = content.replace(/(return\s*\(\s*<[^>]+>)/, '$1\n      <Header />');
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('EXITO: Modificado ' + file);
  }
});
