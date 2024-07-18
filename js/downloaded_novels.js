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



function activePreviews(parent, index, status) {
    const preview_img_block = parent.querySelector(".preview-image-block");
    const novel_preview_name = parent.querySelector(".novel-preview-name");
    const shadow = preview_img_block.querySelector(".shadow");
    const preview_image = preview_img_block.querySelector(".preview-image");

    if (status) {
        novel_preview_name.style.top = novelPreviewName_hoveredlTop + "vmin";

        preview_image.classList.add("preview-image-block--hover--preview-image");
        shadow.classList.add("preview-image-block--hover--shadow");
        novel_preview_name.classList.add("preview-image-block--hover--novel-preview-name");
    }
    else if (!status & index !== fix_active_statue_on_index) { // не делать неактивной нажатую панель
        novel_preview_name.style.transform = '';
        novel_preview_name.style.top = novelPreviewName_normalTop + "vmin";

        preview_image.classList.add("preview-image");
        shadow.classList.add("shadow");
        novel_preview_name.classList.add("novel-preview-name");

        preview_image.classList.remove("preview-image-block--hover--preview-image");
        shadow.classList.remove('preview-image-block--hover--shadow');
        novel_preview_name.classList.remove("preview-image-block--hover--novel-preview-name");
    }
}



const previewContainer = document.getElementById("novel-select");
var fix_active_statue_on_index = -1;
let novelPreviewName_hoveredlTop;
let novelPreviewName_normalTop;

async function f () {
    
    const novelsList = await getDirectories('C:/Users/1/Projects/StoryWeaver/novels');
    novelsList.forEach((novel_folder_name, index) => {
        let originalName, description, translatedNames, likes, views;
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
            [originalName, description, translatedNames, likes, views] = ["original-name", "translated-names", "description", "likes", "viewes"].map(i => data[i]);
            NovelPreviewName.innerText = originalName;
            // novel selected
            const novelNameElement = document.getElementById("novel-name")
            NovelPreview.addEventListener('click', function(event) {

                

                console.log('novel selected: ', novel_folder_name, );
                novelNameElement.innerText = originalName;
                fix_active_statue_on_index = index
                document.querySelectorAll('.novel-preview').forEach((preview_element, element_index) => {
                    activePreviews(preview_element, element_index, false)
                });
                // activePreviews(NovelPreview, index, true); // кажется оно не надо, но я не уверен...
            });
        });

        // styles
        NovelPreview.style.top = Math.floor(index/4) * 29.9322916666875 + 10.470833333099998 + "vw";
        NovelPreview.style.left = (index % 4) * 21.25 + (index % 4 + 1) * 3 + "%";
        NovelPreview.style.height = NovelPreview.offsetWidth * 100 * 29 / 17 / window.innerWidth + "vw";
        PreviewImageBlock.style.height = NovelPreview.offsetWidth * 100 * 24 / 17 / window.innerWidth * 0.909 + "vw";
        PreviewImageBlock.style.top = parseFloat(PreviewImageBlock.style.height) * 0.05 + "vw";
        novelPreviewName_normalTop = (PreviewImageBlock.offsetTop + PreviewImageBlock.offsetHeight) * 100 / window.innerHeight + 0.5;
        
        novelPreviewName_hoveredlTop = novelPreviewName_normalTop * 1.05 ;
        NovelPreviewName.style.top = novelPreviewName_normalTop + "vmin";

        

        // нет наведения курсора на PreviewImageBlock
        PreviewImageBlock.addEventListener('mouseout', () => {
            activePreviews(NovelPreview, index, false);
        });
        // наведение курсора на PreviewImageBlock
        PreviewImageBlock.addEventListener('mouseover', () => {
            activePreviews(NovelPreview, index, true)
        });
        NovelPreviewName.innerText = originalName;
    });
};

f()

