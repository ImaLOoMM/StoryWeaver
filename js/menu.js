var nickname;
const nicknameElement = document.getElementById("user-nickname");
const avatarElement = document.getElementById("user-avatar");
const balanceElement = document.getElementById("user-balance");

fetch('user/data.json')
    .then(response => response.json())
    .then(data => {

        // Nickname
        nickname = data["nickname"]
        document.getElementById("user-nickname").innerText = nickname


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
        let userInfo = document.getElementById("user-info");
        let ProfileBlock = document.getElementById("profile-block");
        avatarWidth = setWidthEqualToHeight(avatarElement);
        nicknameWidth = nicknameElement.offsetWidth;
        avatarElement.style.left = 0.1 * avatarWidth + "px";
        nicknameElement.style.left = 0.2 * avatarWidth + avatarWidth + "px";
        userInfo.style.width = balanceElement.style.left = 0.2 * avatarWidth + avatarWidth + nicknameWidth + "px"
        ProfileBlock.style.width = userInfo.offsetWidth + balanceElement.offsetWidth + 0.15 * avatarWidth  + "px";
    })
    .catch(error => console.error('Error fetching the JSON:', error));



// Изменение статуса дискорда в лобби
const { UpdatingActivity, setActivity } = require("./js/discord_status")
// setActivity({ details: "Сидит в лобби"})
UpdatingActivity("Сидит в лобби");

// Если пользователь нажимает на Старт
const button = document.getElementById('start-button');
button.addEventListener('click', function() {
    window.location.href = 'novels/prototype_v1/start.html'; // Временно ссылка статичная
});


function setWidthEqualToHeight(element) {
    if (element) {
        var heightInPixels = element.offsetHeight;
        const elementNewWidth = heightInPixels;
        element.style.width = elementNewWidth  + 'px';
        return elementNewWidth;
    }
}

