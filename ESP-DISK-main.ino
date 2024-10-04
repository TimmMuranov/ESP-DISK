/* 04.10.2024 Муранов тимофей
Данный код является основным в сервере. 
Здесь происходят главные взаимодействия функций.
*/
//==== Объявление библиотек =====
#include "LittleFS.h"
#include "ArduinoJson.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <SD.h>

//======= Включение файлов =======
#include "headers/amogus.h"
#include "headers/fsReader.h"
#include "headers/creatBut.h"
#include "headers/sdReader.h"
#include "headers/rmDir.h"
#include "headers/takePostText.h"

//====== Глобальные переменные ====
const char *ssid="TimsServer";//имя 
const char *password ="12345678";//пароль 

ESP8266WebServer server(80);

String myDir = "/";
String openedFile = "";
String command = "";

String buttons = "";

////////////// НАСТРОЙКИ /////////////
void setup (){
  Serial.begin(115200);

  while(!Serial){}//ждем serial

  Serial.print("Initializing SD card...");
  if(!SD.begin(4)) Serial.println("initialization failed!");
  Serial.println("initialization SD card done.");

  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);

  server.on("/", winOpen);
  server.on("/q", HTTP_POST, handleData);
  server.on("/bf", HTTP_POST, handleFile);
  server.on("/bd", HTTP_POST, handleDir);
  server.on("/h", HTTP_POST, toHome);
  server.on("/f", HTTP_POST, openFile);
  server.on("/c", HTTP_POST, clear);
  server.on("/a", about);
  server.begin();
  Serial.println("Access Point started");

  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
}

//======= основной цикл программы =======

void loop(){
    server.handleClient();
    if (command == "amogus"){
      amogus();
      command = "";
    }
  }

//////////////// ФУНКЦИИ //////////////

//========== Функция начала ===========
//срабатывает при запуске сервера
void winOpen(){
  server.send(200, "text/html", getPage());
  Serial.println ("connected to server!");
}

//========= Обработка текста ==========
//срабатывает при запросе
//и сразу отправляет ответ

void handleData() {
  server.send(200, "text/plain", takePostText(myDir, openedFile, server.arg("plain")));
  Serial.println("handleData сработал");
}

//===== нажатие на создание файла =====

void handleFile(){
  server.send(200, "text/plain", takePostFile());
  Serial.println("Вы нажали на создание файла");
}

//_________ Обработка нажатия _________

String takePostFile() {
  String data = server.arg("plain");
  if (data == "") {
    return "Пустой запрос";
    Serial.println("Нет отправляемых данных.");
  }
  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    Serial.println("Не получилось спарсить...");
    return "Не получилось парсить";
  }
  String dataFile = doc["data"];
  
  if (dataFile == "") {
    return "Вы не ввели название файла";
  }
  
  if (!SD.exists(myDir + dataFile)) {
    File f1 = SD.open(myDir + dataFile, FILE_WRITE);
    if (!f1) return "Не удалось создать файл";
    f1.write("Введите текст сюда...");
    f1.close();
    return "Создан файл: " + dataFile;
    }
  else
    return dataFile + " - Этот файл/директория уже существует";
  return "Во время создания файла что-то пошло не так";
}
//==== На создание директории ======

void handleDir(){
  server.send(200, "text/plain", takePostDir());
  Serial.println("Вы нажали на создание директории");
}
//________ Обработка нажатия _________

String takePostDir(){
  String data = server.arg("plain");
  if (data == "") {
    return "Пустой запрос";
    Serial.println("Нет данных.");
  }

  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    Serial.println("не удалось парсить");
    return "failed to parse JSON";
  }
  String dataFile = doc["data"];
  if (dataFile == "") return "Вы не ввели название директории";
  
  File file = SD.open(myDir);
  if (SD.exists(myDir + dataFile)){
    File f = SD.open(myDir + dataFile);
    if (f.isDirectory()){
      f.close();
      file.close();
      return "Такая директория уже есть";
    }
    f.close();
  }
  if (SD.mkdir(myDir + dataFile)){
    file.close();
    return "Создана директория: " + dataFile;
  }
  return "Во время создания директории что-то пошло не так...";
}

//======== Возвращение назад ========
void toHome(){
  server.send(200, "text/plain", "Вы вернулись назад");
  myDir = rmLastDir(myDir, 1);
  openedFile = "";
  Serial.println("вы вернулись назад");
}

//=========== Удаление ==============
void clear(){
  server.send(200, "text/plain", deleteFileOrEmptyDir());
}
//____________________________________
String deleteFileOrEmptyDir() {
  String data = server.arg("plain");
  if (data == "") {
    return "Пустой запрос";
    Serial.println("Нет данных.");
  }
  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    Serial.println("не удалось парсить");
    return "failed to parse JSON";
  }
  String dataFile = doc["data"];
  String path = myDir + dataFile;
    File file = SD.open(path);
    if (!file) return "Папки или файла " + dataFile + " нет в этой директории";
    if (file.isDirectory()) {
        File dirCheck = file.openNextFile();
        if (!dirCheck) {
            SD.rmdir(path);
            return "Удалена пустая папка";
        } else {
            dirCheck.close();
            return "Директория не пустая";
        }
    } else {
        SD.remove(path);
        return "Файл удален";
    }
    file.close();
}

//=====================================
void openFile(){
  server.send(200, "text/plain", openFileFunc());
}
//____________________________________
String openFileFunc(){
  String data = server.arg("plain");
  if (data == "") {
    return "Пустой запрос";
    Serial.println("Нет данных.");
  }
  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    Serial.println("не удалось парсить");
    return "failed to parse JSON";
  }
  
  String dataFile = doc["fileName"];
  if (dataFile == "") return "Эта кнопка пустая. Хз, как так...";
  if(!SD.exists(myDir + dataFile)) return "Этого файла нет, хз как так";
  File file = SD.open(myDir + dataFile);
  if (file.isDirectory()){
    myDir += dataFile + "/";
    openedFile = "";
    Serial.println ("Вы перешли в директорию " + dataFile);
    return "";
  }
  
  String dataInFile(sdReader(myDir, dataFile));
  Serial.println(dataInFile + " от функции openFileFunc");
  openedFile = dataFile;
  return dataInFile;
}

//=====================================
void about(){
  server.send(200, "text/html", FsReader("about.html"));
}

//=====================================
String getPage(){
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
  myDir + "</h3>"
  "<textarea rows='10' cols='50' id='inputArea' autocomplete = 'on'></textarea>"
  "<button class='btn-creatC' id='clear'>Удалить файл</button>"
  "<button class='btn-submit' id='submitButton'>Сохранить</button>"
  "<button class='btn-creatF' id='creatFile'>Создать файл</button>"
  "<button class='btn-creatD' id='creatDir'>Создать папку</button>"
  "</div><hr>" +
  creatBut(myDir) +
  "<script>" +
  FsReader("script.js") +
  "</script></body></html>";
  return page;
}
