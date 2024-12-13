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
//======= Обработчики функций сервера =====

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
