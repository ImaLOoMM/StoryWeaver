const fs = require('fs');

function getDirectories(srcPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(srcPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        return reject(err);
      }

      const directories = files
        .filter(file => file.isDirectory())
        .map(file => file.name);

      resolve(directories);
    });
  });
}


const previewContainer = document.getElementById("novel-select");

async function f () {
    const novelsList = await getDirectories('./novels')
    novelsList.forEach((novel_name, index) => {
        const newContainer = document.createElement('div');
        const tryb = document.createElement('div');
        const previewImage = document.createElement('img');
        // новый контейнер в родительский контейнер
        previewContainer.appendChild(newContainer);
        newContainer.appendChild(tryb);
        newContainer.appendChild(previewImage);
        // общий стиль
        newContainer.classList.add('new-container');
        previewImage.classList.add('previewImage');
        previewImage.src = `novels/${novel_name}/preview/preview.jpg`;
        newContainer.style.top = Math.floor(index/4) * 65 + 4 + "%";
        newContainer.style.left = index % 4 * 20 + (index % 4 + 1) * 4 + "%";
    });
};

f()

