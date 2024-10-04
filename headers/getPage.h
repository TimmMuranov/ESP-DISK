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
  "</style>" +
  "<div class='form-container'>"
  "<h2>Добро пожаловать в ESP8266 сервер!</h2>"
  "<p><button id='about'>Об устройстве</button><p>"
  "<hr><h3>Открытый файл: " +
  myD + "</h3>"
  "<textarea rows='10' cols='50' id='inputArea' autocomplete = 'on'></textarea>"
  "<button class='btn-creatC' id='clear'>Удалить файл</button>"
  "<button class='btn-submit' id='submitButton'>Сохранить</button>"
  "<button class='btn-creatF' id='creatFile'>Создать файл</button>"
  "<button class='btn-creatD' id='creatDir'>Создать папку</button>"
  "</div><hr>" +
  creatBut(myD) +
  "<script>" +
  FsReader("script.js") +
  "</script></body></html>";
  return page;
}
