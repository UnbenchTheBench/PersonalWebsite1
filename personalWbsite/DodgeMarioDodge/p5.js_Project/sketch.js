//defines the variables we need for our code to work
let state;
let myXPos = 250;
let myLeft = myXPos - 25;
let myRight = myXPos + 25;
let myTop = 425;
let myBottom = 475;
let score;
let randomX;
let randomXB;
let MushYPos;
let lives;
let bulletArray = [];
let highScore = 0;
let x = 5;
//Preload function loads the images
function preload() {
    mushroomImg = loadImage("images/mushroom.png");
    userImg = loadImage("images/user.png");
    bulletImage = loadImage("images/bulletbill.png");
}
//sets everything up
function setup() {
    createCanvas(500, 500);
    background(0);
    imageMode(CENTER);
    noStroke();
    state = "homeScreen";
    score = 0;
    randomX = random(25, 475);
    MushYPos = -25;
    for (let i = 0; i < 5; i++) {
        let temp = new Bullet(random(0, 500), random(-100, -10), x);
        bulletArray.push(temp);
    }
}
function draw() {
    //homescreen
    if (state == "homeScreen") {
        background(0);
        //creates the main rectangle
        fill(255, 255, 255);
        rect(100, 100, 200, 300);
        //creates the options - easy medium and hard
        textSize(22);
        fill(0);
        text("Easy", 150, 150);
        text("Med", 150, 225);
        text("Hard", 150, 300);
        fill(0, 255, 0);
        rect(150, 150, 100, 50);
        fill(255);
        fill(0, 100, 100);
        rect(150, 225, 100, 50);
        fill(255);
        fill(255, 0, 0);
        rect(150, 300, 100, 50);
        fill(255);

        //directions
        textSize(15);
        text("Rules: 1) Dodge the bullets. 2) Collect the mushrooms.", 1, 50);
        text("Special combinations: Use up + left key to decrease your x position faster.", 1, 70);
        text("Use up + right key to increase your x position faster.", 1, 90);
    }
    //playing screen
    else if (state == "play") {
        background(0);
        image(userImg, myXPos, 450, 50, 50);
        image(mushroomImg, randomX, MushYPos, 25, 25);
        MushYPos += 5;
        //when the mushroom touches the ground it gets spawned at the top at a random x coordinate
        if (score >= 10) {
            x = 20;
        }
        if (MushYPos > 475) {
            randomX = random(25, 475);
            MushYPos = -25;
        }
        //code to determine the left, right, top, and bottom coordinate of mario.
        myLeft = myXPos - 25;
        myRight = myXPos + 25;
        myTop = 425;
        myBottom = 475;
        //code to determine the bottom, left and right coordinate of the mushroom
        MushDown = MushYPos - 12.5;
        MushLeft = randomX - 12.5;
        MushRight = randomX + 12.5;
        //this code deals with everything related to bullet bill
        for (let i = 0; i < bulletArray.length; i++) {
            //determines the left, right, and bottom coordinates of the bullet
            let BulletLeft = bulletArray[i].xPos - 10;
            let BulletRight = bulletArray[i].xPos + 10;
            let BulletDown = bulletArray[i].yPos - 10;
            //if the bullet touches mario the bullet spawns back at the top at a random x position and takes one live away from Mario, this happens per bullet he touches
            if (BulletDown > 425 && 475) {
                if (BulletLeft < myRight && myRight < BulletRight) {
                    lives -= 1;
                    bulletArray[i].yPos = -25;
                    bulletArray[i].xPos = random(10, 490);
                }
                else if (BulletLeft < myLeft && myLeft < BulletRight) {
                    lives -= 1;
                    bulletArray[i].yPos = -25;
                    bulletArray[i].xPos = random(10, 490);
                }
                else if (myTop <= BulletDown && myLeft <= BulletRight && myRight >= BulletLeft) {
                    lives -= 1;
                    bulletArray[i].yPos = -25
                    bulletArray[i].xPos = random(10, 490);
                }
            }
            //spawns the bullet at the very top of the screen at random x positions
            image(bulletImage, bulletArray[i].xPos, bulletArray[i].yPos, 20, 20);
            bulletArray[i].yPos += bulletArray[i].speedValue;
            if (bulletArray[i].yPos > 525) {
                bulletArray[i].yPos = random(-80, -10);
                bulletArray[i].xPos = random(0, 500);
            }
        }
        //if mario collect a mushroom a new one spawns at the top of the screen with a random x position and we add one point to score
        if (MushDown > 425 && 475) {
            if (MushLeft < myRight && myRight < MushRight) {
                score += 1;
                MushYPos = -25;
                randomX = random(25, 475);
            }
            else if (MushLeft < myLeft && myLeft < MushRight) {
                score += 1;
                MushYPos = -25;
                randomX = random(25, 475);
            }
            else if (myTop <= MushDown && myLeft <= MushRight && myRight >= MushLeft) {
                score += 1;
                MushYPos = -25;
                randomX = random(25, 475);
            }
        }
        //allows the user to only move mario left and right within the screen
        if (keyIsDown(LEFT_ARROW) && myXPos >= 25) {
            myXPos -= 3;
        }
        if (keyIsDown(RIGHT_ARROW) && myXPos <= 475) {
            myXPos += 3;
        }
        //special combinations (speed for user)
        if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW) && myXPos >= 25) {
            myXPos -= 10;
        }
        if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW) && myXPos <= 475) {
            myXPos += 10;
        }
        //lives and score screen for the top left corner of the screen
        textSize(20);
        fill(255, 255, 255);
        text('Score: ' + score, 1, 20);
        text('Lives: ' + lives, 1, 40);
        //switches to the game over screen
        if (lives <= 0) {
            state = "over";
        }
        if (score >= highScore) {
            highScore = score;
        }
    }
    //display for the game over screen
    if (state == "over") {
        clear();
        background(255, 0, 0);
        fill(255);
        textSize(60);
        text(("Game Over"), 80, 250);
        text("Final Score: " + score, 70, 300);
        text("High Score: " + highScore, 70, 350);
        fill(0, 0, 0,)
        rect(125, 350, 250, 50);
        fill(255, 255, 255);
        textSize(35);
        text('Return to Menu', 125, 385);
    }
}
function mouseClicked() {
    //start screen
    if (state == "homeScreen") {
        if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 200) {
            lives = 5;
            state = "play";
            yPos += 3;
            MushYPos += 3;
            x = 3;
        } else if (mouseX > 150 && mouseX < 250 && mouseY > 225 && mouseY < 275) {
            lives = 3;
            state = "play";
            yPos += 5;
            MushYPos += 5;
            x = 5;
        } else if (mouseX > 150 && mouseX < 250 && mouseY > 300 && mouseY < 350) {
            lives = 1;
            state = "play";
            yPos += 7;
            MushYPos += 7;
            x = 7;
        }

    }
    //game over screen replay
    if (state == 'over') {
        if (mouseX > 125 && mouseX < 375) {
            createCanvas(500, 500);
            background(0);
            imageMode(CENTER);
            noStroke();
            state = "homeScreen";
            score = 0;
            randomX = random(25, 475);
            MushYPos = -25;
            bulletArray = []
            for (let i = 0; i < 5; i++) {
                let temp = new Bullet(random(0, 500), 250, 3);
                bulletArray.push(temp);
            }
        }
    }
}
//makes the class bullet that takes in a x and y position plus speed
class Bullet {
    constructor(x, y, speed) {
        this.xPos = x;
        this.yPos = y;
        this.speedValue = speed;
    }
}