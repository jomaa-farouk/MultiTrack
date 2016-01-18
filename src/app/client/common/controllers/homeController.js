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
			TracksFactory.show({params:trackId}).$promise.then(
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
		//$scope.tracks = TracksFactory.query();
		$scope.tracks = [ {"trackName":"Michael jackson - Beat It","piste":[{"pisteMp3":"basse.mp3"},{"pisteMp3":"batterie.mp3"},{"pisteMp3":"guitare.mp3"},{"pisteMp3":"synthes.mp3"},{"pisteMp3":"voix.mp3"}],"singer":"Micheal Jackson","album":"Beat It","type":"Pop","description":"Song of Micheal Jackson","dateOfTrack":"1992-10-21T13:28:06.419Z"},{"trackName":"Metallica - One","piste":[{"pisteMp3":"guitar.mp3"},{"pisteMp3":"rhythm.mp3"},{"pisteMp3":"song.mp3"}],"singer":"","album":"","type":"","description":"","dateOfTrack":""}];
	
/////// added 17/01 by Farouk:


var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext;

var gainSlider, gainNode, pannerSlider, pannerNode, bplay, bpause, player, compressorNode, compressorButton, bstop ;
var canvas, canvas2, canvasContext, canvasContext2, width, height, width2, height2, bufferLength, dataArray, bufferLength2, dataArray2;
var compressorOn = false;
var analyser, analyser2;

var bufferSourcet = [];
var decodedSoundt = [];
var soundURLt = [];

var stereoNodet = [];
var filters = [];
var filtersPistes = [];
var gainNodesT = [];

var casqueT = [];

$scope.frequencies = ['60Hz' , '170Hz' , '350Hz' , '1000Hz' , '3500Hz' , '10000Hz' ];
$scope.freq_values = [];
$scope.trackSelected = false;



$scope.init = function(){
  // get the AudioContext0
  audioContext = new ctx();

  player = document.getElementById('player');
  gainSlider = document.getElementById('gainSlider');
  pannerSlider = document.getElementById('pannerSlider');
  bplay = document.getElementById('play');
  bpause = document.getElementById('pause');
  bstop = document.getElementById('stop');
  compressorButton = document.getElementById('compressorButton');
  

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
   analyser.fftSize = 1024;
   bufferLength = analyser.frequencyBinCount;
   dataArray = new Uint8Array(bufferLength);

   
     // Create an analyser node
  analyser2 = audioContext.createAnalyser();
  
  // Try changing for lower values: 512, 256, 128, 64...
  analyser2.fftSize = 256;
  bufferLength2 = analyser2.frequencyBinCount;
  dataArray2 = new Uint8Array(bufferLength2);
}


$scope.loadTrackList = function(selectedTrack){
timer(0);
$scope.trackSelected = true;

	stopGraph (true);
	initCanvas ();
    bstop.disabled = true;

var div_tracks = document.getElementById('tracks_list');
soundURLt = [];
var  base = 'http://localhost:8080/track/' + selectedTrack.trackName + '/sound/';

var content = '<div class="row">';

selectedTrack.piste.forEach (function(songName , i) {

casqueT [i] = 0;

soundURLt[i] =  base + songName.pisteMp3  ; 


content+='<div class="col-md-2"><H4 align="center">'+songName.pisteMp3;
content+='<button class="mute" id="mute'+i+'" style="cursor: pointer;" ng-click = "mute ('+i+')">&nbsp;&nbsp;</button> ';
content+='<button class="muteothers" id="muteothers'+i+'" style="cursor: pointer;" ng-click = "muteothers ('+i+')"></button>'+'</H4>';
content+='<div class="controls1"><div class="row">';

var k = i+1;

$scope.frequencies.forEach (function(freq , j) {

var s = "";
s+='<label>'+freq+'</label>';
s+='<input  type="range" value="0" step="1" min="-30" max="30" ng-model="freq_val'+k+j+'" ng-change="changeFrequency(freq_val'+k+j+' ,'+k+' ,'+j+')"></input>';
s+='<output id="freq'+k+j+'">0 dB<br></output>';


content=content+s;

});

content+='</div> </div> <div class="row">';
content+='<div class="col-md-6"><label for="gainSlider">Gain</label>';
content+='<input type="range" min="0" max="1" step="0.01" value="1" id="gainSlider'+i+'" ng-model="gain'+k+'" ng-change="changeGain (gain'+k+' , '+k+')"/>';
content+='</div><div class="col-md-6"><label for="pannerSlider">Balance</label>';
content+='<input type="range" min="-1" max="1" step="0.1" value="0" id="pannerSlider'+i+'" ng-model="panner'+k+'" ng-change="changePanner (panner'+k+' , '+k+')" />';

content+='</div> </div> </div>';

});

content+=' </div>';

var freq_tabo = document.createElement('div');			
freq_tabo.innerHTML = content;
div_tracks.innerHTML = null;
div_tracks.appendChild (freq_tabo);
$compile(freq_tabo)($scope);

initBuffer(true) ;

};


function initBuffer(load) {

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
          timer( (100/ (soundURLt.length) ) * (i) + ( (100/ (soundURLt.length) ) ));

	  decodedSoundt [i] = buffer;
   
	  // we enable the button
     if (i == soundURLt.length-1)
	  {
	 bplay.disabled = false;
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
console.log (gain+'test'+i);
    if (i==0) gainNode.gain.value = gain;
     else
     	gainNodesT[i-1].gain.value = gain;
};


$scope.changePanner = function(panner , i){
console.log (panner + 'hi' + i);
    if (i==0) pannerNode.pan.value = panner;
     else
     	stereoNodet[i-1].pan.value= panner;

};

$scope.changeFrequency = function(freq_value , row , index){
   var output = document.getElementById("freq"+row+index);
   	console.log ("freq"+row+index);
    output.innerHTML = '<output>'+freq_value+' dB</output>';

    if (row==0) filters[index].gain.value = freq_value;
    else   filtersPistes[row-1][index].gain.value = freq_value;
};

$scope.buttonCompressor = 'Turn Compressor ON';
$scope.ompressorSelected = false;

$scope.updateCompressor = function () {
console.log ('hi');
	$scope.compressor = !$scope.compressor ;
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

    buildAudioGraph();
    bplay.disabled = true;
    bpause.disabled = false;
    bstop.disabled = false;


};


$scope.stop = function(){
  
	stopGraph (false);
	initBuffer(false) ;
    bplay.disabled = false;
    bpause.disabled = true;
    bstop.disabled = true;
  
  };


function stopGraph (destroy) {

 for (var i = 0; i < bufferSourcet.length; i++) {
   bufferSourcet[i].stop();
}

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
function buildAudioGraph( ) {

  // create source and gain node
  gainNode = audioContext.createGain();
  pannerNode = audioContext.createStereoPanner();
  var stereoModify;
  
  for (var i = 0; i < bufferSourcet.length; i++) {
   bufferSourcet[i].buffer = decodedSoundt[i];
   bufferSourcet[i].start();
   stereoNodet[i] = audioContext.createStereoPanner();
   bufferSourcet[i].connect ( stereoNodet[i]);
   gainNodesT[i] = audioContext.createGain();
   //stereoNodet[i].connect (gainNode);
   
  }
  
    // create the equalizer. It's a set of biquad Filters
   // Set filters
    [60, 170, 350, 1000, 3500, 10000].forEach(function(freq, i) {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      filters.push(eq);
    });
	
		 for (var j = 0; j < bufferSourcet.length; j++) {
		  filtersPistes[j] = new Array();

	[60, 170, 350, 1000, 3500, 10000].forEach(function(freq, i) {
	
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
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

	

  pannerNode.connect(analyser);
  analyser.connect(analyser2);
  analyser2.connect(audioContext.destination);

}


function visualize() {
  // 1 - clear the canvas
  // like this: canvasContext.clearRect(0, 0, width, height);
  // Or use rgba fill to give a slight blur effect
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  canvasContext.fillRect(0, 0, width, height);
  // 2 - Get the analyser data - for waveforms we need time domain data
  analyser.getByteTimeDomainData(dataArray);
 
  // 3 - draws the waveform
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = 'lightBlue';
 
  // the waveform is in one single path, first let's
  // clear any previous path that could be in the buffer
  canvasContext.beginPath();
  var sliceWidth = width / bufferLength;
  var x = 0;
 
  for(var i = 0; i < bufferLength; i++) {
    // dataArray values are between 0 and 255,
    // normalize v, now between 0 and 1
    var v = dataArray[i] / 255;
    // y will be in [0, canvas height], in pixels
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
  // once again call the visualize function at 60 frames/s
  requestAnimationFrame(visualize);
}


function visualize2() {

  // clear the canvas
  canvasContext2.clearRect(0, 0, width2, height2);
  
  // Or use rgba fill to give a slight blur effect
  //canvasContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
  //canvasContext.fillRect(0, 0, width, height);
  
  // Get the analyser data
  analyser2.getByteFrequencyData(dataArray2);

   var barWidth = width2 / bufferLength2;
      var barHeight;
      var x = 0;
   
      // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
      // before drawing. This is the scale factor
      var heightScale = height2/128;
  
      for(var i = 0; i < bufferLength2; i++) {
        barHeight = dataArray2[i];


        canvasContext2.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        barHeight *= heightScale;
        canvasContext2.fillRect(x, height2-barHeight/2, barWidth, barHeight/2);

        // 2 is the number of pixels between bars
        x += barWidth + 1;
      }
  
  // call again the visualize function at 60 frames/s
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
	
	console.log (i);
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
}
	
	
	}

	else 
 	
{	button.style.backgroundImage="url('./lib/image/head.png')";

	 for (var j = 0; j < gainNodesT.length  ; j++)
{
  gainNodesT[j].gain.value = 1;
}
}	 

  };


	}]);
})();