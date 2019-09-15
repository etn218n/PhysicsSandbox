Engine.OnAwake.push(() => {
    
    document.body.addEventListener("keypress", function(event) {
        switch(event.key) {
            case "1": 
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Exercise1(); break;
        
            case "2":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Exercise2();
        }
    });
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}