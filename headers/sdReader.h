#include <SD.h>

String sdReader(String dir, String file){
    String dataInF = "";
    File f = SD.open(dir + file);
    if(f.isDirectory()) return "Это директория";

    int avail = f.available();
    for (int x=0; x<avail; ++x){
        char str = (char) f.read();
        dataInF += str;
    }
    f.close();
    return dataInF;
}
