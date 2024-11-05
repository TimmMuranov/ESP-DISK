/**
 * Данная функция закрывает файл file в директории dir,
 */
#include "SD.h"
String closeFileFunc(String dir){
  File file = SD.open(dir);
  file.rewindDirectory();
  while(1){
      File f = file.openNextFile();
      if(!f) return "Все файлы директории " + dir + " закрыты";
      file.close();
  }
}
