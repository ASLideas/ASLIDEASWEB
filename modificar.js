const fs = require('fs');

['app/page.tsx', 'src/app/page.tsx'].forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');

    if (content.indexOf("import Header") === -1) {
      if (content.includes("'use client'") || content.includes('"use client"')) {
        content = content.replace(/(["']use client["'];?\s*\r?\n?)/, "$1import Header from '@/components/Header';\n");
      } else {
        content = "import Header from '@/components/Header';\n" + content;
      }
    }

    if (/<header[\s\S]*?<\/header>/i.test(content)) {
      content = content.replace(/<header[\s\S]*?<\/header>/gi, '<Header />');
    } else if (content.indexOf("<Header />") === -1) {
      content = content.replace(/(return\s*\(\s*<[a-zA-Z0-9]+[^>]*>)/, "$1\n      <Header />");
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('EXITO: Modificado ' + file);
  }
});
