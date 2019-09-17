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

            case "3":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Exercise3();

            case "4":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Exercise4();
        }
    });

    for (let i = 0; i < 20; i++) {
        let p = new Particle();
        p.hasGravity = false;
        p.velocity = new Vector2D((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
        p.angularVelocity = 360;
    }
});

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}