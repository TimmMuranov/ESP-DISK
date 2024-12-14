const fileMenue = document.getElementById("fileMenue");//Меню с созданием файлов и самими файлами
const openFileMenue = document.getElementById("openFileMenue");//Кнопка открытия меню файлов
const tableInside = document.getElementById("tableInside");//Див стола
const instruments = document.getElementById("instruments");//Кнопка открытия окна с инструментами
const instWind = document.getElementById("instWind");//Окно с инструментами

const creatText = document.getElementById("ct");//Кнопка создания текста
const creatDir = document.getElementById("cd");//Кнопка создания директории
const creatImg = document.getElementById("ci");//Кнопка создания картинок

fileMenue.style.display = "none";
instrumentsMenue.style.display = "none";
instWind.style.display = "none";
//===== установка значений по умолчанию (требует коррекции) ====
if(localStorage.getItem('text') !== null) inputArea.value = localStorage.getItem('text');
if(localStorage.getItem('textName') !== null) textNameArea.innerHTML = localStorage.getItem('textName');

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

if(localStorage.getItem("textStyle") !== null){
    document.getElementById('textControlsValue').textContent = localStorage.getItem("textStyle");
    inputArea.style.fontFamily = localStorage.getItem("textStyle");
}

if(localStorage.getItem("textTheme") !== null){
    document.getElementById('textTheme').textContent = "dark";
    inputArea.style.backgroundColor = "black";
    inputArea.style.color = "white";
}
else{
    document.getElementById('textTheme').textContent = "light";
    inputArea.style.backgroundColor = "white";
    inputArea.style.color = "black";
}
//===== Обработчики кнопок создания ========
// при нажатии на кнопку htmlBtn, htmlObj переключает видимость
function noneBlock(htmlBtn, htmlObj){
    htmlBtn.addEventListener("click", function(){
        if(htmlObj.style.display === "none"){
            htmlObj.style.display = "block";
        }
        else{
            htmlObj.style.display = "none";
        }
    })
}

//===== Создание нового файла ===============
function creatFiles(button){
    let answer = [2];
    answer[1] = button.id;
    button.addEventListener("click", function(){
        let butId = button.id;

        let fileName = prompt("Введите имя");
        if(fileName === "") {
            alert("Вы не ввели название.");
            return;
        }
        else if(fileName === null){
            alert("Отменяем.");
            return;
        }
    answer[2] = fileName;
    alert("Вы попытались создать файл " + answer[2] + ", нажав на кнопку " + butId);
    // дальнейшая обработка нажатия.
    // массив answer имеет пару "id нажатой кнопки - введенное имя"
    })
}

noneBlock(openFileMenue,fileMenue);
noneBlock(instruments,instrumentsMenue);
creatFiles(creatText);
creatFiles(creatDir);
creatFiles(creatImg);
//======= Функции сервера =====

function downloadFile(){
    alert("Пока что скачивание не работает");
    //перенесу алгоритм скачивания позже
}

function deleteFile(){
    alert("Удалять пока что нечего)");
    //и это тоже
}
function closeFile(){
    alert("Закрываю файл");
    //и это тоже
}

function deleteDir(){
    alert("удаляем (шутка)");
}
function closeDir(){
    alert("Закрываем дир");
    //и это тоже
}

function moreFunctions(){
    console.log("moreFunc is started");
    if(instWind.style.display == "none"){
        instWind.style.display = "block";
        console.log("block");
    }
    else{
        instWind.style.display = "none";
        console.log("none");
    }
}

//====== Функция отправки формы ==============
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

//========= Функция проверки пароли ===============
function pswdCheck(){
    if (localStorage.getItem("pswd") == pswd) return 0;
    let p = prompt("Введи пароль");
    if(p != pswd){
        alert("Неверно");
        return 1;
    }
    localStorage.setItem("pswd", p);
    return 0;
}
