//==== переменные графического редактора =====
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let mode; // 'free' for free drawing, 'eraser' for eraser
let lastX = 0;
let lastY = 0;

//====== настройка режима редактора =====
const inputArea = document.getElementById('inputArea');
document.getElementById('paintContainer').style.display = "none";
document.getElementById('wordContainer').style.display = "block";

document.getElementById('changeMode').addEventListener('click', () => {
    if (document.getElementById('wordContainer').style.display === "block"){
        document.getElementById('wordContainer').style.display = "none";
        document.getElementById('paintContainer').style.display = "block";
        localStorage.setItem('editorMod', 'paint');
    }
    else if (document.getElementById('paintContainer').style.display === "block"){
        document.getElementById('wordContainer').style.display = "block";
        document.getElementById('paintContainer').style.display = "none";
        localStorage.setItem('editorMod', 'text');
    }
})
document.getElementById('openFileName').value = '';
inputArea.value = '';
//==== Установка сохраненных значений ====
if(localStorage.getItem('text') !== null) {
    inputArea.value = localStorage.getItem('text');
}
if(localStorage.getItem('textName') !== null) {
    document.getElementById('openFileName').value = localStorage.getItem('textName');
}
if(localStorage.getItem('editorMod') !== null) {
    if(localStorage.getItem('editorMod') === 'paint'){
        document.getElementById('paintContainer').style.display = "block";
        document.getElementById('wordContainer').style.display = "none";
    }
    else{
        document.getElementById('paintContainer').style.display = "none";
        document.getElementById('wordContainer').style.display = "block";
    }
}
if(localStorage.getItem('canvasData') !== null){
    var dataURL = localStorage.getItem('canvasData');
    var img = new Image;
    img.src = dataURL;
    img.onload = function () {
        ctx.drawImage(img, 0, 0);
    };
}

//======== обработчики событий =======
document.getElementById('submitButton').addEventListener('click', async () => {
const data = inputArea.value;
if(document.getElementById('paintContainer').style.display === "block"){
    alert("Сохранение картинок на сервер пока не работает.");
    return;
}
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

document.getElementById('creatFile').addEventListener('click', async () => {
if(document.getElementById('paintContainer').style.display === "block"){
    alert("Создание картинок на сервере пока не работает.");
    return;
}
const data = prompt('Введите имя нового файла');
if(data===null){
    alert("Создание файла отменено.");
    return;
}
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

document.getElementById('creatDir').addEventListener('click', async () => {
const data = prompt('Введите имя новой директории');
if(data===null){
    alert("Создание директории отменено.");
    return;
}
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

document.getElementById('Home').addEventListener('click', async () => {
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
    if (localStorage.getItem('text') !== null) {
        localStorage.removeItem('text');
    }
    if (localStorage.getItem('textName') !== null) {
        localStorage.removeItem('textName');
    }
    location.reload();
});

document.getElementById('clear').addEventListener('click', async () => {
    if(document.getElementById('paintContainer').style.display === "block"){
        let sure = confirm("Вы точно хотите очистить поле?");
        if (sure === null){return;}
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
    }
    const data = prompt('Введите имя файла или директории');
    if(data===null){
        alert('Удаление отменено.');
        return;
    }
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

document.querySelectorAll('button').forEach((button) => {
    if (button.getAttribute('id') === 'about'){
        button.addEventListener('click', async () => {
            window.location.href = "/a";
        })
        return;
    }
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
                    console.log('Ошибка: ' + response.statusText);
                    return;
                }

                if(button.getAttribute('id') === 'dirs'){
                    if (localStorage.getItem('text') !== null) {
                        localStorage.removeItem('text');
                    }
                    if (localStorage.getItem('textName') !== null) {
                        localStorage.removeItem('textName');
                    }
                    location.reload();
                }
                else if(button.getAttribute('id') === 'files'){
                    const serverResponseText = await response.text();
                    inputArea.value = serverResponseText;
                    localStorage.setItem('text', serverResponseText);
                    localStorage.setItem('textName', fileName);
                    inputArea.value = serverResponseText;
                    document.getElementById('openFileName').value = fileName;

                    document.getElementById('wordContainer').style.display = "block";
                    document.getElementById('paintContainer').style.display = "none";
                    localStorage.setItem('editorMod', 'text');

                }
            } catch (error) {
                console.error('Error sending data: ', error);
            }
        });
    }
});

//===============================================
//======== функции рисовалки ====================

ctx.fillStyle = '#ffffff'; //заполняем канву белым.
ctx.fillRect(0, 0, canvas.width, canvas.height);

const brushSizeInput = document.getElementById('brushSize');
const eraserSizeInput = document.getElementById('eraserSize');
const freeDrawBtn = document.getElementById('freeDrawBtn');
const eraserBtn = document.getElementById('eraserBtn');
const colorSet = document.getElementById("colorSet");
const mainColors = ["#000000", "#FF0000", "#008000", "#0000FF", "#FFFF00"];
let colNum = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

freeDrawBtn.addEventListener('click', () => {
    if(mode !== 'free'){
        freeDrawBtn.style = "background-color: gray;border-radius: 30%;";
        eraserBtn.style = "background-color: gray";
        mode = 'free';
        setActiveButton(freeDrawBtn);
    }
    else{
        mode = '';
        freeDrawBtn.style = "background-color: gray";
    }
});
eraserBtn.addEventListener('click', () => {
        if(mode !== 'eraser'){
        freeDrawBtn.style = "background-color: gray";
        eraserBtn.style = "background-color: gray;border-radius: 30%;";
        mode = 'eraser';
        setActiveButton(eraserBtn);
    }
    else{
        mode = '';
        eraserBtn.style = "background-color: gray";
    }
});

function startDrawing(e) {
    drawing = true;
    [lastX, lastY] = getCoordinates(e);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath();
    localStorage.setItem('canvasData', canvas.toDataURL());
}

function draw(e) {
    if (!drawing) return;

    const [x, y] = getCoordinates(e);
    const brushSize = mode === 'eraser' ? eraserSizeInput.value : brushSizeInput.value;

    ctx.lineWidth = mode === 'eraser' ? brushSize : brushSize;
    ctx.lineCap = 'round';

    if (mode === 'free') {
        ctx.strokeStyle = mainColors[colNum];
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if(mode === 'eraser'){
        ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
    }
    lastX = x;
    lastY = y;
}

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX || e.touches[0].clientX) - rect.left)/1.34;
    const y = ((e.clientY || e.touches[0].clientY) - rect.top)/1.34;
    return [x, y];
}

colorSet.style.backgroundColor = mainColors[colNum];
colorSet.style.color = "white";

colorSet.addEventListener('click', () => {
    if(colNum === 4){colNum = 0;}
    else{colNum++;}
    colorSet.style.backgroundColor = mainColors[colNum];
})
//========= функции сохранения =========
document.getElementById("DownloadButton").addEventListener('click', () => {
    if(document.getElementById('paintContainer').style.display === "block"){
        const dataUrl = document.getElementById("canvas").toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        let name = "";
        name = prompt("Введите название вашего шедевра");
        if(name === ""){
            alert("Вы не ввели название.")
            }
        else if (name === null){
            alert("Ну ок. Отмена так отмена :)")
        }
        else{
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        return;
    }
    let textName = prompt("Введите название, под которым хотите сохранить файл");
    if(textName === ''){alert("Вы не ввели название"); return;}
    if(textName === null){alert("Ок. Отменяем :)"); return;}
    let text = inputArea.value;

    let a = document.createElement("a");
    let file = new Blob([text], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = textName + ".txt";
    a.click();
});

