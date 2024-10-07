/*
Данная функция удаляет с SD-карты 
файл/директорию data из директории myD 
*/
#include <SD.h>

String delDirFile(String myD, String data) {
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
  String path = myD + dataFile;
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
