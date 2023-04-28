export class Timer{

    _seconds;
    _isCompleted = false;
    _callbackFunc = null;
    _intervalId = null;
    _timerElement = document.querySelector('#timer');

    get seconds() {
        return this._seconds;
    }

    set seconds(value) {
        this._seconds = value;
    }

    get isCompleted() {
        return this._isCompleted;
    }

    set isCompleted(value) {
        this._isCompleted = value;
    }


    get callbackFunc() {
        return this._callbackFunc;
    }

    get intervalId() {
        return this._intervalId;
    }

    set intervalId(value) {
        this._intervalId = value;
    }

    get timerElement() {
        return this._timerElement;
    }

    constructor(seconds, callbackFunc) {
        this._seconds = Math.abs(parseInt(seconds)) || 0;
        this._callbackFunc = callbackFunc;
        this._timerElement.innerHTML = this.seconds;
    }

    start() {
        if (this.isCompleted) {

        }
       this.intervalId = setInterval(this._tick.bind(this), 1000);
    }

    pause() {
        this.clear();
    }

    clear() {
        clearInterval(this.intervalId);
    }

    reset() {
        this.clear();
        this.timerElement.innerText = '0';
    }

    _tick() {
        if (this.seconds <= 0) {
            this.isCompleted = true;
            this.callbackFunc();
            this.clear();
            return;
        }
        this.seconds = this.seconds - 1;
        this.timerElement.innerText = this.seconds;
    }
}
