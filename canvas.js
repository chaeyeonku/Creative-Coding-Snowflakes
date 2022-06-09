var canvas = document.querySelector('canvas');
var pause = document.querySelector('#pause');
var fall = document.querySelector('#fall');
var reset = document.querySelector('#reset');
var back = document.querySelector('#back');
var help = document.querySelector('#help');
var inst = document.querySelector('#instructions');
var buttons = document.querySelector('#buttons');
var keepRotate = true;
var floating = true;
var showHelp = true;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event Handlers - SNOWFLAKES
canvas.addEventListener('click', e => {
    init2(e.pageX, e.pageY);
});

pause.addEventListener('click', e => {
    keepRotate = !keepRotate;
    circles.forEach(circle => {
        if (keepRotate) {
            circle.reduce();
        } else {
            circle.enlarge();
        }
        circle.update();
    });
});

fall.addEventListener('click', e => {
    floating = !floating;
});


reset.addEventListener('click', e => {
    circles = [];
    keepRotate = true;
    floating = true;
    c.clearRect(0,0, innerWidth, innerHeight);
    init2(canvas.width / 2, canvas.height / 2);
});

back.addEventListener('click', e => {
   location.href = "https://chaeyeonku.github.io/";
});

help.addEventListener('click', e => {
    if (!showHelp) {
        inst.style.display = 'block';
        help.style.background = 'black';
        help.style.color = 'white';
    } else {
        inst.style.display = 'none';
        help.style.background = '#E8E8E8';
        help.style.color = 'initial';
    }
    showHelp = !showHelp;
    
});

var c = canvas.getContext('2d');

// Object
/* Code adapted from "How to Code: Circular Motion"
Author: Christopher Lis
Date: Jan 2021
Availability: https://youtu.be/raXW5J1Te7Y
*/
function CircleSF(x, y, radians, dist, type) {
    this.x = x;
    this.y = y;
    this.centerX = x;
    this.centerY = y;
    this.color = 'white';

    if (type =='c' || dist < 15) {
        this.radius = 1.5;
    } else {
        this.radius = 1 + Math.random() * 3;
    }

    this.radians = radians;
    this.velocity = 0.01;
    this.dist = dist;
    this.shape = Math.random() * Math.PI * 2;

    this.update = () => {
        this.radians += this.velocity;
        this.x = this.centerX + Math.cos(this.radians) * this.dist;
        this.y = this.centerY + Math.sin(this.radians) * this.dist;
        this.draw();
    }

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0,  Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.moveTo(this.x, this.y);
        c.lineTo(this.centerX, this.centerY);

        c.moveTo(this.x, this.y);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.enlarge = () => {
        this.radius += 0.5;
    }

    this.reduce = () => {
        this.radius -= 0.5;
    }

    this.fall = () => {
        this.radians += this.velocity;
        this.x = this.centerX + Math.cos(this.radians) * this.dist;
        this.y = this.centerY + Math.sin(this.radians) * this.dist;
        this.y += 1;
        this.centerY += 1;
        this.draw();
    }

}

// Implementation
let circles;
circles = [];
function init2(x, y) {
    var dice = Math.floor(Math.random() * 5);
    var dist = 10 + Math.random() * 50;
    switch(dice) {
        case 0:
            for (var i=0; i < 32; i++) {
                var dist1;
                if (i % 3 == 0){
                    dist1 = dist / 2;
                } else if (i % 4 == 0){
                    dist1 = dist / 3;
                } else {
                    dist1 = dist;
                } 
                circles.push(new CircleSF(x, y, i * Math.PI * 0.0625, dist1, "a"));
            }            
            break;
        case 1:
            for (var i=0; i < 12; i++) {
                var dist2;
                if (i % 2 ==0) {
                    dist2 = dist;
                } else {
                    dist2 = dist / 2;
                }
                circles.push(new CircleSF(x, y, i * Math.PI / 6, dist2, "b"));
            }
            break;
        case 2:
            for (var i=0; i < 24; i++) {
                var dist3;
                if (i % 2 ==0) {
                    dist3 = dist;
                } else {
                    dist3 = dist / 2;
                }
                circles.push(new CircleSF(x, y, i * Math.PI / 12, dist3, "c"));
            }
            break;
        case 3:
            for (var i=0; i < 24; i++) {
                var dist4;
                if (i % 2 ==0 && i % 4 != 0) {
                    dist4 = dist;
                } else if (i % 4 == 0){
                    dist4 = 0.3 * dist;
                } else {
                    dist4 = 0.9 * dist;
                }
                circles.push(new CircleSF(x, y, i * Math.PI / 12, dist4, "d"));
            }
            break;
        case 4:
            for (var i=0; i < 8; i ++) {
                circles.push(new CircleSF(x, y, i * Math.PI * 0.25, dist, "e"));
            }
    }
    
}


function animate2() {
    requestAnimationFrame(animate2);
    if (keepRotate) {
        c.clearRect(0,0, innerWidth, innerHeight);
        circles.forEach(circle => {
            if (floating) {
                circle.update();
            } else {
                circle.fall();
            }
        });
    }
}

init2(canvas.width / 2, canvas.height / 2);
animate2();