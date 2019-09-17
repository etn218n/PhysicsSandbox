function Exercise4() {
    let rampPlotter = new Plotter();
        rampPlotter.GeneratePoints([-4, 4], (x) => Math.pow(x, 3) - 2*Math.pow(x, 2) - 8*x + 12, 0.2); 
    
    Engine.OnRender.push(() => {
        rampPlotter.Plot();
    });
}