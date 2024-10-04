/*
Данная функция удаляет num директорий
из строки dirs. 
Строка может быть
в единственной конфигурации: /а/б/с/
слеш в конце обязателен.
*/

String rmLastDir(String dirs, int num){
    if (dirs[0] != '/' || dirs[dirs.length()-1] != '/'){
    	Serial.println ("rmLD - неверный ввод");
        return dirs;
    }
	if (dirs.length() <= 1){
		Serial.println ("rmLD - вы уже в /");
        return dirs;
    }
//_________________________________________
  while (num){
  if (dirs == "/") return dirs;
  dirs.remove(dirs.length() - 1);
  int sNum = dirs.lastIndexOf("/");
  dirs.remove(sNum + 1);
     --num;
  }
  return dirs;
}

/*   
примеры использования:
("/", 1) => "/"
("/a/", 9999) => "/"
("/a/b/c/", 2) => "/a/”
("dirrr", 1) => "dirrr"

*/
