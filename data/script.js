const inputArea = document.getElementById('inputArea');
const submitButton = document.getElementById('submitButton');
const creatF = document.getElementById('creatFile');
const creatD = document.getElementById('creatDir');
const toHome = document.getElementById('Home');
const clear = document.getElementById('clear');
const buttons = document.querySelectorAll('button');

submitButton.addEventListener('click', async () => {
const data = inputArea.value;
try {// Отправляем данные на сервер и сохраняем ответ
        const response = await fetch('/q', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        console.log('Successfully sent data to server ' + data);
        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            console.log('Ошибка сервера: ' + response.statusText);
            return;
        }
        // Получаем ответ от сервера
        const serverResponseText = await response.text();
        alert(serverResponseText);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
});

creatF.addEventListener('click', async () => {
const data = prompt('Введите имя нового файла');
try {
        const response = await fetch('/bf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        if (!response.ok) {
            console.log('Ошибка сервера: ' + response.statusText);
            return;
        }
        const serverResponseText = await response.text();
        alert(serverResponseText);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
    location.reload();
});

creatD.addEventListener('click', async () => {
const data = prompt('Введите имя новой директории');
try {
        const response = await fetch('/bd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        if (!response.ok) {
            console.log('Ошибка сервера: ' + response.statusText);
            return;
        }
        const serverResponseText = await response.text();
        alert(serverResponseText);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
    location.reload();
});

toHome.addEventListener('click', async () => {
    const data = "toHome";
try {
        const response = await fetch('/h', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        if (!response.ok) {
            console.log('Ошибка сервера: ' + response.statusText);
            return;
        }
        const serverResponseText = await response.text();
        //alert(serverResponseText);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
    location.reload();
});

clear.addEventListener('click', async () => {
    const data = prompt('Введите имя файла или директории');
try {
        const response = await fetch('/c', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        if (!response.ok) {
            console.log('Ошибка сервера: ' + response.statusText);
            return;
        }
        const serverResponseText = await response.text();
        alert(serverResponseText);
    } catch (error) {
        console.error('Error sending data: ', error);
    }
    location.reload();
});

        buttons.forEach((button) => {
            if (button.getAttribute('name') === 'fileButtons') {
                const fileName = button.innerHTML;
                button.addEventListener('click', async () => {
                    try {
                        const response = await fetch('/f', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ fileName })
                        });
                        if (!response.ok) {
                            console.log('Ошибка: '+response.statusText);
                            return;
                        }
                        const serverResponseText = await response.text();
                        inputArea.value = serverResponseText;
                    } catch (error) {
                    console.error('Error sending data: ', error);
                    }
                });
            }
        });
