#include <iostream>
#include <string>

class ConsoleNotifier : public IObserver {
public:
    void update(std::string msg) override {
        std::cout << "[Notification] " << msg << std::endl;
    }
};