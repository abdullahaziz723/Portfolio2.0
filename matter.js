var canvas = document.querySelector("#wrapper-canvas");

var dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

Matter.use("matter-attractors");
Matter.use("matter-wrap");

function runMatter() {
  // module aliases
  var Engine = Matter.Engine,
    Events = Matter.Events,
    Runner = Matter.Runner,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Mouse = Matter.Mouse,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  // create renderer
  var render = Render.create({
    element: canvas,
    engine: engine,
    options: {
      showVelocity: false,
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "transparent",
    },
  });

  // create runner
  var runner = Runner.create();

  // Runner.run(runner, engine);
  // Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
    {
      render: {
        fillStyle: `#000`,
        strokeStyle: `#000`,
        lineWidth: 0,
      },

      isStatic: true,
      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          },
        ],
      },
    }
  );

  World.add(world, attractiveBody);


  // paste code from here 
  // add some bodies that to be attracted
for (var i = 0; i < 60; i += 1) {
  let x = Common.random(0, render.options.width);
  let y = Common.random(0, render.options.height);
  let s =
    Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
  let poligonNumber = Common.random(3, 6);

  // Polygon Body
  var body = Bodies.polygon(
    x,
    y,
    poligonNumber,
    s,
    {
      mass: s / 20,
      friction: 0,
      frictionAir: 0.02,
      angle: Math.round(Math.random() * 360),
      render: {
        fillStyle: "#102026",        // dark teal tint (premium)
        strokeStyle: "#1788ae",      // neon blue outline
        lineWidth: 2,
      },
    }
  );
  World.add(world, body);

  // Small glowing circle
  let r = Common.random(0, 1);
  var circle = Bodies.circle(x, y, Common.random(2, 8), {
    mass: 0.1,
    friction: 0,
    frictionAir: 0.01,
    render: {
      fillStyle: r > 0.3 ? "#0f1b22" : "#13333d",   // soft deep-blue variations
      strokeStyle: "#23b9eb",                      // light neon border
      lineWidth: 2,
    },
  });
  World.add(world, circle);

  // Mid circle (glowing core)
  var circle = Bodies.circle(x, y, Common.random(2, 20), {
    mass: 6,
    friction: 0,
    frictionAir: 0,
    render: {
      fillStyle: r > 0.3 ? "#1788ae" : "#0e2228",   // neon + dark mix
      strokeStyle: "#89e8ff",                      // luminous ring
      lineWidth: 4,
    },
  });
  World.add(world, circle);

  // Outer fading circle
  var circle = Bodies.circle(x, y, Common.random(2, 30), {
    mass: 0.2,
    friction: 0.6,
    frictionAir: 0.8,
    render: {
      fillStyle: "#0a1418",         // soft dark base
      strokeStyle: "#1788ae55",     // subtle neon-blue glow
      lineWidth: 3,
    },
  });
  World.add(world, circle);
}



 


















  // add mouse control
  var mouse = Mouse.create(render.canvas);

  Events.on(engine, "afterUpdate", function () {
    if (!mouse.position.x) return;
    // smoothly move the attractor body towards the mouse
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  // return a context for MatterDemo to control
  let data = {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
    play: function () {
      Matter.Runner.run(runner, engine);
      Matter.Render.run(render);
    },
  };

  Matter.Runner.run(runner, engine);
  Matter.Render.run(render);
  return data;
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize() {
  let dimensions = {};
  dimensions.width = $(window).width();
  dimensions.height = $(window).height();

  m.render.canvas.width = $(window).width();
  m.render.canvas.height = $(window).height();
  return dimensions;
}

let m = runMatter();
setWindowSize();
$(window).resize(debounce(setWindowSize, 250));
