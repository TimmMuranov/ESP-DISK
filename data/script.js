//====== часто встречающиеся объекты =====
const inputArea = document.getElementById('inputArea');
const textNameArea = document.getElementById('openFileName');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const wordContainer = document.getElementById('wordContainer');
const paintContainer = document.getElementById('paintContainer')

//==== Установка сохраненных значений ====
if(localStorage.getItem('text') !== null) inputArea.value = localStorage.getItem('text');
if(localStorage.getItem('textName') !== null) textNameArea.value = localStorage.getItem('textName');

if(localStorage.getItem('editorMod') !== null) {
    if(localStorage.getItem('editorMod') === 'paint'){
        paintContainer.style.display = "block";
        wordContainer.style.display = "none";
    }
    else{
        paintContainer.style.display = "none";
        wordContainer.style.display = "block";
    }
}
else{
    paintContainer.style.display = "none";
    wordContainer.style.display = "block";
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
document.getElementById('changeMode').addEventListener('click', async () => {
    if (wordContainer.style.display === "block"){
        wordContainer.style.display = "none";
        paintContainer.style.display = "block";
        localStorage.setItem('editorMod', 'paint');
    }
    else if (document.getElementById('paintContainer').style.display === "block"){
        wordContainer.style.display = "block";
        paintContainer.style.display = "none";
        localStorage.setItem('editorMod', 'text');
    }
    else{
        paintContainer.style.display = "none";
        wordContainer.style.display = "block";
    }
    //==== удаление сохраненных значений и очистка ====
    if(localStorage.getItem('text') !== null) localStorage.removeItem('text');
    if(localStorage.getItem('textName') !== null) localStorage.removeItem('textName');
    if(localStorage.getItem('canvasData') !== null) localStorage.removeItem('canvasData');
    inputArea.value = '';
    textNameArea.value = '';
    
    ctx.fillStyle = '#ffffff';//заполняем канву белым.
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    await fetchForm("/cs", "close");//закрываем все файлы в директории
    //location.reload();
})

document.getElementById('submitButton').addEventListener('click', async () => {
    let data;
    if (paintContainer.style.display === "block"){
        data = canvas.toDataURL("image/jpeg", 0.1);
        localStorage.setItem('canvasData', data);
    }
    else if(document.getElementById('wordContainer').style.display === "block"){
        data = inputArea.value + 'n';
        localStorage.setItem('text', data);
    }

    let answer =  await fetchForm('/q', data);
    alert(answer);
});

document.getElementById('creatFile').addEventListener('click', async () => {
    let data = prompt('Введите имя нового файла');
    if(data === null){
        alert("Ок. Отменяем.");
        return;
    }
    else if(data === ""){
        alert("Вы не ввели название");
        return;
    }
    if(document.getElementById('paintContainer').style.display === "block"){
        data += ".jpeg";
    }
    else if(document.getElementById('wordContainer').style.display === "block"){
        data += ".txt";
    }
    let answer = await fetchForm('/bf', data);
    alert(answer);
    location.reload();
});

document.getElementById('creatDir').addEventListener('click', async () => {
    const data = prompt('Введите имя новой директории');
    if(data == null){
        alert("Создание директории отменено.");
    }
    else{
        let answer = await fetchForm('/bd', data);
        alert(answer);
        location.reload();
    }
});

document.getElementById('Home').addEventListener('click', async () => {
    await fetchForm("/cs", "close");
    let answer = await fetchForm('/h', "toHome");
    inputArea.value = '';
    textNameArea.value = '';
    if (localStorage.getItem('text') !== null) localStorage.removeItem('text');
    if (localStorage.getItem('textName') !== null) localStorage.removeItem('textName');
    location.reload();
});

document.getElementById('clear').addEventListener('click', async () => {
    const data = prompt('Введите имя файла или директории');
    if(data===null){
        alert('Удаление отменено.');
        return;
    }
    let answer = await fetchForm('/c', data);
    alert(answer);
    location.reload();
});

document.getElementById('about').addEventListener('click', function () {
    window.location.href = "/a";
})
//==== Обработка кнопок-файлов =====
document.querySelectorAll('button').forEach((button) => {
    let fileName = button.innerHTML;
    if (button.getAttribute('name') === 'fileButtons') {
        if (button.getAttribute('id') === 'dirs'){
            button.addEventListener('click', async () => {
                await fetchForm("/cs", "close");
                let answer = await fetchForm('/f', fileName);
                inputArea.value = '';
                textNameArea.value = '';
                if (localStorage.getItem('text') !== null) localStorage.removeItem('text');
                if (localStorage.getItem('textName') !== null) localStorage.removeItem('textName');
                location.reload();
            })
        }
        else if(button.getAttribute('id') === 'files'){
            button.addEventListener('click', async () => {
                let answer = await fetchForm('/f', fileName);

                if(fileName.endsWith(".txt")){
                    wordContainer.style.display = "block";
                    paintContainer.style.display = "none";
                    localStorage.setItem('editorMod', 'word');

                    inputArea.value = answer;

                    localStorage.setItem('text', answer);
                }
                else if(fileName.endsWith(".jpeg")){
                    wordContainer.style.display = "none";
                    paintContainer.style.display = "block";
                    localStorage.setItem('editorMod', 'paint');

                    var img = new Image;
                    img.src = answer;
                    img.onload = function () {
                        ctx.drawImage(img, 0, 0);
                    }

                    localStorage.setItem('canvasData', answer);
                }
                else{
                    alert("Неизвестный формат.");
                }
                textNameArea.value = fileName;
                localStorage.setItem('textName', fileName);
            })
        }
    }
})

document.getElementById('textControlsValue').addEventListener('click', function () {
    if(document.getElementById('textControlsValue').textContent === "default"){
        document.getElementById('textControlsValue').textContent = "courier";
        inputArea.style.fontFamily = "courier";
        document.getElementById('textControlsValue').style.backgroundColor = "lightBlue";
    }
    else if(document.getElementById('textControlsValue').textContent === "courier"){
        document.getElementById('textControlsValue').textContent = "cursive";
        inputArea.style.fontFamily = "cursive";
        document.getElementById('textControlsValue').style.backgroundColor = "aqua";
    }
    else{
        document.getElementById('textControlsValue').textContent = "default";
        inputArea.style.fontFamily = "none";
        document.getElementById('textControlsValue').style.backgroundColor = "gray";
    }
})

document.getElementById('textTheme').addEventListener('click', function () {
    if(document.getElementById('textTheme').textContent === "light"){
        document.getElementById('textTheme').textContent = "dark";
        document.getElementById('textTheme').style.backgroundColor = "Gray";
        inputArea.style.backgroundColor = "black";
        inputArea.style.color = "white";
    }
    else{
        document.getElementById('textTheme').textContent = "light";
        document.getElementById('textTheme').style.backgroundColor = "lightGray";
        inputArea.style.backgroundColor = "white";
        inputArea.style.color = "black";
    }
})

//======== функции рисовалки ====================
let drawing = false;
let mode; // 'free' for free drawing, 'eraser' for eraser
let lastX = 0;
let lastY = 0;

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
    } else{
        ctx.strokeStyle = "white";
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    lastX = x;
    lastY = y;
}

function getCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX || (e.touches && e.touches[0].clientX)) - rect.left) * (canvas.width / rect.width);
    const y = ((e.clientY || (e.touches && e.touches[0].clientY)) - rect.top) * (canvas.height / rect.height);
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
        const dataUrl = BigInt(document.getElementById("canvas").toDataURL('image/png', 0.5));
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

async function fetchForm (inUrl, inData){
    const url = inUrl;
    const data = inData;
    try {// Отправляем данные на сервер и сохраняем ответ
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
        });
        console.log('Данные отправлены на сервер:\n' + data);
        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            console.error('Ошибка сервера: ' + response.statusText);
        }
        // Получаем ответ от сервера
        const serverResponseText = await response.text();
        return serverResponseText;
    } catch (error) {
        console.error('Ошбка отправки данных: ', error);
    }
    console.log("Функция fetchForm завершилась:\n"+serverResponseText);
}
