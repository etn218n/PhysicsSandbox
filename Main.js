var Context = null;

let Engine = {
    CanvasWidth:  0,
    CanvasHeight: 0,
    PixelsPerUnit: 15,
    ClearWindow: true,

    CameraWidth:  0,
    CameraHeight: 0,

    MouseX: 0,
    MouseY: 0,
    LeftMouseDown: false,
    RightMouseDown: false,
    MiddleMouseDown: false,

    FrameCount: 0,
    FrameCountInOneSecond: 0,
    
    FrameRate: 0,
    FixedFrameRate: 50,

    Lag: 0,
    AccumulatedTimeInOneSecond: 0,

    DeltaTime: 0,
    FixedDeltaTime: 0,
    LastFrameTimeStamp: 0, 
    SecondsPerFixedUpdate: 0,

    OnAwake:  [],
    OnRender: [],
    OnUpdate: [],
    OnFixedUpdate: [],

    CoroutineList: [],

    OnMouseMove(e) {
        this.MouseX =  (e.clientX - this.CanvasWidth  / 2) / this.PixelsPerUnit;
        this.MouseY = -(e.clientY - this.CanvasHeight / 2) / this.PixelsPerUnit;
    },

    OnMouseDown(e) {
        switch (e.button) {
            case 0: this.LeftMouseDown   = true; break;
            case 1: this.MiddleMouseDown = true; break;
            case 2: this.RightMouseDown  = true; break;
        }
    },

    OnMouseUp(e) {
        switch (e.button) {
            case 0: this.LeftMouseDown   = false; break;
            case 1: this.MiddleMouseDown = false; break;
            case 2: this.RightMouseDown  = false; break;
        }
    },

    Init: function() {
        Context.translate(this.CanvasWidth / 2, this.CanvasHeight / 2);
        Context.scale(this.PixelsPerUnit, -this.PixelsPerUnit);

        this.CameraWidth  = this.CanvasWidth  / (2 * this.PixelsPerUnit);
        this.CameraHeight = this.CanvasHeight / (2 * this.PixelsPerUnit);

        document.body.addEventListener("mousemove", this.OnMouseMove.bind(this));
        document.body.addEventListener("mousedown", this.OnMouseDown.bind(this));
        document.body.addEventListener("mouseup",   this.OnMouseUp.bind(this));

        this.FixedDeltaTime = 1000 / this.FixedFrameRate;
        this.SecondsPerFixedUpdate = this.FixedDeltaTime / 1000;

        this.DrawFPS();

        this.OnAwake.forEach(awaker => awaker());
        
        this.ElapsedAppTime = performance.now();
    },

    GameLoop: function() {
        this.CountFPS();

        this.OnUpdate.forEach(updater => updater());

        this.UpdateCoroutine();

        if (this.Lag >= this.FixedDeltaTime) {
            this.OnFixedUpdate.forEach(fixedUpdater => fixedUpdater());
            this.Lag -= this.FixedDeltaTime;
        }

        this.Render();

        requestAnimationFrame(() => this.GameLoop()); 
    },

    UpdateCoroutine: function() {
        this.CoroutineList.forEach(coroutine => {
            let result = coroutine.generator.next(coroutine.arg);
            
            if (result.done)
                this.CoroutineList.remove(coroutine);
        });
    },

    Render: function() {
        this.Clear();
        this.DrawAxes();
        this.DrawFPS();

        this.OnRender.forEach(renderer => renderer());
    },

    CountFPS: function() {
        let CurrentFrameTimeStamp = performance.now() - this.ElapsedAppTime;

        this.DeltaTime = CurrentFrameTimeStamp - this.LastFrameTimeStamp;

        this.LastFrameTimeStamp = CurrentFrameTimeStamp;

        this.Lag += this.DeltaTime;
        this.AccumulatedTimeInOneSecond += this.DeltaTime;

        this.FrameCount += 1;
        this.FrameCountInOneSecond += 1;

        if (this.AccumulatedTimeInOneSecond >= 1000) {
            this.AccumulatedTimeInOneSecond -= 1000;
            this.FrameRate = this.FrameCountInOneSecond;
            this.FrameCountInOneSecond = 0;
        }
    },

    DrawFPS: function() {
        Context.save();
        Context.font = "20px Comic Sans MS";
        Context.scale(1 / this.PixelsPerUnit, - 1 / this.PixelsPerUnit);
        Context.translate(-this.CanvasWidth / 2 + 30, -this.CanvasHeight / 2 + 30);
        Context.fillText("FPS: " + this.FrameRate, 0, 0);
        Context.restore();
    },

    Clear: function() {
        if (this.ClearWindow == true)
            Context.clearRect(-this.CanvasWidth / 2, -this.CanvasHeight / 2, this.CanvasWidth, this.CanvasHeight);
    },

    DrawAxes: function() {
        Context.save();

        let dotSize = 0.15;

        for (let x = 0; x <= this.CameraWidth; x += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let x = 0; x >= -this.CameraWidth; x -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(x, 0, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y <= this.CameraHeight; y += 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }

        for (let y = 0 ; y >= -this.CameraHeight; y -= 1) {
            Context.beginPath();
            Context.fillStyle = 'gray'
            Context.arc(0, y, dotSize, 0, 2 * Math.PI, false);
            Context.fill();
            Context.closePath();
        }
        
        Context.restore();
    },

    SetPixelsPerUnit: function(value) {
        Context.scale(1 / this.PixelsPerUnit, -1 / this.PixelsPerUnit);
        this.PixelsPerUnit = value;
        Context.scale(this.PixelsPerUnit, -this.PixelsPerUnit);

        this.CameraWidth  = this.CanvasWidth  / (2 * this.PixelsPerUnit);
        this.CameraHeight = this.CanvasHeight / (2 * this.PixelsPerUnit);
    }
};

let PhysicsEngine = {
    OnMotionUpdate: [],
    OnCollisionUpdate: [],

    ColliderList: [],
    CollidedIndexList: [],

    Init: function() {
        Engine.OnFixedUpdate.push(this.Update.bind(this));
    },

    CheckCircleCollision: function(a, b) {
        let sumRadiusSquare = Math.pow(a.radius + b.radius, 2),
            centerDistanceSquare = Math.pow(a.PositionX() - b.PositionX(), 2) + Math.pow(a.PositionY() - b.PositionY(), 2);
        
        if (centerDistanceSquare <= sumRadiusSquare)
            return true;

        return false;
    },

    PerfectlyInelasticCollision: function(a, b) {
        let finalVelocity = new Vector2D();
    
        finalVelocity.x = (a.mass * a.velocity.x + b.mass * b.velocity.x) / (a.mass + b.mass);
        finalVelocity.y = (a.mass * a.velocity.y + b.mass * b.velocity.y) / (a.mass + b.mass);
    
        a.velocity = finalVelocity;
        b.velocity = finalVelocity;
    },

    IdealElasticCollision: function(a, b) {
        let vC = new Vector2D(b.PositionX() - a.PositionX(), b.PositionY() - a.PositionY());
            vC.NormalizeSelf();
    
        // angle between vector from center of A to center of B and the x-axis
        let angle = Math.atan2(vC.y, vC.x) * 180 / Math.PI;
    
        let rotMatrix = new Matrix2D();
            rotMatrix.Rotate(-angle);
        let inverserotMatrix = new Matrix2D();
            inverserotMatrix.Rotate(angle);
    
        let vA = rotMatrix.MultiplyVector(a.velocity),
            vB = rotMatrix.MultiplyVector(b.velocity);
    
        let vAafter = new Vector2D();
            vAafter.x = ((a.mass - b.mass) / (a.mass + b.mass) * vA.x) + ((2 * b.mass) / (a.mass + b.mass) * vB.x);
            vAafter.y = vA.y;
        let vBafter = new Vector2D();
            vBafter.x = ((b.mass - a.mass) / (a.mass + b.mass) * vB.x) + ((2 * a.mass) / (a.mass + b.mass) * vA.x);
            vBafter.y = vB.y;
    
        let vAfinal = inverserotMatrix.MultiplyVector(vAafter),
            vBfinal = inverserotMatrix.MultiplyVector(vBafter);
    
        a.velocity = vAfinal;
        b.velocity = vBfinal;
    },

    ResolveCollision: function(Cr, a, b) {
        if (Cr === 1) 
            this.IdealElasticCollision(a, b);
        else if (Cr === 0)
            this.PerfectlyInelasticCollision(a, b);
        else if (Cr < 1) 
            this.InelasticCollision(a, b);
    },

    Update: function() {
        this.OnCollisionUpdate.forEach(collisionUpdater => collisionUpdater());

        for (let i = 0; i < PhysicsEngine.ColliderList.length - 1; i++) 
        {
            for (let j = i + 1; j < PhysicsEngine.ColliderList.length; j++)
             {
                let cirA = PhysicsEngine.ColliderList[i];
                    cirB = PhysicsEngine.ColliderList[j];

                // only support circle-circle collsion for now
                if (this.CheckCircleCollision(cirA, cirB))
                    this.ResolveCollision(1, cirA, cirB);
            }
        }

        this.OnMotionUpdate.forEach(motionUpdater => motionUpdater());
    }
};

window.onload = function() {
    let canvas  = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width   = canvas.width  = window.innerWidth,
        height  = canvas.height = window.innerHeight;

    Context = context;

    Engine.CanvasWidth  = width;
    Engine.CanvasHeight = height;

    Engine.Init();
    PhysicsEngine.Init();

    Engine.GameLoop();
}

Number.prototype.between = function(a, b, inclusive = true) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);

    return inclusive ? (this >= min && this <= max) : (this > min && this < max);
};

Array.prototype.remove = function(wantedItem) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] == wantedItem) {
            this.splice(i, 1);
            return;
        }
    }
}

function Random(a, b) {
    let min = Math.min.apply(Math, [a, b]),
        max = Math.max.apply(Math, [a, b]);

    return Math.random() * (max - min) + min;
}

async function Timer(ms, task) {
    await new Promise(resolve => setTimeout(resolve, ms));
    task();
}