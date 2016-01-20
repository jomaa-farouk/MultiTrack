'use strict';

(function() {
	// body...
	var app = angular.module('home.controller', []);


	app.controller('HomeController', ['$scope', '$compile', 'MixsFactory', 'TrackFactory', 'TracksFactory', 
		function($scope, $compile, MixsFactory, TrackFactory,TracksFactory){


		var app = this;

		/********************      MIXS              *****************************/
		$scope.getAllMixs = function(){
			MixsFactory.query(
				function(response){
					$scope.message = 'Loading ...';
					$scope.showMixs = true;
					$scope.mixs = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};

		// on recupere un mix par id 
		$scope.getMix = function(mixId){
			MixsFactory.get({id:mixId}).$promise.then(
				function(response){
					$scope.showMix = true;
					$scope.mix = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};

		/********************     TRACKS              ********************/

		$scope.findAllTracks = function(){

			$scope.TracksFactory.query(
				function(response){
					$scope.showTracks = true;
					$scope.tracks = response;
				},
				function(response){
					$scope.message = 'Erro: '+response.status+' '+response.statusText;
				}
			);
		};


		$scope.findTrackById = function(trackId){
			TrackFactory.show({params:trackId}).$promise.then(
				function(response){
					$scope.showTrack = true;
					$scope.track = response;
				},
				function(response){
					$scope.message = 'Error: '+response.status+' '+response.statusText;
				}
			);
		};


		$scope.deleteTrack = function(trackId){
			TrackFactory.delete({id: trackId});
			$scope.tracks = TracksFactory.query();
		};

		$scope.mixs = MixsFactory.query();
		$scope.tracks = TracksFactory.query();

	//	$scope.tracks = [ {"trackName":"Michael jackson - Beat It","piste":[{"pisteMp3":"basse.mp3"},{"pisteMp3":"batterie.mp3"},{"pisteMp3":"guitare.mp3"},{"pisteMp3":"synthes.mp3"},{"pisteMp3":"voix.mp3"}],"singer":"Micheal Jackson","album":"Beat It","type":"Pop","description":"Song of Micheal Jackson","dateOfTrack":"1992-10-21T13:28:06.419Z"},{"trackName":"Metallica - One","piste":[{"pisteMp3":"guitar.mp3"},{"pisteMp3":"rhythm.mp3"},{"pisteMp3":"song.mp3"}],"singer":"","album":"","type":"","description":"","dateOfTrack":""}];
	



/////// added 17/01 by Farouk:


var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;

var gainSlider, gainNode, pannerSlider, pannerNode, bplay, bpause, player, compressorNode, compressorButton, bstop, list, bmute;
var freq_input0, freq_input1, freq_input2, freq_input3, freq_input4, freq_input5, convSlider0, convSlider1, convSlider2, convSlider3;
var bupload, bsavemix;

var freq_pistes_input = new Array ();
var gain_pistes_input = new Array ();
var stereo_pistes_input = new Array ();
var mutePistes_input = new Array ();
var playOnly_input = new Array ();

var canvas, canvas2, canvasContext, canvasContext2, width, height, width2, height2, bufferLength, dataArray, bufferLength2, dataArray2;
var analyser, analyser2, gradient, analyserLeft, analyserRight, dataArrayLeft, dataArrayRight, splitter;


var bufferSourcet = [];
var decodedSoundt = [];
var soundURLt = [];

var stereoNodet = [];
var gainNodesT = [];

var filters = [];
var filtersPistes = [];

var casqueT = [];
var stoppressed = false;  

$scope.frequencies = ['60Hz' , '170Hz' , '350Hz' , '1000Hz' , '3500Hz' , '10000Hz' ];

$scope.impulses = ['dance hall','mythology','sports verb', 'wobble room'];

var decodedImpulset = [];
var convolverGaint =[];
var directGaint  = [];
var convolverNodet = [];

$scope.trackSelected = false;

$scope.gain = 1;

$scope.impulse_value = 0;



$scope.init = function(){
  // get the AudioContext0
  audioContext = new ctx();
  pannerNode = audioContext.createStereoPanner();


  player = document.getElementById('player');
  gainSlider = document.getElementById('gainSlider');
  pannerSlider = document.getElementById('pannerSlider');
  bplay = document.getElementById('play');
  bpause = document.getElementById('pause');
  bstop = document.getElementById('stop');
  compressorButton = document.getElementById('compressorButton');
  list = document.getElementById('select');
  bmute = document.getElementById('mute');
  bupload = document.getElementById('upload');
  bsavemix = document.getElementById('savemix');

  $scope.impulses.forEach (function(impulse , i) {
  var  impulseURL = 'http://localhost:8080/impulse/' + impulse + '.wav';

  loadImpulse(impulseURL, i);

  });

  initCanvas ();


      // starts the animation at 60 frames/s
  requestAnimationFrame(visualize);
  requestAnimationFrame(visualize2);


};


function initCanvas ()
{
    // get the canvas, its graphic context...
   canvas = document.getElementById("myCanvas");
   width = canvas.width;
   height = canvas.height;
   canvasContext = canvas.getContext('2d');


   canvas2 = document.getElementById("myCanvas2");
   width2 = canvas2.width;
   height2 = canvas2.height;
   canvasContext2 = canvas2.getContext('2d');
   
   
   
      // Create an analyser node
   analyser = audioContext.createAnalyser();
   // set visualizer options, for lower precision change 1024 to 512,
   // 256, 128, 64 etc. bufferLength will be equal to fftSize/2
   analyser.fftSize = 512;
   bufferLength = analyser.frequencyBinCount;
   dataArray = new Uint8Array(bufferLength);

   
     // Create an analyser node
  analyser2 = audioContext.createAnalyser();
  
  // Try changing for lower values: 512, 256, 128, 64...
  analyser2.fftSize = 256;
  bufferLength2 = analyser2.frequencyBinCount;
  dataArray2 = new Uint8Array(bufferLength2);
  

  gradient = canvasContext.createLinearGradient(0,0,0, height);
  gradient.addColorStop(1,'#000000');
  gradient.addColorStop(0.75,'#ff0000');
  gradient.addColorStop(0.25,'#ffff00');
  gradient.addColorStop(0,'#ffffff');

  analyserLeft = audioContext.createAnalyser();
  analyserLeft.fftSize = 256;
  var bufferLengthLeft = analyserLeft.frequencyBinCount;
  dataArrayLeft = new Uint8Array(bufferLengthLeft);
  
  analyserRight = audioContext.createAnalyser();
  analyserRight.fftSize = 256;
  var bufferLengthRight = analyserRight.frequencyBinCount;
  dataArrayRight = new Uint8Array(bufferLengthRight);

  splitter = audioContext.createChannelSplitter();
 
  // connect one of the outputs from the splitter to
  // the analyser
  splitter.connect(analyserLeft,0,0);
  splitter.connect(analyserRight,1,0);

}

$scope.loadTrackList = function(Track){

$scope.trackSelected = true;

freq_input0 = document.getElementById('freq_input0');
freq_input1 = document.getElementById('freq_input1');
freq_input2 = document.getElementById('freq_input2');
freq_input3 = document.getElementById('freq_input3');
freq_input4 = document.getElementById('freq_input4');
freq_input5 = document.getElementById('freq_input5');

convSlider0 = document.getElementById('convolverSlider0');
convSlider1 = document.getElementById('convolverSlider1');
convSlider2 = document.getElementById('convolverSlider2');
convSlider3 = document.getElementById('convolverSlider3');

mutePistes_input = new Array ();
playOnly_input = new Array ();
gain_pistes_input = new Array ();
stereo_pistes_input = new Array ();
freq_pistes_input = new Array ();

timer(0);
var array = JSON.parse("[" + Track + "]");
var selectedTrack = array[0];



	stopGraph (true);
	//initCanvas ();
  bstop.disabled = true;

var div_tracks = document.getElementById('tracks_list');
soundURLt = [];
var  base = 'http://localhost:8080/track/' + selectedTrack.trackName + '/sound/';

var content = '<div class="row" >';

selectedTrack.piste.forEach (function(songName , i) {

casqueT [i] = 0;
soundURLt[i] =  base + songName.pisteMp3 ; 

content+='<div class="col-md-2"><H4 align="center">'+songName.pisteMp3;
content+='<button class="mute" id="mute'+i+'" style="cursor: pointer;" ng-click = "mute ('+i+')">&nbsp;&nbsp;</button> ';
content+='<button class="muteothers" id="muteothers'+i+'" style="cursor: pointer;" ng-click = "muteothers ('+i+')"></button>'+'</H4>';
content+='<div class="controls1"><div class="row">';

var k = i+1;

$scope.frequencies.forEach (function(freq , j) {

var s = "";
s+='<label>'+freq+'</label>';
s+='<input  id="freq_value'+k+j+'" type="range" value="0" step="1" min="-30" max="30" ng-model="freq_val'+k+j+'" ng-change="changeFrequency(freq_val'+k+j+' ,'+k+' ,'+j+')"></input>';
s+='<output id="freq'+k+j+'">0 dB<br></output>';


content=content+s;

});

content+='</div> </div> <div class="row">';
content+='<div class="col-md-6"><label for="gainSlider">Gain</label>';
content+='<input class="range" type="range" min="0" max="1" step="0.01" value="1" id="gainSlider'+i+'" ng-model="gain'+k+'" ng-change="changeGain (gain'+k+' , '+k+')"/>';
content+='</div><div class="col-md-6"><label for="pannerSlider">Balance</label>';
content+='<input class="range" type="range" min="-1" max="1" step="0.1" value="0" id="pannerSlider'+i+'" ng-model="panner'+k+'" ng-change="changePanner (panner'+k+' , '+k+')" />';

content+='</div> </div> </div>';

});

content+=' </div>';

var freq_tabo = document.createElement('div');			
freq_tabo.innerHTML = content;
div_tracks.innerHTML = null;
div_tracks.appendChild (freq_tabo);
$compile(freq_tabo)($scope);

var l;
selectedTrack.piste.forEach (function(songName , i) {

mutePistes_input.push (document.getElementById('mute'+i));
playOnly_input.push (document.getElementById('muteothers'+i));
gain_pistes_input.push (document.getElementById('gainSlider'+i));
stereo_pistes_input.push (document.getElementById('pannerSlider'+i));
  
  l = i+1;

$scope.frequencies.forEach (function(freq , j) { 
freq_pistes_input.push (document.getElementById("freq_value"+l+j));
});

desactivateAll ();
});

initBuffer(true) ;

};


function initBuffer(load) {

if (load == true) $scope.percentage = 0;

for (var i = 0; i < soundURLt.length; i++) {
    bufferSourcet[i] = audioContext.createBufferSource();
	
	if (load == true)
	{
    loadSoundUsingAjax(soundURLt[i] , i);
    }
}

}


function loadSoundUsingAjax(url , i) {
  var request = new XMLHttpRequest();
  
  request.open('GET', url, true);
  // Important: we're loading binary data
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    console.log("Sound loaded");    

    // Let's decode it. This is also asynchronous
    audioContext.decodeAudioData(request.response, function(buffer) {
      console.log("Sound decoded");
   

      $scope.percentage += (100/ (soundURLt.length) );
      timer(parseInt( $scope.percentage ) );

	  decodedSoundt [i] = buffer;
    bufferSourcet[i].buffer = decodedSoundt[i];
    bufferSourcet[i].start();

   
	  // we enable the button
     if ($scope.percentage == 100)
	  {
	 bplay.disabled = false;
   list.disabled = false;

      }   
 	}, function(e) {
      console.log("error");});
  };
  
  // send the request. When the file will be loaded,
  // the request.onload callback will be called (above)
  request.send();
}


  function timer(n) {
    $(".progress-bar").css("width", n + "%");
        $("#pourcentage").text(n + "%");

    }


$scope.changeGain = function(gain , i){
    if (i==0) gainNode.gain.value = gain;
     else
     	gainNodesT[i-1].gain.value = gain;
};


$scope.changePanner = function(panner , i){
    if (i==0) pannerNode.pan.value = panner;
     else
     	stereoNodet[i-1].pan.value= panner;
};

$scope.changeFrequency = function(freq_value , row , index){
   var output = document.getElementById("freq"+row+index);

    output.innerHTML = '<output>'+freq_value+' dB</output>';

    if (row==0) filters[index].gain.value = freq_value;
    else   filtersPistes[row-1][index].gain.value = freq_value;
};

$scope.buttonCompressor = 'Turn Compressor ON';
$scope.ompressorSelected = false;

$scope.updateCompressor = function () {

var compressorButton = document.getElementById("compressorButton");
$scope.ompressorSelected = !$scope.ompressorSelected;

if ( $scope.ompressorSelected == false )
{
$scope.buttonCompressor = 'Turn Compressor ON';
compressorNode.disconnect(audioContext.destination);
analyser2.disconnect(compressorNode);
analyser2.connect(audioContext.destination);
}

else
{	$scope.buttonCompressor = 'Turn Compressor OFF';
analyser2.disconnect(audioContext.destination);
analyser2.connect(compressorNode);
compressorNode.connect(audioContext.destination);
}
};


$scope.play = function(){

for (var i = 0; i < soundURLt.length; i++) {
    
    bufferSourcet[i] = audioContext.createBufferSource();
    bufferSourcet[i].buffer = decodedSoundt[i];
    bufferSourcet[i].start();
    
}

buildAudioGraph();
stoppressed = false;

   activateAll ();

bplay.disabled = true;

};


$scope.stop = function(){
stoppressed = true;
stopGraph (false);
initBuffer(false) ;
bplay.disabled = false;
bpause.disabled = true;
bstop.disabled = true;
 };

 $scope.pause = function(){
console.log ('stop') ;
};



function stopGraph (destroy) {

if (!(stoppressed && destroy))
{
 for (var i = 0; i < bufferSourcet.length; i++) {
  bufferSourcet[i].stop();
}}

if (destroy == true)
 {
 
 bufferSourcet = [];
 decodedSoundt = [] ;
 soundURLt = [];
 
 stereoNodet = [];
 filtersPistes = [];
 gainNodesT = [];

 }
}

  $scope.firstTime = true;

function buildAudioGraph( ) {

  // create source and gain node
  gainNode = audioContext.createGain();
  var stereoModify;
  
  for (var i = 0; i < bufferSourcet.length; i++) {
    
   stereoNodet[i] = audioContext.createStereoPanner();
   bufferSourcet[i].connect ( stereoNodet[i]);
   gainNodesT[i] = audioContext.createGain(); 
  }
  
    // create the equalizer. It's a set of biquad Filters
   // Set filters
   filters = [];
    $scope.frequencies.forEach(function(freq, i) {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = parseFloat(freq);
      eq.type = "peaking";
      eq.gain.value = 0;
      filters.push(eq);
    });
	
	for (var j = 0; j < bufferSourcet.length; j++) {
		  filtersPistes[j] = new Array();

	    $scope.frequencies.forEach(function(freq, i) {
	
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = parseFloat(freq);
      eq.type = "peaking";
      eq.gain.value = 0;
      filtersPistes[j].push(eq);

    });
	}
	
	
	
	for (var j = 0; j < filtersPistes.length ; j++) {

	    for (var i = 0; i < filtersPistes[j].length - 1 ; i++) {
		  
	  if (i == 0)
	  { stereoNodet[j].connect (filtersPistes[j][i]);
	    filtersPistes[j][i].connect(filtersPistes[j][i+1]); 
	  }	  
      else
	  {     filtersPistes[j][i].connect(filtersPistes[j][i+1]);   
	  }	  

    }
	
	   filtersPistes[j][filtersPistes[j].length - 1].connect(gainNodesT[j]) ;
	   gainNodesT[j].connect(gainNode) ;
	   

	}
	
  // Connect filters in serie
   gainNode.connect(filters[0]);
   for(var i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i+1]);
    }

	compressorNode = audioContext.createDynamicsCompressor();

	// connect the last filter to the speakers
  filters[filters.length - 1].connect(pannerNode);

if ($scope.firstTime)
{
  $scope.firstTime = false;

  for (var i=0 ; i<convolverNodet.length ; i++)
    {

      // direct/dry route source -> directGain -> destination
  pannerNode.connect(directGaint[i]);
  directGaint[i].connect(analyser);


  // wet route with convolver: source -> convolver
  // -> convolverGain -> destination
  pannerNode.connect(convolverNodet[i]);
  convolverNodet[i].connect(convolverGaint[i]);
  convolverGaint[i].connect(analyser);

    // connect the source to the analyser and the splitter
  pannerNode.connect(splitter);



  }

	//pannerNode.connect(analyser);
  analyser.connect(analyser2);
  analyser2.connect(audioContext.destination);
}
}


function visualize() {

  //herrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
 
  clearCanvas();
  
  drawVolumeMeters();
  drawWaveform();


  // once again call the visualize function at 60 frames/s
  requestAnimationFrame(visualize);
}


function drawWaveform() {
  canvasContext.save();
  // Get the analyser data
  analyser.getByteTimeDomainData(dataArray);

  canvasContext.lineWidth = 3;
  canvasContext.strokeStyle = 'lightBlue';

  // all the waveform is in one single path, first let's
  // clear any previous path that could be in the buffer
  canvasContext.beginPath();
  
  var sliceWidth = width / bufferLength;
  var x = 0;
  
      // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
      // before drawing. This is the scale factor
      var heightScale = height/128;

  for(var i = 0; i < bufferLength; i++) {
     // dataArray[i] between 0 and 255
     var v = dataArray[i] / 255;
     var y = v * height;
    
     if(i === 0) {
        canvasContext.moveTo(x, y);
     } else {
        canvasContext.lineTo(x, y);
     }

     x += sliceWidth;
  }

  canvasContext.lineTo(canvas.width, canvas.height/2);
  
  // draw the path at once
  canvasContext.stroke();    
  canvasContext.restore();
}


function clearCanvas() {
   canvasContext.save();
  
   // clear the canvas
   // like this: canvasContext.clearRect(0, 0, width, height);
  
   // Or use rgba fill to give a slight blur effect
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasContext.fillRect(0, 0, width, height);
  
  canvasContext.restore();
}


function drawVolumeMeters() {
  canvasContext.save();
  
  // set the fill style to a nice gradient
  canvasContext.fillStyle=gradient;
  
  // left channel
  analyserLeft.getByteFrequencyData(dataArrayLeft);
  var averageLeft = getAverageVolume(dataArrayLeft);
  
  // draw the vertical meter for left channel
  canvasContext.fillRect(0,height-averageLeft,25,height);
  
  // right channel
  analyserRight.getByteFrequencyData(dataArrayRight);
  var averageRight = getAverageVolume(dataArrayRight);
  
  // draw the vertical meter for left channel
  canvasContext.fillRect(26,height-averageRight,25,height);

  
  canvasContext.restore();
}

function getAverageVolume(array) {
        var values = 0;
        var average;
 
        var length = array.length;
 
        // get all the frequency amplitudes
        for (var i = 0; i < length; i++) {
            values += array[i];
        }
 
        average = values / length;
        return average;
    }

function visualize2() {

    canvasContext2.save();
    canvasContext2.fillStyle = "rgba(0, 0, 0, 0.05)";
    canvasContext2.fillRect (0, 0, width2, height2);
  
  // Get the analyser data
  analyser2.getByteFrequencyData(dataArray2);


    var nbFreq = dataArray2.length;
    
    var SPACER_WIDTH = 5;
    var BAR_WIDTH = 2;
    var OFFSET = 100;
    var CUTOFF = 23;
    var HALF_HEIGHT = height2/2;
    var numBars = 1.7*Math.round(width2 / SPACER_WIDTH);
    var magnitude;
  
    canvasContext2.lineCap = 'round';

    for (var i = 0; i < numBars; ++i) {
       magnitude = 0.3*dataArray2[Math.round((i * nbFreq) / numBars)];
        
       canvasContext2.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
       canvasContext2.fillRect(i * SPACER_WIDTH, HALF_HEIGHT, BAR_WIDTH, -magnitude);
       canvasContext2.fillRect(i * SPACER_WIDTH, HALF_HEIGHT, BAR_WIDTH, magnitude);

    }

        // Draw animated white lines top
    canvasContext2.strokeStyle = "white";
    canvasContext2.beginPath();

    for (i = 0; i < numBars; ++i) {
        magnitude = 0.3*dataArray2[Math.round((i * nbFreq) / numBars)];
          if(i > 0) {
            //console.log("line lineTo "  + i*SPACER_WIDTH + ", " + -magnitude);
            canvasContext2.lineTo(i*SPACER_WIDTH, HALF_HEIGHT-magnitude);
        } else {
            //console.log("line moveto "  + i*SPACER_WIDTH + ", " + -magnitude);
            canvasContext2.moveTo(i*SPACER_WIDTH, HALF_HEIGHT-magnitude);
        }
    }

    for (i = 0; i < numBars; ++i) {
        magnitude = 0.3*dataArray2[Math.round((i * nbFreq) / numBars)];
          if(i > 0) {
            //console.log("line lineTo "  + i*SPACER_WIDTH + ", " + -magnitude);
            canvasContext2.lineTo(i*SPACER_WIDTH, HALF_HEIGHT+magnitude);
        } else {
            //console.log("line moveto "  + i*SPACER_WIDTH + ", " + -magnitude);
            canvasContext2.moveTo(i*SPACER_WIDTH, HALF_HEIGHT+magnitude);
        }
    }    
  
    canvasContext2.stroke();
    canvasContext2.restore();
    requestAnimationFrame(visualize2);
  
}


$scope.muteAll = function () {

   var button = document.getElementById("mute");

  if   ( gainNode.gain.value != 0 )
  { 
  gainNode.gain.value = 0;
  button.style.backgroundImage="url('./lib/image/sound.png')";
  }
 
 else 
  {
   gainNode.gain.value = gainSlider.value;
	 button.style.backgroundImage="url('./lib/image/mute.png')";
}
	
};

    
  $scope.mute = function (i) {
	
var button = document.getElementById('mute'+i);
var gainSlideri = document.getElementById('gainSlider'+i);
if   ( gainNodesT[i].gain.value != 0 )
  { 
  gainNodesT[i].gain.value = 0;
  button.style.backgroundImage="url('./lib/image/sound.png')";
 }

 else 
{
   gainNodesT[i].gain.value = gainSlideri.value;
	 button.style.backgroundImage="url('./lib/image/mute.png')";
}	
 };
  
  $scope.muteothers = function (i) {
     
      casqueT [i] += 1;
      var button = document.getElementById('muteothers'+i);

	   if (casqueT[i] % 2 != 0)
	{
	
	button.style.backgroundImage="url('./lib/image/headn.png')";

	for (var j = 0; j < gainNodesT.length  ; j++)
  {
  if (j != i)
  {
  gainNodesT[j].gain.value = 0;
  button = document.getElementById('muteothers'+j);
  button.style.backgroundImage="url('./lib/image/head.png')";
  if (casqueT[j] % 2 != 0) casqueT [j] += 1;
  }
  else
  gainNodesT[j].gain.value = gainNodesT[i].gain.value;
  }}
  
  else 
 	{	
  button.style.backgroundImage="url('./lib/image/head.png')";
  for (var j = 0; j < gainNodesT.length  ; j++)
  {
  gainNodesT[j].gain.value = 1;
  }}	 

  };





function loadImpulse(url, i ) {
   var ajaxRequest = new XMLHttpRequest();
   ajaxRequest.open('GET', url, true);
   ajaxRequest.responseType = 'arraybuffer'; // for binary transfer
 
   ajaxRequest.onload = function() {
      // The impulse has been loaded
      var impulseData = ajaxRequest.response;
      // let's decode it.
      audioContext.decodeAudioData(impulseData, function(buffer) {
         // The impulse has been decoded
         decodedImpulset[i] = buffer;
         // Let's call the callback function, we're done!
         buildImpulseNode(i);
     });
   };
   ajaxRequest.onerror = function(e) {
      console.log("Error with loading audio data" + e.err);
   };
   ajaxRequest.send();
}

function buildImpulseNode(i)
{
  convolverNodet[i] = audioContext.createConvolver();
  // Set the buffer property of the convolver node with the decoded impulse
  convolverNodet[i].buffer = decodedImpulset[i];
 
  convolverGaint[i] = audioContext.createGain();
  convolverGaint[i].gain.value = 0;
 
  directGaint[i] = audioContext.createGain();
  directGaint[i].gain.value = 1;
}


$scope.changeImpulse = function(index)
{

var impulse = document.getElementById ('convolverSlider' + index);
    convolverGaint[index].gain.value = impulse.value;
    directGaint[index].gain.value = 1 - convolverGaint[index].gain.value;

};


function desactivateAll ()
{

  gainSlider.disabled = true;
  pannerSlider.disabled = true;
  bplay.disabled = true;
  bpause.disabled = true;
  bpause.disabled = true;
  bstop.disabled = true;
  compressorButton.disabled = true;
  list.disabled = true;
  mute.disabled = true;

  freq_input0.disabled = true;
  freq_input1.disabled = true;
  freq_input2.disabled = true;
  freq_input3.disabled = true;
  freq_input4.disabled = true;
  freq_input5.disabled = true;

  convSlider0.disabled = true;
  convSlider1.disabled = true;
  convSlider2.disabled = true;
  convSlider3.disabled = true;

  mutePistes_input.forEach (function(mute , i) {
  mute.disabled = true;
  });

  playOnly_input.forEach (function(play , i) {
  play.disabled = true;
  });

  freq_pistes_input.forEach (function(freq , i) {
  freq.disabled = true;
  });

  stereo_pistes_input.forEach (function(stereo , i) {
  stereo.disabled = true;
  });

  gain_pistes_input.forEach (function(gain , i) {
  gain.disabled = true;
  });

  bupload.disabled = true;
  bsavemix.disabled = true;
}

function activateAll ()
{

  gainSlider.disabled = false;
  pannerSlider.disabled = false;
  bplay.disabled = false;
  bpause.disabled = false;
  bstop.disabled = false;
  compressorButton.disabled = false;
  list.disabled = false;
  mute.disabled = false;

  freq_input0.disabled = false;
  freq_input1.disabled = false;
  freq_input2.disabled = false;
  freq_input3.disabled = false;
  freq_input4.disabled = false;
  freq_input5.disabled = false;
  
  convSlider0.disabled = false;
  convSlider1.disabled = false;
  convSlider2.disabled = false;
  convSlider3.disabled = false;

  mutePistes_input.forEach (function(mute , i) {
  mute.disabled = false;
  });

  playOnly_input.forEach (function(play , i) {
  play.disabled = false;
  });

  freq_pistes_input.forEach (function(freq , i) {
  freq.disabled = false;
  });

  stereo_pistes_input.forEach (function(stereo , i) {
  stereo.disabled = false;
  });

  gain_pistes_input.forEach (function(gain , i) {
  gain.disabled = false;
  });

  bupload.disabled = false;
  bsavemix.disabled = false;

}

	
$scope.saveNewMix = function(){

 var mix = {
        "username": "test",
        "mixName" : "test",
        "description" : "test",
        "gain": [],
        "balance": [],
        "compressor": "ON",
        "frequencies": [],
        "impulse": []
    };

var myJSONText = JSON.stringify(mix, replace);
console.log (myJSONText);

 };

 function replace(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}


  }]);
})();