const fileMenue = document.getElementById("fileMenue");
const openFileMenue = document.getElementById("openFileMenue");
const tableInside = document.getElementById("tableInside");
const instruments = document.getElementById("instruments");
const instWind = document.getElementById("instWind");

const creatText = document.getElementById("ct");
const creatDir = document.getElementById("cd");
const creatImg = document.getElementById("ci");

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
