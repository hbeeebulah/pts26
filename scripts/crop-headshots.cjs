const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const crops = {
  // Speakers
  'public/speakers/Aameenah Yunus-Ali.jpeg': { extract: { left: 0, top: 0, width: 720, height: 720 } },
  'public/speakers/Abies Sonia.png': { extract: { left: 0, top: 0, width: 516, height: 516 } },
  'public/speakers/Alhaji Ibrahim Salami.jpeg': { extract: { left: 0, top: 0, width: 705, height: 705 } },
  'public/speakers/Coach Mutiat Olasumbo Olagoke.jpeg': { extract: { left: 0, top: 0, width: 720, height: 720 } },
  'public/speakers/Doyinsola Jawando-Adebomehin.jpeg': { extract: { left: 0, top: 0, width: 589, height: 589 } },
  'public/speakers/Dr Mrs Olajobi.jfif': { extract: { left: 40, top: 40, width: 370, height: 370 } },
  'public/speakers/Dr Noimot Abisola Balogun.jpeg': { extract: { left: 20, top: 0, width: 965, height: 965 } },
  'public/speakers/DR. SULAIMON OLAGOKE OGUNMUYIWA.jpeg': { extract: { left: 90, top: 70, width: 630, height: 630 } },
  'public/speakers/Joke Haastrup.png': { extract: { left: 50, top: 120, width: 500, height: 500 } },
  'public/speakers/Joy Deborah Essien.jpeg': { extract: { left: 70, top: 70, width: 630, height: 630 } },
  'public/speakers/Latifah Ajetunmob.jpeg': { extract: { left: 50, top: 100, width: 760, height: 760 } },
  'public/speakers/Moneeloa Chaane.jpeg': { extract: { left: 200, top: 230, width: 680, height: 680 } },
  'public/speakers/Muhammed Husseni.jpeg': { extract: { left: 300, top: 300, width: 3400, height: 3400 } },
  'public/speakers/Nne Oramasionwu.jpeg': { extract: { left: 0, top: 0, width: 1080, height: 1080 } },
  'public/speakers/Odunayo Adegbaju.jpg': { extract: { left: 20, top: 50, width: 800, height: 800 } },
  'public/speakers/Oludipe Sadat Sade.jpeg': { extract: { left: 0, top: 0, width: 1254, height: 1254 } },

  // Team
  'public/team/AY.jpg': { extract: { left: 33, top: 0, width: 635, height: 635 } },
  'public/team/CF.jpg': { extract: { left: 200, top: 200, width: 3000, height: 3000 } },
  'public/team/HB.jpg': { extract: { left: 1000, top: 850, width: 1200, height: 1200 } },
  'public/team/Hameedah.jpg': { extract: { left: 100, top: 200, width: 1700, height: 1700 } },
  'public/team/Shu.jpg': { extract: { left: 68, top: 80, width: 480, height: 480 } },
  'public/team/drTaofeekat.png': { extract: { left: 290, top: 270, width: 500, height: 500 } },
  'public/team/nez.jpg': { extract: { left: 338, top: 0, width: 3324, height: 3324 } },
};

async function processImages() {
  for (const [filePath, config] of Object.entries(crops)) {
    try {
      const tempPath = filePath + '.tmp';
      let img = sharp(filePath);
      
      if (config.extract) {
        img = img.extract(config.extract);
      }
      
      // Resize to standard 500x500 square headshot
      await img.resize(500, 500).toFile(tempPath);
      
      // Overwrite original file
      fs.renameSync(tempPath, filePath);
      console.log(`Successfully cropped and centered headshot: ${filePath}`);
    } catch (err) {
      console.error(`Error processing ${filePath}:`, err.message);
    }
  }
}

processImages();
