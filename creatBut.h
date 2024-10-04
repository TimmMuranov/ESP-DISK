/*
Данная функция читает все файлы на SD карте в директорииmy Directory.
и генерирует кнопки, эквивалентные файлам по колличеству и именам.
Причем, кнопки-директории синие с id = "dirs".
Кнопки-файлы серые с id = имя файла
(хз зачем, мб нужно где-то в коде, не помню. Главное - работает).
*/
#include <SD.h>
String creatBut(String myDirectory){
  String buttons="";
  File file = SD.open(myDirectory);
  while(1){
  File isDir = file.openNextFile();
  if(!isDir) break;
  if(isDir.isDirectory()){
    String str(isDir.name());
    buttons +=
    "<button style='background-color:Blue' name = 'fileButtons' id='dirs'>" +
     str +
    "</button><p>";
    }
  }
  file.rewindDirectory();
  while(1){
  File f = file.openNextFile();
  if(!f) break;
  if(!f.isDirectory()){
    String str(f.name());
    buttons +=
    "<button style='background-color:Gray' name = 'fileButtons' id='" + str + "'>" +
    str +
    "</button><p>";
    }
  f.close();
  }
  if(buttons == "") buttons += "Здесь нет файлов или репозиториев.";
  buttons += 
  "<hr><button id='Home' style='background-color:red'>Вернуться</button>";
  Serial.println("создание кнопок выполнено");
  file.close();
  return buttons;
}
