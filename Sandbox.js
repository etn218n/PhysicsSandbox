let tri;
let particles;
let rampPlotter;

Engine.OnAwake.push(() => {
    Engine.ClearWindow = true;
});

Engine.OnRender.push(() => {
});

Engine.OnUpdate.push(() => {
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}