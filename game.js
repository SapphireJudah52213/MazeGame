const params = new URLSearchParams(window.location.search)

const d = document;

const body = document.body

const level = params.get("level")

const levelNum = document.createElement('div')
levelNum.className = "text"

const suggestion = document.createElement('div')
suggestion.className = "text"

const suggestion2 = document.createElement('div')
suggestion2.className = "text"
suggestion2.style.position = "absolute"
suggestion2.style.left = "24.5%"

const suggestionMiddle = document.createElement('div')
suggestionMiddle.className = "text"
suggestionMiddle.style.position = "absolute"
suggestionMiddle.style.color = "#ea00ea"
suggestionMiddle.style.left = "35.35%"

const suggestionLast = document.createElement('div')
suggestionLast.className = "text"
suggestionLast.style.position = "absolute"
suggestionLast.style.left = "46.5%"

const Objects = [];
const ObjectsH = [];
const Speeds = [];

let gravityDown = 0;
let gravityLeft = 0;

const cl = console.log;
let stop = false;

const bg = d.createElement('div')
bg.className = "background"
body.appendChild(bg)

if (level === null) {
	levelNum.textContent = "Please enter a valid level in the URL"

	suggestion.textContent = "For the tutorial, type: "

	suggestion2.textContent = "\"C:/Users/"
		
	suggestionMiddle.textContent = "yourName" 
		
	suggestionLast.textContent = "/mazeGame/index.html?level=0\""
}
else if (isNaN(parseInt(level))) {
	levelNum.textContent = `Invalid Level: ${level}`;
}
else if (parseInt(level) < 11) {
	levelNum.textContent = `Level ${level}`
}
else {
	levelNum.textContent = `Level Too High: ${level}`;
}

const Level = parseInt(level)
if (Level === 10) {
	levelNum.style.color = "black";
} else if (Level > 8) {
	levelNum.style.color = "#aa1111";
} else if (Level > 6) {
	levelNum.style.color = "#c3a622";
}else if (Level > 4) {
	levelNum.style.color = "#aacc33";
}else if (Level > 2) {
	levelNum.style.color = "#11aacc";
} else if (Level < 2) {
	levelNum.style.color = "lime";
} else {
	}
body.appendChild(levelNum)

if (suggestion) {
	body.appendChild(suggestion)
	body.appendChild(suggestion2)
	body.appendChild(suggestionMiddle)
	body.appendChild(suggestionLast)
}

/*setInterval(()=> {
   if (!stop) {
	//cl("not stopped")
	if (gravityDown > 0) {
		gravityDown += 0.05;
	}
	levelNum.textContent = gravityDown;
	Speeds.push(gravityDown)
   } else {
	//cl("stopped")
	gravityDown = 0;
    }
},100)*/

let vertical = 0;
let horizontal = 0;

switch (Level) {
	case 0:
		levelOne();
		break;
}


function levelOne() {
//	createObj(height, width, top, left)

	createObj(600, 20, 0, 55)
	createObj(20, 500, 655, 0)
	createObj(600, 20, 0, 140)
	createObj(20, 600, 580, 140)


	const user = d.createElement('div')
	user.className = "circle"
	body.appendChild(user)

	const hitbox = d.createElement('div')
	hitbox.className = "circle hitbox"
	user.appendChild(hitbox)


	setInterval(()=> {
		
	},1)

	setInterval(()=> {
		//user.style.left = horizontal + "%"
	},1)

	handleMovement(user)
}



function createObj(height, width, top, left) {
	object = d.createElement('div');
	object.className = "wall";
	object.style.height = height + "px";
	object.style.width = width + "px";
	object.style.top = top + "px";
	object.style.left = left + "px";
	//object.style.transform = `rotate(${rotation}deg)`;

	Objects.push(object);

	body.appendChild(object);

	return object;
}

/*function createObjH(height, width, top, left, rotation) {
	object = d.createElement('div');
	object.className = "wall";
	object.style.width = height + "px";
	object.style.height = width + "px";
	object.style.top = top + "px";
	object.style.left = left + "px";
	object.style.transform = `rotate(${rotation}deg)`;

	ObjectsH.push(object);

	body.appendChild(object);

	return object;
}*/


function handleMovement(el) {
	el.style.top = "0%"
	el.style.left = "0%"

	d.addEventListener('keydown', (e)=> {

		results = checkCollisions(el)

		let k = e.key;
		
		if (k === "ArrowUp") {
			vertical += 0
			if (!results.at(0)) {
				vertical = (vertical - 10);
			}
			el.style.top = vertical + "px"
		} else if (k === "ArrowDown") {
			vertical -= 0
			if (!results.at(1)) {
				vertical = (vertical + 10);
			}
			el.style.top = vertical + "px"
		} else if (k === "ArrowLeft") {
			if (!results.at(2)) {
				horizontal -= 10;
			}
			el.style.left = horizontal + "px"
		} else if (k === "ArrowRight") {
			if (!results.at(3)) {
				horizontal += 10;
			}
			el.style.left = horizontal + "px"
		}
	})

}

function isTouching(a, b) {
    const r1 = a.getBoundingClientRect();
    const r2 = b.getBoundingClientRect();

    return !(
        r1.right < r2.left ||
        r1.left > r2.right ||
        r1.bottom < r2.top ||
        r1.top > r2.bottom
    );
}


function checkCollisions(user) {
    touchingDown = false;
    touchingLeft = false;
    touchingRight = false;
	touchingUp = false;

    const r1 = user.getBoundingClientRect();

    for (let wall of Objects) {
        if (!isTouching(user, wall)) continue;

        const r2 = wall.getBoundingClientRect();

        // Hitting wall BELOW
        if (r1.bottom >= r2.top && r1.top < r2.top) {
            touchingDown = true;
        }

	// Hitting wall ABOVE
	if (r1.top <= r2.bottom && r1.bottom > r2.bottom) {
            touchingUp = true;
            //user.style.top = (user.top + (r2.bottom - r1.top)) + "%";
        }

        // Hitting wall on LEFT
        if (r1.left <= r2.right && r1.right > r2.right) {
            touchingLeft = true;
            //user.style.left = (user.offsetLeft + (r2.right - r1.left)) + "%";
        }

        // Hitting wall on RIGHT
        if (r1.right >= r2.left && r1.left < r2.left) {
            touchingRight = true;
            //user.style.left = (user.offsetLeft - (r1.right - r2.left)) + "%";
        }
    }
	
	return [touchingUp, touchingDown, touchingLeft, touchingRight]
}






