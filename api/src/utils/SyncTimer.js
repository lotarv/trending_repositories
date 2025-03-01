class SyncTimer {
    constructor(delayMs, onTick) {
        this.delayMs = delayMs;
        this.onTick = onTick;
        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => this.onTick(), this.delayMs);
    }

    reset() {
        if (this.interval) clearInterval(this.interval);
        this.start();
    }

    stop() {
        if (this.interval) clearInterval(this.interval);
    }
}

module.exports = SyncTimer;