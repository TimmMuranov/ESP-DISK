/* 04.10.2024 Муранов тимофей
Функция FsReader предназначена для работы с LittleFS.
Читает файл в файловой системе МК c названием in.
Возвращает строку, равную содержимому файла.
Предназначена для вытаскивания с ФС html-ек, txt-шек и тд.
*/
#include "LittleFS.h"
#define MAX_BUFFER 256
String FsReader(String in){
  if (!LittleFS.begin()) {
    return "An Error has occurred while mounting LittleFS";
  }
  File fileFS = LittleFS.open(in, "r");
  if (!fileFS) {
    return "Failed to open file for reading";
  }
  String str = "";
  uint8_t buffer[MAX_BUFFER];
  size_t bytesRead;
  do {
    bytesRead = fileFS.readBytes((char *)buffer, sizeof(buffer));

    if (bytesRead > 0) {
      str.concat((char*)buffer, bytesRead);
    }
  } while (bytesRead == sizeof(buffer));
  fileFS.close();
  return str;
}
