/*
 * Данный код является основным в сервере. 
 * Здесь происходят взаимодействия функций.
*/
//==== Объявление библиотек =====
#include "LittleFS.h"
#include "ArduinoJson.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <SD.h>

//======= Включение файлов =======
#include "headers/blinker.h"
#include "headers/amogus.h"
#include "headers/creatBut.h"
#include "headers/rmDir.h"
#include "headers/getPage.h"
#include "headers/readers/sdReader.h"
//#include "headers/readers/fsReader.h" //объявлна в getPage.h
#include "headers/netFunc/clear.h"
#include "headers/netFunc/takePostDir.h"
#include "headers/netFunc/takePostFile.h"
#include "headers/netFunc/takePostText.h"

//====== Глобальные переменные ====
const char *ssid="TimsServer";//имя 
const char *password ="12345678";//пароль 

ESP8266WebServer server(80);

String myDir = "/";
String openedFile = "";

unsigned long lastBlink = 0;
int flag = 0;
int fastBlinks = 0;
////////////// НАСТРОЙКИ /////////////
void setup (){
  Serial.begin(115200);

  while(!Serial){}//ждем serial

  Serial.print("Initializing SD card...");
  if(!SD.begin(4)) Serial.println("initialization failed!");
  Serial.println("initialization SD card done.");

  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid, password);

  server.on("/", winOpen);//первая загрузка
  server.on("/q", HTTP_POST, handleData);//принимает текст 
  server.on("/bf", HTTP_POST, handleFile);//создает файл
  server.on("/bd", HTTP_POST, handleDir);//создает директорию
  server.on("/h", HTTP_POST, toHome);//кнопка назад
  server.on("/f", HTTP_POST, openFile);//открытие файла
  server.on("/c", HTTP_POST, clear);//удаление файла
  server.on("/a", about);//открытие описания
  server.begin();
  Serial.println("Access Point started");

  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
}

//======= основной цикл программы =======
void loop(){
  server.handleClient();

  unsigned long currentMillis = millis();
  if(flag==0){
    if(currentMillis - lastBlink > 5000){
      lastBlink = currentMillis;
      flag=1;
      digitalWrite(2, LOW);
    }
  }
  if(flag>0){
    if(currentMillis - lastBlink > 1){
      flag=0;
      digitalWrite(2, HIGH);
      lastBlink = currentMillis;
    }
  }
}

//////////////// ФУНКЦИИ //////////
//Срабатывают при запросе клиента//
//   и сразу отправляют ответ.   //
// Выполняют действия на сервере //
// Большинство функций в /headers//
///////////////////////////////////
//===== открывает интерфейс ===========
void winOpen(){
  server.send(200, "text/html", getPage(myDir));
}

//====== открытие информации ==========
void about(){
  server.send(200, "text/html", FsReader("about.html"));
}

//======== Первое срабатывание ========
void handleData() {
  server.send(200, "text/plain", takePostText(myDir, openedFile, server.arg("plain")));
}

//===== нажатие на создание файла =====
void handleFile(){
  server.send(200, "text/plain", takePostFile(myDir, server.arg("plain")));
}

//==== На создание директории ======
void handleDir(){
  server.send(200, "text/plain", takePostDir(myDir, server.arg("plain")));
}

//======== Возвращение назад =======
void toHome(){
  server.send(200, "text/plain", "Вы вернулись назад");
  myDir = rmLastDir(myDir, 1);
  openedFile = "";
}

//=========== Удаление =============
void clear(){
  server.send(200, "text/plain", delDirFile(myDir, server.arg("plain")));
  blinker(2, 6, 25, 25, 1);
}

//=== открытие файла/директории ====
void openFile(){
  server.send(200, "text/plain", openFileFunc());
  blinker(2, 1, 50, 50, 1);
}
//____________________________________
//Эта функция изменяет глобал переменные, так что она в основном файле
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
  openedFile = dataFile;
  return dataInFile;
}
