// y = a(b)^x

(function() {
    var canvas = document.getElementById('mountainoutline'),
            context = canvas.getContext('2d'),
			width = canvas.width,
			height = canvas.height,
			x,
			y,
			lineLength = 50;

    window.addEventListener('resize', resizeCanvas, false);

    function resizeCanvas() {
            canvas.width = window.innerWidth;
			// width = window.innerWidth;
            
            drawMountain(); 
    }
    resizeCanvas();

    function drawMountain() {
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.moveTo(0, height);
            
			var borderLines = []
			var xStep = 40;
			var centerX = (window.innerWidth - width) / 2;
			context.lineTo(x = 0, y = height / 2);
			context.lineTo(x + centerX - xStep, y);
			borderLines.push(x + centerX - xStep);
			borderLines.push(y);
			
            while (x < width) {
				
				sinX = Math.sin(x * 0.004) * (height * -0.25);
				var addToY = (Math.random() * xStep) - (xStep / 2);
				
				addToY += sinX;
				
				console.log("x: " + x + " addToY: " + addToY);
				
				if (addToY > 0) {
					addToY = 0;
				}
				
				context.lineTo(x + centerX, y + addToY);
				borderLines.push(x + centerX);
				borderLines.push(y + addToY);
				
				x += xStep;
			}
			
			context.lineTo(x + centerX, height / 2);
			borderLines.push(x + centerX);
			borderLines.push(height / 2);
			context.lineTo(window.innerWidth, height / 2);
			borderLines.push(window.innerWidth);
			borderLines.push(height / 2);
            context.lineTo(window.innerWidth, height);
            context.closePath();
            context.fillStyle = "rgb(0, 0, 0)";
            context.fill();
			
			context.beginPath();
			context.moveTo(0, height / 2);
			
			for (i = 0; i < borderLines.length; i++) {
				context.lineTo(borderLines[i], borderLines[i + 1]);
				i++;
			}
			
			context.lineWidth = 2;
			context.strokeStyle = "#99ffcc";
			context.stroke();
			context.closePath();
    }
})();