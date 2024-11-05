/*
Создает html страницу сервера, 
содержащую окно для ввода и кнопки-файлы
*/
#include "readers/fsReader.cpp"
String getPage(String myD){
  String page =
  "<!DOCTYPE html>"
  "<html lang='ru'>"
  "<head>"
  "<meta charset='UTF-8'>"
  "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
  "<title>Servak</title>"
  "<style>" +
    FsReader("style.css") +
  "</style>"
  "<body id='gradient'>"
  "<div class='form-container'>"
  "<h2 style='align:center;'>Добро пожаловать!</h2>"
  "<p><button id='about'>Об устройстве</button><p>"
  "<hr><h3>Текущая директория:" +
  myD + "</h3><p>"
  "<h3>Открытый файл:</h3><input id='openFileName' readonly><p><hr>"
  "<button id='changeMode'>Сменить редактор</button>"
  "<div id='wordContainer'>"
    "<div type='l1'>"
      "<textarea class='input-area' id='inputArea' autocomplete = 'on'></textarea>"
    "</div>"
      "<div class='controls'>"
        "<button name='textControls' id='textSize'>Размер</button>"
        "<a id=textSizeValue>10</a><p>"
        "<button name='textControls' id='textColor'>Цвет</button>"
        "<a id=textControlsValue>Черный</a><p>"
        "<button name='textControls' id='textStyle'>Стиль</button>"
        "<a id=textControlsValue>Обычный</a><p>"
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
  FsReader("script.js") +
  FsReader("background.js") +
  "</script></body></html>";
  return page;
}
