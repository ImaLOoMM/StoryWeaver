const { readdir, IsDir } = window.api;

function getDirectories(srcPath) {
    return new Promise((resolve, reject) => {
      readdir(srcPath, { withFileTypes: true }, (err, files) => {
        if (err) {
          return reject(err);
        }
        console.log(files[0].path + "/" + files[0].name)
        const directories = files
          .filter(file => IsDir(file.path + "/" + file.name))
          .map(file => file.name);
        console.log("directories:\n", directories)
        resolve(directories);
      });
    });
  }


const previewContainer = document.getElementById("novel-select");

async function f () {
    // const novelsList = window.api.pathJoin(__dirname, 'novels');
    const novelsList = await getDirectories('C:/Users/1/Projects/StoryWeaver/novels');
    novelsList.forEach((novel_folder_name, index) => {
        const newContainer = document.createElement('div');
        const tryb = document.createElement('div');
        const previewImage = document.createElement('img');
        const novel_name = document.createElement('span');

        // новый контейнер в родительский контейнер
        previewContainer.appendChild(newContainer);
        newContainer.appendChild(tryb);
        newContainer.appendChild(previewImage);

        // общий стиль
        newContainer.classList.add('new-container');
        previewImage.classList.add('previewImage');
        previewImage.src = `novels/${novel_folder_name}/preview/preview.jpg`;
        newContainer.style.top = Math.floor(index/4) * 29.9322916666875 + 10.470833333099998 + "vw";
        newContainer.style.left = (index % 4) * 21.25 + (index % 4 + 1) * 3 + "%";
        newContainer.style.height = newContainer.offsetWidth * 100 * 24 / 17 / window.innerWidth + "vw";
    });
};

f()

