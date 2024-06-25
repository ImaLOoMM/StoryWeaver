fetch('user/data.json')
            .then(response => response.json())
            .then(data => {
                // avatar
                avatar = document.getElementById("avatar");
                if (data["avatar"]) {
                    avatar.rsc = "user/avatar/" + data["avatar"];
                    avatar.style["background-image"] = 'url("user/avatar/' + data["avatar"] + '")';
                }
                else {
                    switch (data["sex"]) {
                        case "male":
                            avatar.style["background-image"] = 'url("user/avatar/M.png")';
                            break;
                        case "female":
                            avatar.style["background-image"] = 'url("user/avatar/F.png")';
                            break;
                        default:
                            avatar.style["background-image"] = 'url("user/avatar/U.png")';
                            break;
                    }
                }

                // Nickname
                document.getElementById("nickname").innerText = data["nickname"]
                
            })
            .catch(error => console.error('Error fetching the JSON:', error));


// Если пользователь нажимает на Старт
const button = document.getElementById('start-button');
button.addEventListener('click', function() {
    window.location.href = 'novels/prototype_v1/start.html'; // Временно ссылка статичная
});

// Изменение статуса дискорда в лобби
const { UpdatingActivity, setActivity} = require("./js/discord_status")
// setActivity({ details: "Сидит в лобби"})
UpdatingActivity("Сидит в лобби");
