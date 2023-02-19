

// game


// Set up the canvas and context
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth * .9;
canvas.height = window.innerHeight * .9;


// define the player
var player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    speed: 6,
    color: 'blue'
};

// define the projectile array
let projectiles = [];

// let the player shoot projectiles. theres a lot of math here that allows the projectiles to fire in the direction of the mouse click
// first you have to calibrate the mouse pos for the canvas being smaller than the screen


canvas.addEventListener('mousedown', function(event) {

    const screen = canvas.getBoundingClientRect();
    const scaleX = canvas.width / screen.width;
    const scaleY = canvas.height / screen.height;

    var angle = Math.atan2(((event.clientY - screen.top) * scaleY) - player.y, ((event.clientX - screen.left) * scaleX) - player.x);
    var velocity = { x: Math.cos(angle) * 5, y: Math.sin(angle) * 5 };
    projectiles.push({ x: player.x, y: player.y, size: 7, color: '#fff', velocity });
});

// Set up the enemy array
var enemy = [];
var enemyCount = 0; // initial enemy count

// Generate enemies with random sizes and positions along the edge, moving toward the center of the screen
for (var i = 0; i < enemyCount; i++) {
    // position
    var wall = Math.floor(Math.random() * 4) + 1; // 1-4
    var x, y, dx, dy;
    if (wall === 1) { // left side
        y = Math.random() * canvas.height;
        x = 0;
    }
    if (wall === 2) { // right side
        y = Math.random() * canvas.height;
        x = canvas.width;
    }
    if (wall === 3) { // top side
        x = Math.random() * canvas.width;
        y = 0;
    }
    if (wall === 4) { // bottom side
        x = Math.random() * canvas.width;
        y = canvas.height;
    }

    var size = Math.floor(Math.random() * 5) + 10; // get a random size 10-15
    var dx = 0; // get a random number [-5,5] for speed
    var dy = 0; // same
    var color = 'green';
    enemy.push({ x: x, y: y, size: size, dx: dx, dy: dy, color: color}); // dynamically add the new food item to the array
}

let animationID;
function runGame() {
    // Clear the canvas each time you regenerate it so stuff doesnt just pile up
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Request the next frame (loop iteration) (unless the player just died)
    animationID = window.requestAnimationFrame(runGame);
   


// allow the player to move
    if (keys.KeyW) { // it knows the event code for the up arrow and checks if keys[event code] == true (key pressed) this is all built in with the way i set up the key array down below
        if (player.y > 3 + player.radius) { // this and the 3 other if statements prevent the player from going off screen
            player.y -= player.speed;
        }
    }
    if (keys.KeyS) {
        if (player.y < canvas.height - player.radius - 3) {
            player.y += player.speed;
        }
    }
    if (keys.KeyA) {
        if (player.x > player.radius + 3) {
            player.x -= player.speed;
        }
    }
    if (keys.KeyD) {
        if (player.x < canvas.width - player.radius - 3) {
            player.x += player.speed;
        }
    }


// update stuff
    // Update the position of the enemies
    for (var i = 0; i < enemy.length; i++) {
        // Get the position of the player and enemy
        let playerX = player.x;
        let playerY = player.y;
        let enemyX = enemy[i].x;
        let enemyY = enemy[i].y;
        // Calculate the distance between the player and enemy
        let ex = playerX - enemyX;
        let ey = playerY - enemyY;
        let distance = Math.sqrt(ex*ex + ey*ey);
        // Calculate the angle between the player and enemy
        let angle = Math.atan2(ey, ex);
        // Use the angle to determine the direction that the enemy should move
        let speed = 1; // adjust as needed
        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;
        // update enemy direction
        enemy[i].dx = vx;
        enemy[i].dy = vy;
        enemy[i].x += enemy[i].dx; // increase x pos by whatever the specific item's x speed is
        enemy[i].y += enemy[i].dy; // same
    }

    // check for enemy collision with player (game over)
    for (var i = 0; i < enemy.length; i++) {
        var dx = player.x - enemy[i].x; // center of player - center of enemy
        var dy = player.y - enemy[i].y; // same thing for y
        var distance = Math.sqrt(dx * dx + dy * dy); // use really hard math to calculate the enemy's distance from the center of the player
        if (distance < player.radius) { // if center of enemy is within the players circumference, game over
            cancelAnimationFrame(animationId);
        }
    }

    // check for projectile collision with enemies. This is fucked because it checks each enemy against each projectile
    for (var i = 0; i < enemy.length; i++) {
        for (var j = 0; j < projectiles.length; j++) {
            var dx = enemy[i].x - projectiles[j].x; // center of enemy - center of projectile
            var dy = enemy[i].y - projectiles[j].y; // same
            var distance = Math.sqrt(dx * dx + dy * dy); // really hard math again
            distance -= 5; // make it a little more generous to the player
            if (distance < enemy[i].size) { // if center of projectile is within the enemy's circumference, delete enemy
                enemy.splice(i, 1); // this removes the enemy item (i) that was hit by a projectile
                i--; // have to decrease i if an enemy gets removed becuase the enemy.length value in the for condition will also decrease
            }
        }     
    }


// draw stuff
    // Draw the player
    context.beginPath();
    context.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
    context.fillStyle = player.color;
    context.fill();

    // draw the projectiles
    projectiles.forEach((projectile) => {
        context.fillStyle = projectile.color;
        context.beginPath();
        context.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
        context.fill();
    
        projectile.x += projectile.velocity.x;
        projectile.y += projectile.velocity.y;
    });

    // draw the enemies
    for (var i = 0; i < enemy.length; i++) {
        context.beginPath();
        context.arc(enemy[i].x, enemy[i].y, enemy[i].size, 0, 2 * Math.PI);
        context.fillStyle = enemy[i].color;
        context.fill();
    }


// generate enemies
    if (Math.random() < .02) { // the number controls the frequency that food is generated. random gives u a random decimal from 0-1. so if num < .05, then we will generate a new food every 20 iterations (which is probably like 1/3 of a second)
        // position
        var wall = Math.floor(Math.random() * 4) + 1; // 1-4
        var x, y;
        if (wall === 1) { // left side
            y = Math.random() * canvas.height;
            x = 0;
        }
        if (wall === 2) { // right side
            y = Math.random() * canvas.height;
            x = canvas.width;
        }
        if (wall === 3) { // top side
            x = Math.random() * canvas.width;
            y = 0;
        }
        if (wall === 4) { // bottom side
            x = Math.random() * canvas.width;
            y = canvas.height;
        }
        // set direction to 0 initially because it will be updated continuously during the game loop
        var dx = 0;
        var dy = 0;

        var size = Math.floor(Math.random() * 5) + 10;
        var color = 'green';
        enemy.push({ x: x, y: y, size: size, dx: dx, dy: dy, color: color });
    }
}

// Set up the key listeners
var keys = {};
document.addEventListener('keydown', function(event) {
  keys[event.code] = true; // whatever key you press down, the corresponding cell in the key array will register it
});
document.addEventListener('keyup', function(event) {
  keys[event.code] = false;
});


// Start the infinite game loop
runGame();
