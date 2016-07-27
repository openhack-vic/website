/*
 * A script that draws random shapes in a canvas whose id is named "mountainsilohuette".
 */

(function () {
    var canvas = document.getElementById("mountainsilohuette"),
        width = canvas.width,
        height = canvas.height,
        ctx = canvas.getContext("2d"),
        x,
        y,
        ruggedness,

        // Returns a random number between -x/2 and x/2
        scale = function (x) {
            return -(x/2.0) + x * Math.random();
        },

        // Draws a fractal line by recursive decomposition, using the global ruggedness
        // value.  The line is drawn from (x,y) to (tox,toy).  After the line is drawn,
        // (x,y) is updated to the value of (tox, toy).
        fractalLine = function (tox, toy) {
            if (x + 1 > tox) {
                ctx.lineTo(x = tox, y = toy);
            } else {
                var midx = (x + tox) / 2,
                    midy = (y + toy) / 2 + scale(ruggedness * (tox - x));
                fractalLine(midx, midy);
                fractalLine(tox, toy);
            }
        },

        // Clears the canvas and draws a mountain silohuette.  The mountain is a light
        // purple.  Also renders the ruggedness value in black.
        drawMountain = function () {
            ctx.clearRect(0, 0, width, height);
            ruggedness = Math.random() * 0.75;
            ctx.beginPath();
            ctx.moveTo(0, height);
            ctx.lineTo(x = 0, y = height / 2);
            fractalLine(width, height / 2);
            ctx.lineTo(width, height);
            ctx.closePath();
            ctx.fillStyle = "rgb(240, 128, 255)";
            ctx.fill();
            ctx.font = "20px Arial";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("Ruggedness = " + ruggedness, 10, 30);
        };

    // Allow clicks to generate a new mountain range.
    canvas.onclick = drawMountain;

    // Prime the canvas with an initial mountain.
    drawMountain();
}());

