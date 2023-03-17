let counterModule = (function () {
    let instance,
        counter = 0;

    let getCounter = function () {
        return counter;
    }

    let increaseCounter = function () {
        counter++;
    }

    let createInstance = function () {
        return {
            getCounter: getCounter,
            increaseCounter: increaseCounter
        }
    }

    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    }
})();