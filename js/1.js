window.onload=function(){
	aciertos=0;//numero de aciertos
	seg=29;
	cen=99;
	fin=false;
	reanudar();
	nuevo();
}

function nuevo(){//crea nuevo panel
	empezado=0;
	
	var padre=document.getElementById("padre");
	while (padre.childNodes.length>=1)padre.removeChild(padre.firstChild);//elimino las piezas ya existentes

	puzzle=Math.floor(Math.random()*4);//elige de forma aleatoria el puzzle que se va a mostrar

	colocar();//coloca las imagenes en el panel

	//comienza el intervalo del cronometro
	parar();
	reanudar();

	//comienza el intervalo de volteo de cuadrantes
	volteo=setInterval("voltear()", 500);

	//desmarco todos los checkbox
	document.getElementById("gollum").checked=0;
	document.getElementById("rana").checked=0;
	document.getElementById("sorpasso").checked=0;
	document.getElementById("egipto").checked=0;
}

//coloca imagenes
function colocar(){
	for (var i = 1; i < 17; i++) {
		aniadir(i);
	}
}

//añade imagen con sus propiedades al article
function aniadir(i){
	var padre=document.getElementById("padre");
	var imagen=document.createElement("img");
	imagen.id="img"+i;
	imagen.alt="pieza";
	switch(puzzle){
		case 0:
			imagen.src="../img/gollum/"+(i)+".png";
			break;
		case 1:
			imagen.src="../img/rana/"+(i)+".png";
			break;
		case 2:
			imagen.src="../img/sorpasso/"+(i)+".png";
			break;
		case 3:
			imagen.src="../img/egipto/"+(i)+".png";
			break;
		default:
			break;
	}
	padre.appendChild(imagen);
}

//voltear pieza
function voltear(){
	if(empezado==0){//si no ha habido ninguna pieza descubierta antes
			empezado=1;
			var numpieza=Math.floor(Math.random()*16);//pieza aleatoria a voltear
			pieza=document.getElementById("img"+(numpieza+1));
			pieza.style.WebkitFilter="none";
	}else{
		pieza.style.WebkitFilter="brightness(0%)";
		var numpieza=Math.floor(Math.random()*16);
		pieza=document.getElementById("img"+(numpieza+1));
		pieza.style.WebkitFilter="none";
	}
}

//comprueba si acertaste la imagen
function comprobar(id){
	acertado=false;
	switch(id){
		case "gollum":
			if(puzzle==0)acertado=true;
			break;
		case "rana":
			if(puzzle==1)acertado=true;
			break;
		case "sorpasso":
			if(puzzle==2)acertado=true;
			break;
		case "egipto":
			if(puzzle==3)acertado=true;
			break;
		default:
			break;
	}
	if(acertado){
		clearInterval(volteo);
		if(!fin)aciertos++;
		ponerCompleta();
	}else{//GAME OVER
		terminarJuego(0);
	}
}

//quita las piezas del puzzle y pone una foto completa
function ponerCompleta(){
	var padre=document.getElementById("padre");
	while (padre.childNodes.length>=1)padre.removeChild(padre.firstChild);//elimina todas las piezas
	var imagen=document.createElement("img");
	switch(puzzle){
		case 0:
			imagen.src="../img/gollum/gollum.png";
			padre.appendChild(imagen);
			break;
		case 1:
			imagen.src="../img/rana/rana.png";
			padre.appendChild(imagen);
			break;
		case 2:
			imagen.src="../img/sorpasso/sorpasso.png";
			padre.appendChild(imagen);
			break;
		case 3:
			imagen.src="../img/egipto/egipto.png";
			padre.appendChild(imagen);
			break;
		default:
			break;
	}
	imagen.className="fotoFin";
	imagen.alt="puzzleCompleto";
	document.getElementById("aci").innerHTML="Aciertos: "+aciertos;
	parar();
	if(!fin)setTimeout("nuevo()",1000);//si el juego no ha terminado se crea un nuevo panel
}

//cuando el juego ha terminado win=0 (gameover) win=1(se acabo el tiempo)
function terminarJuego(win){
	fin=true;
	parar();
	ponerCompleta();
	clearInterval(volteo);
	//quito propiedades onclick a los checkbox
	document.getElementById("gollum").onclick="";
	document.getElementById("rana").onclick="";
	document.getElementById("sorpasso").onclick="";
	document.getElementById("egipto").onclick="";
	if(win==1){
		console.log("se acabó el tiempo");
	}else{
		document.getElementById("seg").innerHTML="Tiempo restante: 0,00s";

		console.log("fallaste");
	}
}

//decrecimiento segundos
function segundos(){
	seg--;
	return seg;
}

//decrecimiento centesimas
function centesimas(){
	cen--;
	if(cen==0)cen=99;
	hora();
	return cen;
}

//coloca el reloj
function hora(){
	document.getElementById("seg").innerHTML="Tiempo restante: "+seg+","+(cen%100)+"s";
	document.getElementById("seg").color="'#'+Math.floor(Math.random()*16777215).toString(16)";
	if(seg<=0)fin=true;
	if(fin){
		document.getElementById("seg").innerHTML="Tiempo restante: 0,00s";
		terminarJuego(1);
	}
}

//para el reloj
function parar(){
	clearInterval(intervalo1);
	clearInterval(intervalo2);
}

//reanuda el reloj
function reanudar(){
	intervalo1=setInterval("segundos()",1000);
	intervalo2=setInterval("centesimas()",10);
}