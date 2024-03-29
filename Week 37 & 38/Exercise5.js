function Exercise5() {
    let ramp = {
        part: [ { a: 0,   b: 0,  c: 14,  d: 0,   e: 0  },
                { a: 0.5, b: 1,  c: 2,   d: 10,  e: 10 },
                { a: 0,   b: 0,  c: 1.5, d: 0,   e: 0  }, 
                { a: 0.5, b: 1,  c: 2,   d: 21,  e: 21 },
                { a: 0,   b: 0,  c: 6,   d: 0,   e: 0  },
                { a: 0,   b: 0,  c: 0,   d: 0,   e: 0  }, ],
    
        f: function(x) {
            let chosenPart;
    
            if (x >= 0 && x <= 4)
                chosenPart = this.part[0]; 
            else if (x > 4 && x <= 9)
                chosenPart = this.part[1]; 
            else if (x > 9 && x <= 20)
                chosenPart = this.part[2]; 
            else if (x > 20 && x <= 23)
                chosenPart = this.part[3]; 
            else if (x > 23 && x <= 28)
                chosenPart = this.part[4]; 
            else if (x > 28 && x <= 40)
                chosenPart = this.part[5]; 
            else
                return 0;
    
            return chosenPart.a * Math.pow((x - chosenPart.d), 2) + chosenPart.b * (x - chosenPart.e) + chosenPart.c;
        },

        SlopeAngleAt(x) {
            let y  = ramp.f(x);
                dx = 0.01;
                dy = ramp.f(x + dx) - y;

            return Math.atan2(dy, dx);
        }
    };
    
    let rampPlotter = new Plotter();
        rampPlotter.GeneratePoints([0, 40], (x) => ramp.f(x), 0.5); 

    let initialVeclocity = new Vector2D(2, 0);

    let p = new Particle();
        p.hasGravity = false;
        p.mass = 10;
        p.Translate(new Vector2D(0, 14));
        p.angularVelocity = -360;

    let Ek = 0.5  * p.mass * initialVeclocity.SquareLength();
        Ep = 9.81 * p.mass * p.Position().y;
        E  = Ek + Ep; 

    function RecalculateVelocity() {
        let angle = ramp.SlopeAngleAt(p.Position().x);

        let newVelocity = Math.sqrt((2 / p.mass) * (E - p.mass * 9.81 * p.Position().y));
            p.velocity.x = newVelocity * Math.cos(angle);
            p.velocity.y = newVelocity * Math.sin(angle);
    }

    Engine.OnFixedUpdate.push(() => {
        if (p.Position().x >= 0 && p.Position().x <= 4) 
        {
            p.velocity = initialVeclocity;
        }
        else if (p.Position().x > 4 && p.Position().x <= 9)
        {
            if (p.Position().y >= ramp.f(p.Position().x) + 1) 
                p.hasGravity = true;
            else 
            {
                p.hasGravity = false;
                RecalculateVelocity();
            }
        }
        else if (p.Position().x > 9 && p.Position().x <= 20) 
        {
            p.hasGravity = false;
            RecalculateVelocity();
        }
        else if (p.Position().x > 20 && p.Position().x <= 23) 
        {
            if (p.Position().y >= ramp.f(p.Position().x) - 1)
                p.hasGravity = true;
            else 
            {
                p.hasGravity = false;
                RecalculateVelocity();
            }
        }
        else if (p.Position().x > 23 && p.Position().x <= 28) {
            // launching ball with the last phase's velocity
            // bouncing reflection is not applied since I don't know how it works
            p.hasGravity = true;
        }
        else if (p.Position().x > 28) {
            // free fall
            p.hasGravity = true; 
        }
    });    
    
    Engine.OnRender.push(() => {
        rampPlotter.Plot();
    });
}