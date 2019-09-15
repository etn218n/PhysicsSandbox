class Coroutine {
    constructor(generator) {
        this.generator = generator();
        Engine.CoroutineList.push(this);
    }
}