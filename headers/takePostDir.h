#include <SD.h>
#include "ArduinoJson.h"

String takePostDir(String myD, String data){
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

  File file = SD.open(myD);
  if (SD.exists(myD + dataFile)){
    File f = SD.open(myD + dataFile);
    if (f.isDirectory()){
      f.close();
      file.close();
      return "Такая директория уже есть";
    }
    f.close();
  }
  if (SD.mkdir(myD + dataFile)){
    file.close();
    return "Создана директория: " + dataFile;
  }
  return "Во время создания директории что-то пошло не так...";
}
