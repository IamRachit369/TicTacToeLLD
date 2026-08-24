#include <string>

class Symbol {
private:
    char mark;

public:
    Symbol(char m) : mark(m) {}

    char getMark() {
        return mark;
    }
};