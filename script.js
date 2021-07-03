			var start = new Date().getTime();
			
			function randColor(){
				var col = '0123456789ABCDEF'.split('');
				var color = "#";
				
				for(i=0; i<6; i++){
					color += col[Math.floor(Math.random()*16)];
				}
				return color;
			}
		
			function ShapeAppear() {
				
				var top = Math.random() * 300;
				var left = Math.random() * 300;
				var width = (Math.random() * 200)+100;
				
				if(Math.random() > 0.5){
					document.getElementById("shape").style.borderRadius="50%";
					
				}else{
						document.getElementById("shape").style.borderRadius="0";
					}
			
				
				document.getElementById("shape").style.height = width + "px";
				document.getElementById("shape").style.width = width + "px";
				document.getElementById("shape").style.top = top + "px";
				document.getElementById("shape").style.left = left + "px";
				document.getElementById("shape").style.backgroundColor = randColor();
				
				document.getElementById("shape").style.display = "block";
				start = new Date().getTime();
			}
		
			function AppearAgain(){
				setTimeout(ShapeAppear,Math.random() * 2000);
			}
			
			AppearAgain();
			
			document.getElementById("shape").onclick = function(){
				document.getElementById("shape").style.display="none";
				var end = new Date().getTime();
				var time = (end - start)/1000;
				document.getElementById("timeTaken").innerHTML = time + "s";
				AppearAgain();
			}
		