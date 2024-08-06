var nickname;
var vminValue = Math.min(window.innerWidth, window.innerHeight) / 100;
var vmaxValue = Math.max(window.innerWidth, window.innerHeight) / 100;
let nicknameElement;
const avatarElement = document.getElementById("user-avatar");
const balanceElement = document.getElementById("user-balance");
let userInfo = document.getElementById("user-info");
let ProfileBlock = document.getElementById("profile-block");
let avatarWidth = setWidthEqualToHeight(avatarElement);
// Изменение статуса дискорда в лобби
const { UpdatingActivity } = window.api;

UpdatingActivity("Сидит в лобби")

fetch('user/data.json')
    .then(response => response.json())
    .then(data => {

        // Nickname
        nickname = data["nickname"]
        document.getElementById("user-nickname").innerText = nickname;
        console.log(nickname);
        nicknameElement = document.getElementById("user-nickname");
        nicknameWidth = nicknameElement.offsetWidth;

        // avatar
        if (data["avatar"]) {
            avatarElement.rsc = "user/avatar/" + data["avatar"];
            avatarElement.style["background-image"] = 'url("user/avatar/' + data["avatar"] + '")';
        }
        else {
            switch (data["sex"]) {
                case "male":
                    avatarElement.style["background-image"] = 'url("user/avatar/M.png")';
                    break;
                case "female":
                    avatarElement.style["background-image"] = 'url("user/avatar/F.png")';
                    break;
                default:
                    avatarElement.style["background-image"] = 'url("user/avatar/U.png")';
                    break;
            }
        }
    })
    .then(() => {
        // Правильное расположение элементов в мини-профиле пользователя
        avatarElement.style.left = (0.1 * avatarWidth) / vminValue + "vmin";
        nicknameElement.style.left = (0.2 * avatarWidth + avatarWidth) / vminValue + "vmin";
        userInfo.style.width = balanceElement.style.left = (1.2 * avatarWidth + nicknameWidth) / vminValue + "vmin";
    })
    .then(() => {
        // Фикс тупого бага
        ProfileBlock.style.width = (userInfo.offsetWidth + balanceElement.offsetWidth + 0.15 * avatarWidth) / vminValue + "vmin";
    })
    .catch(error => console.error('Error fetching the JSON:', error));

// Если пользователь нажимает на Старт
const button = document.getElementById('start-button');
button.addEventListener('click', function() {
    localStorage.setItem("startedNovel", window.folder_name_of_chosen_novel)
    window.location.href = `novels/${window.folder_name_of_chosen_novel}/start.html`; // Ссылка на стартовый файл новеллы
});


function setWidthEqualToHeight(element) {
    if (element) {
        let heightInPixels = element.offsetHeight;
        let elementNewWidth = heightInPixels / vminValue;
        element.style.width = elementNewWidth + 'vmin';
        return element.offsetWidth
    }
}

// листать весь фон
const scrollableBlock = document.getElementById('novel-select');
  const outerContainer = document.getElementById('menu');

  scrollableBlock.addEventListener('scroll', () => {
    // Получаем текущую вертикальную прокрутку внутреннего блока
    const scrollTop = scrollableBlock.scrollTop;
    
    // Устанавливаем позицию фона родительского контейнера
    outerContainer.style.backgroundPositionY = `${-scrollTop}px`;
  });