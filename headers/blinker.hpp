#include <Arduino.h>
//=============================
void blinker(int pin) {
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
}
//=============================
void blinker(int pin, int num) {
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, HIGH);
    delay(500);
    digitalWrite(pin, LOW);
    delay(500);
  }
}
//=============================
void blinker(int pin, int num, int len1, int len2) {
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, HIGH);
    delay(len1);
    digitalWrite(pin, LOW);
    delay(len2);
  }
}
//=============================
void blinker(int pin, int num, int len1, int len2, bool rev) {
  int h = 1;
  int l = 0;
  if (rev) {
    h = 0;
    l = 1;
  }
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, h);
    delay(len1);
    digitalWrite(pin, l);
    delay(len2);
  }
}
