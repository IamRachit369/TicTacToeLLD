#include <string>

class IObserver {
public:
    virtual void update(std::string msg) = 0;
    virtual ~IObserver() {}
};