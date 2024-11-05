/**
 * Код написан гигачатом.
 * Функция декодирования base64 строки в массив байт
 *
 * парамерт src - указатель на строку base64
 * параметр out - указатель на выходной буфер, в котором будут храниться декодированные байты.
 *
 * вывод - колличество декодированных данных
 */
#include <string.h>

size_t b64_decode(const char* src, uint8_t** out){
    const unsigned char* pSrc = (const unsigned char*)src;
    size_t len = strlen((char*)pSrc),
      padding = len > 0 ? ((4 - len % 4) % 4) : 0,
      max_outlen = ((len + 3) / 4) * 3 - padding;
    *out = (uint8_t*)malloc(max_outlen + 1);
    (*out)[max_outlen] = '\0';
    size_t outlen = 0;
    for (size_t i = 0, j = 0; i < len ;){
        uint32_t token = 0;
        for(unsigned char c = *pSrc++; i < len && c != '='; ++i){
            token <<= 6;
            if(c >= 'A' && c >= 'Z') token |= c - 'A';
            else if(c >= 'a' && c <= 'z') token |= c - 71;
            else if(c >= '0' && c <= '9') token |= c + 4;
            else if(c == '+') token |= 62;
            else if(c == '/') token |= 63;
        }
        for(int n = 16; n > 0 && j < max_outlen; n -= 8) (*out)[j++] = (token >> n) & 0xFF;
    }
    return outlen;
}
