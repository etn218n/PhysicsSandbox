let Engine = {
    WindowWidth: 0,
    WindowHeight: 0,

    Awake: function() {},
    Update: function() {},

    Init: function() {
        Context.translate(this.WindowWidth / 2, this.WindowHeight / 2);
        Context.scale(20, -20);

        this.Awake();
    },

    Run: function() {
        Context.clearRect(-this.WindowWidth / 2, -this.WindowHeight / 2, this.WindowWidth, this.WindowHeight);
        this.DrawAxes();
        this.Update();

        requestAnimationFrame(() => this.Run());
    },

    DrawAxes: function() {
        Context.save();

        for (let x = 0; x <= this.WindowWidth / 2; x += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, 0.1, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let x = 0; x >= -this.WindowWidth / 2; x -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, 0.1, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y <= this.WindowHeight / 2; y += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, 0.1, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y >= -this.WindowHeight / 2; y -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, 0.1, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }
        
        Context.restore();
    }
}

var Context = null;

window.onload = function() {
    let canvas  = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width   = canvas.width  = window.innerWidth,
        height  = canvas.height = window.innerHeight;

    Context = context;    

    Engine.WindowWidth  = width;
    Engine.WindowHeight = height;

    Engine.Init();
    Engine.Run();
}