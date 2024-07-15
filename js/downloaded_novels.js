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
    
    const novelsList = await getDirectories('C:/Users/1/Projects/StoryWeaver/novels');
    novelsList.forEach((novel_folder_name, index) => {
        let originalName, description, translatedNames, likes, views;
        let novelData;
        const NovelPreview = document.createElement('div');
        const PreviewImageBlock = document.createElement('div');
        const shadow = document.createElement('div');
        const previewImage = document.createElement('img');
        const NovelPreviewName = document.createElement('span');
        // новый контейнер в родительский контейнер
        previewContainer.appendChild(NovelPreview);
        NovelPreview.appendChild(PreviewImageBlock);
        NovelPreview.appendChild(NovelPreviewName);
        PreviewImageBlock.appendChild(shadow);
        PreviewImageBlock.appendChild(previewImage);
        
        // общий стиль
        NovelPreview.classList.add('novel-preview');
        PreviewImageBlock.classList.add('preview-image-block');
        previewImage.classList.add('preview-image');
        shadow.classList.add('shadow');
        NovelPreviewName.classList.add('novel-preview-name');
        NovelPreviewName.classList.add('novel-preview-name');
        // preview image path
        previewImage.src = `novels/${novel_folder_name}/preview/preview.jpg`;
        // add novel name
        fetch(`C:/Users/1/Projects/StoryWeaver/novels/${novel_folder_name}/preview/info.json`)
        .then(response => response.json())
        .then(data => {
            // NovelPreviewName.innerText = data["original-name"];
            [originalName, description, translatedNames, likes, views] = ["original-name", "translated-names", "description", "likes", "viewes"].map(i => data[i]);
            // originalName = data["original-name"];
            // novelData = data;
            NovelPreviewName.innerText = originalName;
            // novel selected
            const novelNameElement = document.getElementById("novel-name")
            NovelPreview.addEventListener('click', function(event) {
                console.log('Div clicked!', event, index);
                novelNameElement.innerText = originalName;
        });
        });
        // styles
        NovelPreview.style.top = Math.floor(index/4) * 29.9322916666875 + 10.470833333099998 + "vw";
        NovelPreview.style.left = (index % 4) * 21.25 + (index % 4 + 1) * 3 + "%";
        NovelPreview.style.height = NovelPreview.offsetWidth * 100 * 29 / 17 / window.innerWidth + "vw";
        PreviewImageBlock.style.height = NovelPreview.offsetWidth * 100 * 24 / 17 / window.innerWidth * 0.909 + "vw";
        PreviewImageBlock.style.top = parseFloat(PreviewImageBlock.style.height) * 0.05 + "vw";
        const novelPreviewName_normalTop = (PreviewImageBlock.offsetTop + PreviewImageBlock.offsetHeight) * 100 / window.innerHeight + 0.5;
        // const тovelPreviewName_hoveredlTop = (PreviewImageBlock.offsetTop + PreviewImageBlock.offsetHeight) * 110 / window.innerHeight + 0.5;
        const novelPreviewName_hoveredlTop = novelPreviewName_normalTop * 1.05 ;
        NovelPreviewName.style.top = novelPreviewName_normalTop + "vmin";
        PreviewImageBlock.addEventListener('mouseout', () => {
            NovelPreviewName.style.transform = '';
            NovelPreviewName.style.top = novelPreviewName_normalTop + "vmin";
        });
        NovelPreviewName.innerText = originalName;
        PreviewImageBlock.addEventListener('mouseover', () => {
            NovelPreviewName.style.top = novelPreviewName_hoveredlTop + "vmin";
        });
    });
};

f()

