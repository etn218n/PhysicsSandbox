let Engine = {
    Context: null,
    WindowWidth: 0,
    WindowHeight: 0,

    Awake: function() {},
    Update: function() {},

    Init: function() {
        this.Context.translate(this.WindowWidth / 2, this.WindowHeight / 2);
        this.Context.scale(40, -40);

        this.Awake();
    },

    Run: function() {
        this.Context.clearRect(-this.WindowWidth / 2, -this.WindowHeight / 2, this.WindowWidth, this.WindowHeight);
        this.DrawAxes();
        
        this.Update();

        requestAnimationFrame(() => this.Run());
    },

    DrawAxes: function() {
        this.Context.save();

        for (let x = 0; x <= this.WindowWidth / 2; x += 1) {
            this.Context.beginPath();
            this.Context.fillStyle = 'gray'
            this.Context.arc(x, 0, 0.1, 0, 2 * Math.PI, false);
            this.Context.fill();
            this.Context.closePath();
        }

        for (let x = 0; x >= -this.WindowWidth / 2; x -= 1) {
            this.Context.beginPath();
            this.Context.fillStyle = 'gray'
            this.Context.arc(x, 0, 0.1, 0, 2 * Math.PI, false);
            this.Context.fill();
            this.Context.closePath();
        }

        for (let y = 0 ; y <= this.WindowHeight / 2; y += 1) {
            this.Context.beginPath();
            this.Context.fillStyle = 'gray'
            this.Context.arc(0, y, 0.1, 0, 2 * Math.PI, false);
            this.Context.fill();
            this.Context.closePath();
        }

        for (let y = 0 ; y >= -this.WindowHeight / 2; y -= 1) {
            this.Context.beginPath();
            this.Context.fillStyle = 'gray'
            this.Context.arc(0, y, 0.1, 0, 2 * Math.PI, false);
            this.Context.fill();
            this.Context.closePath();
        }
        
        this.Context.restore();
    }
}

window.onload = function() {
    let canvas  = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width   = canvas.width  = window.innerWidth,
        height  = canvas.height = window.innerHeight;

    Engine.Context = context;
    Engine.WindowWidth = width;
    Engine.WindowHeight = height;

    Engine.Init();
    Engine.Run();
}