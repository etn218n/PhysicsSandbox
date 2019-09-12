var Context = null;
var PixelsPerUnit = 20;

let Engine = {
    WindowWidth: 0,
    WindowHeight: 0,
    ClearWindow: true,

    FrameCount: 0,
    FrameCountInOneSecond: 0,
    
    FrameRate: 0,
    FixedFrameRate: 45,

    AccumulatedTime: 0,
    AccumulatedTimeInOneSecond: 0,

    Lag: 0,
    DeltaTime: 0,
    FixedDeltaTime: 0,
    LastFrameTimeStamp: 0, 
    SecondsPerFixedUpdate: 0,

    Awake:  function() {},
    Update: function() {},
    FixedUpdate: function() {},

    Init: function() {
        Context.translate(this.WindowWidth / 2, this.WindowHeight / 2);
        Context.scale(PixelsPerUnit, -PixelsPerUnit);

        this.FixedDeltaTime = 1000 / this.FixedFrameRate;
        this.SecondsPerFixedUpdate = this.FixedDeltaTime / 1000;

        this.DrawFPS();
        this.Awake();
    },

    GameLoop: function() {
        let CurrentFrameTimeStamp = performance.now();
        this.DeltaTime = CurrentFrameTimeStamp - this.LastFrameTimeStamp;
        this.LastFrameTimeStamp = CurrentFrameTimeStamp;

        this.AccumulatedTimeInOneSecond += this.DeltaTime;

        this.FrameCount += 1;
        this.FrameCountInOneSecond += 1;

        if (this.AccumulatedTimeInOneSecond >= 1000) {
            this.AccumulatedTimeInOneSecond -= 1000;
            this.FrameRate = this.FrameCountInOneSecond;
            this.FrameCountInOneSecond = 0;
        }

        this.Lag += this.DeltaTime;

        if (this.Lag >= this.FixedDeltaTime) {
            this.FixedUpdate();
            this.Lag -= this.FixedDeltaTime;
        }

        this.Render();

        requestAnimationFrame(() => this.GameLoop()); 
    },

    Render: function() {
        this.Clear();
        this.DrawAxes();
        this.Update();  
        this.DrawFPS();
    },

    DrawFPS: function() {
        Context.save();
        Context.font = "20px Comic Sans MS";
        Context.scale(1 / PixelsPerUnit, - 1 / PixelsPerUnit);
        Context.translate(-this.WindowWidth / 2 + 30, -this.WindowHeight / 2 + 30);
        Context.fillText("FPS: " + this.FrameRate, 0, 0);
        Context.restore();
    },

    Clear: function() {
        if (this.ClearWindow == true)
            Context.clearRect(-this.WindowWidth / 2, -this.WindowHeight / 2, this.WindowWidth, this.WindowHeight);
    },

    DrawAxes: function() {
        Context.save();

        let dotSize = 0.15;

        for (let x = 0; x <= this.WindowWidth / 2; x += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let x = 0; x >= -this.WindowWidth / 2; x -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y <= this.WindowHeight / 2; y += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y >= -this.WindowHeight / 2; y -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, dotSize, 0, 2 * Math.PI, false);
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

    return inclusive ? (this >= min && this <= max) : (this > min && this < max);
};