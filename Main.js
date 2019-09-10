var Context = null;
var PixelsPerUnit = 20;

let Engine = {
    WindowWidth: 0,
    WindowHeight: 0,
    ClearWindow: true,
    FrameCount: 0,
    FrameCounterInOneSecond: 0,
    DeltaTime: 0,
    FrameRate: 0,
    AccumulatedTime: 0,
    LastFrameTimeStamp: 0,

    Awake:  function() {},
    Update: function() {},

    Init: function() {
        Context.translate(this.WindowWidth / 2, this.WindowHeight / 2);
        Context.scale(PixelsPerUnit, -PixelsPerUnit);

        this.DrawFPS();
        this.Awake();
    },

    GameLoop: function() {
        this.Clear();
        this.DrawAxes();
        this.Update();

        let CurrentFrameTimeStamp = performance.now();

        this.DeltaTime = CurrentFrameTimeStamp - this.LastFrameTimeStamp;

        this.AccumulatedTime += this.DeltaTime;

        this.FrameCount   += 1;
        this.FrameCounterInOneSecond += 1;

        if (this.AccumulatedTime >= 1000) {
            this.AccumulatedTime -= 1000;
            this.FrameRate = this.FrameCounterInOneSecond;
            this.FrameCounterInOneSecond = 0;
            this.DrawFPS();
        }

        this.LastFrameTimeStamp = CurrentFrameTimeStamp;

        requestAnimationFrame(() => this.GameLoop()); 
    },

    DrawFPS: function() {
        Context.save();
        Context.font = "20px Comic Sans MS";
        Context.scale(1 / PixelsPerUnit, - 1 / PixelsPerUnit);
        Context.translate(-this.WindowWidth / 2 + 30, -this.WindowHeight / 2 + 30);
        Context.clearRect(-30, -30, 150, 50);
        Context.fillText("FPS: " + this.FrameRate, 0, 0);
        Context.restore();
    },

    Clear: function() {
        if (this.ClearWindow == true)
            Context.clearRect(-this.WindowWidth / 2, -this.WindowHeight / 2, this.WindowWidth, this.WindowHeight);
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

window.onload = function() {
    let canvas  = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width   = canvas.width  = window.innerWidth,
        height  = canvas.height = window.innerHeight;

    Context = context;    

    Engine.WindowWidth  = width;
    Engine.WindowHeight = height;

    Engine.Init();
    Engine.GameLoop();
}

Number.prototype.between = function(a, b, inclusive = true) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);

    return inclusive ? this >= min && this <= max : this > min && this < max;
};