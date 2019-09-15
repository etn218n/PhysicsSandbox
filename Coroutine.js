class Coroutine {
    constructor(generator, arg = null) {
        this.generator = generator();
        this.arg = arg;
        Engine.CoroutineList.push(this);
    }
}