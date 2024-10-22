#include <SD.h>
#include "ArduinoJson.h"

String takePostFile(String myD, String data) {
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

  if (!SD.exists(myD + dataFile)) {
    File f1 = SD.open(myD + dataFile, FILE_WRITE);
    if (!f1) return "Не удалось создать файл";
    f1.write("Введите текст сюда...");
    f1.close();
    return "Создан файл: " + dataFile;
    }
  else
    return dataFile + " - Этот файл/директория уже существует";
  return "Во время создания файла что-то пошло не так";
}
