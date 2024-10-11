#include <Arduino.h>
#include <Wire.h>
//=============================
void blinker(int pin) {
  if (!Wire.hasPin(pin)) return;
  digitalWrite(pin, HIGH);
  delay(500);
  digitalWrite(pin, LOW);
}
//=============================
void blinker(int pin, int num) {
  if (!Wire.hasPin(num)) return;
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, HIGH);
    delay(500);
    digitalWrite(pin, LOW);
    delay(500);
  }
}
//=============================
void blinker(int pin, int num, int len1, int len2) {
  if (!Wire.hasPin(num)) return;
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, HIGH);
    delay(len1);
    digitalWrite(pin, LOW);
    delay(len2);
  }
}
//=============================
void blinker(int pin, int num, int len1, int len2, bool rev) {
  if (!Wire.hasPin(num)) return;
  const char *h = "HIGH";
  const char *l = "LOW";
  if (rev) {
    h = "LOW";
    l = "HIGH";
  }
  for (int x = 0; x < num; ++x) {
    digitalWrite(pin, h);
    delay(len1);
    digitalWrite(pin, l);
    delay(len2);
  }
}
