Engine.OnAwake.push(() => {
    document.body.addEventListener("keypress", function(event) {
        switch(event.key) {
            case "1": 
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Engine.CoroutineList = [];
            Engine.SetPixelsPerUnit(20);
            Exercise1(); break;
        
            case "2":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Engine.CoroutineList = [];
            Engine.SetPixelsPerUnit(15);
            Exercise2(); break;

            case "3":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Engine.CoroutineList = [];
            Engine.SetPixelsPerUnit(15);
            Exercise3(); break;

            case "4":
            Engine.OnRender = [];
            Engine.OnFixedUpdate = [];
            Engine.CoroutineList = [];
            Engine.SetPixelsPerUnit(15);
            Exercise4(); break;
        }
    });
});