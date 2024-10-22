/*
Эта функция (как и несколько других) принимает
в качестве последнего аргумента результат из server.send,
полученный в основном файле.
 */

#include "ArduinoJson.h"

 String takePostText(String myD, String opF, String data){
  if (data == "") {
    Serial.println("No data received.");
  }
  StaticJsonDocument<100> doc;
  DeserializationError error = deserializeJson(doc, data);
  if (error) {
    Serial.println("Не получилось парсить инфу");
    return "Не получилось парсить";
  }
  String dataFile = doc["data"];
  if(opF != ""){
    if (SD.exists(myD + opF)){
      SD.remove(myD + opF);
      File file = SD.open(myD + opF, FILE_WRITE);
      file.print(dataFile);
      file.close();
      Serial.println(sdReader(myD, opF));
      return "Текст записан в файл " + opF;
    }
    return "запрос получен: " + dataFile + ", но запись не удалась...";
  }
  return "Вы не открыли ни одного файла. Записать текст некуда :'(";
}
