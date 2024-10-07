 <h2>Данная прога позволяет использовать микроконтроллер ESP8266 как мини-сервер для создания, редактирования и удаления текстовых файлов.</h2>
 <img src = "images/esp-Photoroom.jpg">
С этой прошивкой ESP-шка создает точку доступа, превращаясь в локальный сервер.
Следовательно, присутствуют все плюсы локальных серверов:<p>+ Быстрота</p><p>+ Безопасность</p><p>+ Не требует интернет</p>
Кроме того, Низкое потребление энергии позволяет запитать сервер от любой зарядки.
Благодаря этому, можно развернуть свой сервер даже в полной изоляции от мира (в лесу, в глухой деревне, в апокалипсис и тд.) используя powerbanr в качестве источника питания. 
<h3>Краткий экскурс</h3>
Данная прошивка использует файловую систему микроконтроллера - LittleFs.
Инструкций по настройке файловой системы на МК довольно много. Я следовал [этой](https://microcontrollerslab.com/littlefs-introduction-install-esp8266-nodemcu-filesystem-uploader-arduino)

Файлы, которые необходимо закинуть на файловую систему находятся в папке data.
Кроме того, в проекте использованы стандартные библиотеки ESP8266. Можно подгрузить [отсюда](https://github.com/esp8266/Arduino)

Правильно прошитая ESP-шка создает точку доступа, имя и пароль которой можно сменить в начале файла ino (переменные const char *ssid и *password). 
Подключившись к этой точке доступа, необходимо в любом браузере перейти по пути "192.168.4.1". 
Откроется веб интерфейс сервера. 
Более подробрые инструкции по эксплуатации зависят от версии сервера. 
Они будут храниться в файле "ESP-DISK/data/about.html".<p> 
<img src='images/IMG_20240927_161509.jpg' />
