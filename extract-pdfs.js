const fs = require('fs');
const pdf = require('pdf-parse');
const path = require('path');

async function extract() {
  const dir = 'd:\\Next js\\Majestique Evolvus';
  const files = [
    'Evolvus Brochure.pdf',
    'Evolvus  E - brochure.pdf',
  ];
  
  for (const file of files) {
    try {
      const dataBuffer = fs.readFileSync(path.join(dir, file));
      const data = await pdf(dataBuffer);
      console.log(`\n\n--- CONTENT OF ${file} ---\n`);
      console.log(data.text.substring(0, 5000));
    } catch(e) {
      console.log(`Error reading ${file}:`, e);
    }
  }
}

extract();
