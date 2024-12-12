/*
Создает html страницу сервера, 
содержащую окно для ввода и кнопки-файлы
*/
#include "readers/fsReader.cpp"
String getPage(String myD, String serverName, String pswd){
String page =
"<!DOCTYPE html>"
"<html lang='ru'>"
"<head>"
"<meta charset='UTF-8'>"
"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
"<title>" + serverName + "</title>"
"<style>" + FsReader("style.css") + "</style>"
"<body id='gradient'>"
"<div class='form-container'>"
"<h2 style='align:center;'>Вы на сервере " + serverName + "</h2>"
"<p><button id='about'>Об устройстве</button><p>"
"<hr><h3>Текущая директория:" +
myD + "</h3><p>"
"<h3>Открытый файл: <a id='openFileName'></a></h3><hr>"
"<button id='changeMode'>Сменить редактор</button>"
"<div id='wordContainer'>"
"<div type='l1'>"
"<textarea class='input-area' id='inputArea' autocomplete = 'on'></textarea>"
"</div>"
"<div class='controls'>"
"<a>Шрифт поля ввода:</a>"
"<button id='textControlsValue' name='textStyle'>default</button><p>"
"<a>Тема:</a>"
"<button id='textTheme' name='textStyle'>light</button>"
"</div>"
"</div>"
"<div id='paintContainer'>"
"<div type='l1'>"
"<canvas id='canvas'></canvas><p>"
"</div>"
"<div class='controls'>"
"<button id='freeDrawBtn' style='background-color: gray'>Ручка</button>"
"<button id='colorSet'>Цвет</button>"
"<input class='rangers' type='range' min='1' max='20' id='brushSize'>"
"<p>"
"<button id='eraserBtn' style='background-color: gray'>Стерка</button>"
"<input class='rangers' type='range' min='1' max='100' step = '2' id='eraserSize'>"
"</div>"
"</div>"
"<button class='btn-creatC' id='clear'>Удалить файл</button>"
"<button class='btn-submit' id='submitButton'>Сохранить на диск</button>"
"<button class='btn-submit' id='DownloadButton'>Скачать файл</button>"
"<button class='btn-creatF' id='creatFile'>Создать файл</button>"
"<button class='btn-creatD' id='creatDir'>Создать папку</button>"
"</div><hr>" +
creatBut(myD) +
"<script>" +
"let pswd = " + pswd + ";" +
FsReader("script.js") +
FsReader("background.js") +
"</script></body></html>";

String pageW2 =
"<!DOCTYPE html>"
"<html>"
"<meta charset='UTF-8'>"
"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
"<style>" + FsReader("styleW2.css") + "</style>"
"<body>"
"<div id='table' title='Здесь пока ничего нет. Откройте или создайте файл для редактирования в файловом меню'></div>"

"<div id='openFileMenue' title='Файловое меню'>"
"    <div class='book'>dirs</div>"
"    <div class='book'>images</div>"
"    <div class='book'>texts</div>"
"</div>"
"<div id='fileMenue'>"
"  <div id='menueDescription'>"
"    <div class='creat' id='cd' title='Создать папку'>+</div>"
"    <div class='creat' id='ci' title='Создать рисунок'>+</div>"
"    <div class='creat' id='ct' title='Создать текст'>+</div>"
"  </div>"

"  <div id='mark'>SD-card:" + myD + "</div>"
+ creatBut(myD) +
"</div>"
"<div id='instruments' title='Инструменты'>&#128736</div>"
"<div id='instrumentsMenue'>"
"  <div id='menueDescription'></div>"
"  <div id='mark'>Для файлов:</div>"
"  <div class='functions' id='green' onclick='downloadFile()'>Скачать</div>"
"  <div class='functions' id='orange' onclick='closeFile()'>Закрыть</div>"
"  <div class='functions' id='red' onclick='deleteFile()'>Удалить</div>"
"  <div id='mark'>Для папок:</div>"
"  <div class='functions' id='orange' onclick='closeDir()'>Выйти</div>"
"  <div class='functions' id='red' onclick='deleteDir()'>Удалить</div>"
"  <hr>"
"  <div class='functions' id='green' onclick='moreFunctions()'>Инструменты редактора</div>"
"  <div id='instWind'>"
"    <div id='mark' onmousedown = 'flexElement('instWind')'>Настройки рисовалки</div>"
"    Размер:"
"    <input class='setRange' type='range' id='penSet'></input>"
"    <hr>"
"    Цвет:"
"    <button id='colorSet'>Цвет</button>"
"    <hr>"
"    Инструмент:"
"    <button id='instSet'>Инструмент</button>"
"    <hr>"
"    <div id='mar'>Настройки писАлки</div>"
"    Шрифт:"
"    <button id='font'>шрифт</button>"
"    <hr>"
"    Тема фона:"
"    <button>дарк</button>"

"  </div>"
"</div>"
"<script>"
"let pswd = " + pswd + ";" +
FsReader("scriptW2.js") +
"</script>"
"</body>"
"</html>";

return pageW2;
//return page;
// Раскоментить нужную версию интерфейса
}
