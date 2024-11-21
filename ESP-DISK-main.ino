#include "LittleFS.h"
#include "ArduinoJson.h"
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SPI.h>
#include <SD.h>
#include "headers/headers.h"
#include "config.h"

ESP8266WebServer server(80);
////////////// НАСТРОЙКИ /////////////
void setup (){
  Serial.begin(115200);
  while(!Serial){}//ждем serial
  if(!SD.begin(4)) Serial.println("initialization failed!");
  WiFi.mode(WIFI_AP);
  #if defined(password) 
     WiFi.softAP(ssid, password);
  #else 
     WiFi.softAP(ssid);
  #endif
  server.on("/", winOpen);//первая загрузка
  server.on("/q", HTTP_POST, handleData);//принимает текст 
  server.on("/bf", HTTP_POST, handleFile);//создает файл
  server.on("/bd", HTTP_POST, handleDir);//создает директорию
  server.on("/h", HTTP_POST, toHome);//кнопка назад
  server.on("/f", HTTP_POST, openFile);//открытие файла
  server.on("/c", HTTP_POST, clear);//удаление файла
  server.on("/a", about);//открытие описания
  server.on("/cs", HTTP_POST, closeFiles);//закрывает все файлы в текущей директории
  server.begin();
  pinMode(2, OUTPUT);
  digitalWrite(2, HIGH);
}

//======= основной цикл программы =======
void loop(){
  server.handleClient();

  unsigned long currentMillis = millis();
  int blinkTime = (fastBlinks > 0) ? 50 : 5000;
  if(flag==0){
    if(currentMillis - lastBlink > blinkTime){
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
      if(fastBlinks) --fastBlinks;
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
  server.send(200, "text/html", getPage(myDir, serverName));
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
  fastBlinks = 3;
}

//=== открытие файла/директории ====
void openFile(){
  server.send(200, "text/plain", openFileFunc());
  fastBlinks = 1;
}
//____________________________________
//Эта функция изменяет глобал переменные, так что она в основном файле
String openFileFunc(){
  String data = server.arg("plain");
  if (data == "") {
    return "Пустой запрос";
  }
  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    return "failed to parse JSON";
  }
  
  String dataFile = doc["data"];
  if (dataFile == "") return "Эта кнопка пустая. Хз, как так...";
  if(!SD.exists(myDir + dataFile)) return "Этого файла нет, хз как так";
  File file = SD.open(myDir + dataFile);
  if (file.isDirectory()){
    myDir += dataFile + "/";
    openedFile = "";
    return "";
  }
  String dataInFile(sdReader(myDir, dataFile));
  openedFile = dataFile;
  return dataInFile;
}

void closeFiles(){
  server.send(200, "text/html", closeFileFunc(myDir));
  openedFile = "";
}
