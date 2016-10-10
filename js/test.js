
var manualControl = false;
var longitude = 0;
var latitude = 0;
var savedX;
var savedY;
var savedLongitude;
var savedLatitude;
var image = 'test.jpg'
var GLOBALS = [];

function readQueryParams() {

		if(document.location.search) {
			var queryString = document.location.search.replace('?', '');

			queryString.split('&').forEach(function (pair) {
				var pairArray = pair.split('=');
				GLOBALS.push(pairArray[1])
			});
		}
		console.log(GLOBALS);
		image = GLOBALS[0];    
	}
readQueryParams();


var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var scene = new THREE.Scene();


var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.target = new THREE.Vector3(0, 0, 0);


var sphere = new THREE.SphereGeometry(100, 100, 40);
sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

var loader = new THREE.TextureLoader();
var texture = loader.load(image);

var sphereMaterial = new THREE.MeshBasicMaterial();
sphereMaterial.map = texture;


var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
scene.add(sphereMesh);


	document.addEventListener("mousedown", onDocumentMouseDown, false);
	document.addEventListener("mousemove", onDocumentMouseMove, false);
	document.addEventListener("mouseup", onDocumentMouseUp, false);

	render();

	function render(){

		requestAnimationFrame(render);

		if(!manualControl){
			longitude += 0.02;
		}


				latitude = Math.max(-85, Math.min(85, latitude));


				camera.target.x = 400 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
				camera.target.y = 400 * Math.cos(THREE.Math.degToRad(90 - latitude));
				camera.target.z = 400 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
				camera.lookAt(camera.target);


				renderer.render(scene, camera);
				
			}
			

			function onDocumentMouseDown(event){

				event.preventDefault();

				manualControl = true;

				savedX = event.clientX;
				savedY = event.clientY;

				savedLongitude = longitude;
				savedLatitude = latitude;

			}


			function onDocumentMouseMove(event){

				if(manualControl){
					longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
					latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
				}

			}


			function onDocumentMouseUp(event){

				manualControl = false;

			}