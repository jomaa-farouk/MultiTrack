'use strict';

(function() {
    // body...
    var app = angular.module('home.controller', []);


    app.controller('HomeController', ['$scope', '$compile', 'MixFactory', 'MixsFactory',
        'TrackFactory', 'TracksFactory', 'CommentFactory', 'CommentsFactory',
        'RatingFactory', 'RatingsFactory', 'AuthFactory',
        function($scope, $compile, MixFactory, MixsFactory, TrackFactory, TracksFactory, CommentFactory, CommentsFactory, RatingFactory, RatingsFactory, AuthFactory){


            var app = this;

            $scope.user = AuthFactory.getUser();

            $scope.disconnect = function(){
                AuthFactory.logout();
                $scope.user = AuthFactory.getUser();
            };

            $scope.isConnected = function(){
                return $scope.user.connected;
            }

            $scope.getCommentsByMixName = function(){
                $scope.commentsmix = [];
                $scope.comments.forEach(function(thisComment, idx){
                    if(thisComment.mixName === $scope.selectedMixName && thisComment.trackName == JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName){
                        $scope.commentsmix.push(thisComment);
                    }

                });

                $scope.commentsmix.sort(function(a,b){
                return new Date(b.dateOfCreation) - new Date(a.dateOfCreation);
                });

            };

            $scope.getRatingsByMixName = function(){
                $scope.ratingsmix = [];
                $scope.ratings.forEach(function(thisRating, idx){
                    if(thisRating.mixName === $scope.selectedMixName && thisRating.trackName == JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName){
                        $scope.ratingsmix.push(thisRating);
                    }
                });
                $scope.likesBar ();
                $scope.verifyLikeButtons ();
                document.getElementById('likes'+$scope.selectedMixName + JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName).innerHTML = $scope.getlikes ($scope.selectedMixName);
            };


            $scope.addRating = function(){
                RatingsFactory.create($scope.rating);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.ratings = RatingsFactory.query();
                    });
                }, 1000);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.getRatingsByMixName();
                    });
                }, 2000);
            }

            $scope.deleteRating = function(rId){
                RatingFactory.delete({id:rId});
                $scope.ratings = RatingsFactory.query();
            }

            $scope.addComment = function(mix){
                CommentsFactory.create($scope.comment);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.getAllComments();
                    });
                }, 1000);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.getCommentsByMixName();
                    });
                }, 2000);

            }

            $scope.deleteComment = function(rId){
                CommentFactory.delete({id:rId});
                $scope.ratings = RatingsFactory.query();
            }

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

            $scope.getAllComments = function(){
                CommentsFactory.query(
                    function(response){
                        $scope.message = 'Loading ...';
                        $scope.comments = response;
                    },
                    function(response){
                        $scope.message = 'Error: '+response.status+' '+response.statusText;
                    }
                );
            };


            $scope.findMixByTrackName = function(){
                $scope.trackmixs = [];
                $scope.mixs.forEach(function(mixx, i){
                    if(mixx.trackName===JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName){
                        $scope.trackmixs.push(mixx);
                    }
                });

                                $scope.trackmixs.sort(function(a,b){
                return $scope.getlikes(b.mixName) - $scope.getlikes(a.mixName);
                });

            }


            $scope.addMix = function(){
                MixsFactory.create($scope.mix);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.getAllMixs();
                    });
                }, 1000);

                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.findMixByTrackName ();
                    });
                }, 2000);

                setTimeout(function () {
                    $scope.$apply(function () {
                        activateAll();
                    });
                }, 2050);


            };

            // on recupere un mix par id
            $scope.getMix = function(){
                //var $id=5;
                $scope.mix = MixFactory.show({id:6});
                alert($scope.mix._id);


                /**
                 MixsFactory.get(mixId).$promise.then(
                 function(response){
          $scope.showMix = true;
          $scope.mix = response;
          console.log ($scope.mix);
        },
                 function(response){
          $scope.message = 'Error: '+response.status+' '+response.statusText;
        }
                 );**/
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

            $scope.addTrack = function(){
                TracksFactory.create($scope.track);
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

            $scope.params = {};

            var ctx = window.AudioContext || window.webkitAudioContext;
            var audioContext;

            var gainSlider, pannerSlider, bplay, bpause, player, compressorNode, compressorButton, bstop, list, bmute;
            var freq_input0, freq_input1, freq_input2, freq_input3, freq_input4, freq_input5, convSlider0, convSlider1, convSlider2, convSlider3;
            var bupload, bsavemix, breset;

            var bloadmix = [];
            var bmoremix = [];

            var freq_pistes_input = new Array ();
            var gain_pistes_input = new Array ();
            var stereo_pistes_input = new Array ();
            var mutePistes_input = new Array ();
            var playOnly_input = new Array ();

            var canvas, canvas2, canvasContext, canvasContext2, width, height, width2, height2, bufferLength, dataArray, bufferLength2, dataArray2;
            var analyser, analyser2, gradient, analyserLeft, analyserRight, dataArrayLeft, dataArrayRight, splitter;
            $scope.gain = [];

            var bufferSourcet = [];
            var decodedSoundt = [];
            var soundURLt = [];

            $scope.stereoNodet = [];
            $scope.gainNodesT = [];

            $scope.filters = [];
            $scope.filtersPistes = [];

            var casqueT = [];
            var stoppressed = false;

            $scope.frequencies = ['60Hz' , '170Hz' , '350Hz' , '1000Hz' , '3500Hz' , '10000Hz' ];
            $scope.impulses = ['dance hall','mythology','sports verb', 'wobble room'];

            var decodedImpulset = [];
            var convolverGaint =[];
            var directGaint  = [];
            var convolverNodet = [];

var listOfSoundSamplesURLs = [];

            $scope.trackSelected = false;
            $scope.trackmixs = [];

            $scope.gain = 1;

            $scope.impulse_value = 0;

            $scope.comment = {};
            $scope.rating = {};

// Object that draws a sample waveform in a canvas  
            var waveformDrawer = new WaveformDrawer();
            var bufferLoader;

            var curTime = 0;
            var delta = 0;
            $scope.savedVolume = 10;

                audioContext = new ctx();

                $scope.gainNode = audioContext.createGain();
                $scope.gainNode.gain.value = 1;

             $scope.beforeMuteValue;   
             $scope.beforeMuteValues = [];   

            $scope.init = function(){
                // get the AudioContext0

                $scope.pannerNode = audioContext.createStereoPanner();
                $scope.gainNode = audioContext.createGain();
                $scope.gainNode.gain.value = 1;

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
                breset = document.getElementById('reset');

                $scope.impulses.forEach (function(impulse , i) {
                    var  impulseURL = 'http://localhost:8080/impulse/' + impulse + '.mp3';
                    listOfSoundSamplesURLs.push (impulseURL);
                   // loadImpulse(impulseURL, i);
                });

                 loadAllImpulses ();

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

                if (!$scope.firstTime)
                    $scope.savedVolume = $scope.gainNode.gain.value;
                $scope.initParam ();

                $scope.trackSelected = true;
                $scope.beforeMuteValues = [];   

                curTime = 0;
                delta = 0;


                $scope.findMixByTrackName ();

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

                var content = '<div class="row"><div class="col-md-offset-2">';

                selectedTrack.piste.forEach (function(songName , i) {

                    casqueT [i] = 0;
                    soundURLt[i] =  base + songName.pisteMp3 ;

                    $scope.gainNodesT[i] = audioContext.createGain();
                    $scope.gainNodesT[i].gain.value = 1;
                    $scope.$watch('gainNodesT['+i+'].gain.value', checkMute, true);

                    content+='<div class="row" ><div class="col-md-3"><H4 class="pistetitle">'+songName.pisteMp3;
                    content+='<button class="mute" id="mute'+i+'" style="cursor: pointer;" ng-click = "mute ('+i+')">&nbsp;&nbsp;</button> ';
                    content+='<button class="muteothers" id="muteothers'+i+'" style="cursor: pointer;" ng-click = "muteothers ('+i+')"></button>'+'</H4>';
                    content+='<div class="controls1"><div class="row"> <div class="col-md-offset-1">';

                    var k = i+1;

                    $scope.frequencies.forEach (function(freq , j) {

                        var s = "";
                        s+='<label>'+freq+'</label>';
                        s+='<input  id="freq_value'+k+j+'" type="range" value="0" step="1" min="-30" max="30" ng-model="filtersPistes['+i+']['+j+'].gain.value" ng-change="changeFrequency('+k+' ,'+j+')"></input>';
                        s+='<output id="freq'+k+j+'">0 dB<br></output>';


                        content=content+s;

                    });

                    content+='</div> </div> </div> <div class="row">';
                    content+='<div class="col-md-6"><label for="gainSlider" class="label">Volume</label>';
                    content+='<input class="range" type="range" min="0" max="1" step="0.01" value="1" id="gainSlider'+i+'" ng-model="gainNodesT['+i+'].gain.value" />';
                    content+='</div><div class="col-md-6"><label for="pannerSlider" class="label">Stereo</label>';
                    content+='<input class="range" type="range" min="-1" max="1" step="0.1" value="0" id="pannerSlider'+i+'" ng-model="stereoNodet['+i+'].pan.value" />';

                    content+='</div> </div> </div> <div class="col-md-5 col-md-offset-2"> <br><br><canvas id="canvasOnde'+i+'" width=400 height=150></canvas> </div> </div> <br><br>';

                });

                content+='</div> </div>';

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

                $('#saveMixMessage').empty();
                $('#mixName').val('');
                $('#description').val('');

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
                        if (parseInt( $scope.percentage ) == 100)
                        {
                            bplay.disabled = false;
                            list.disabled = false;
                            drawTrack (decodedSoundt);

                        }
                    }, function(e) {
                        console.log("error");});
                };

                // send the request. When the file will be loaded,
                // the request.onload callback will be called (above)
                request.send();
            }


            function timer(n) {
                $("#progress-bar").css("width", n + "%");
                $("#pourcentage").text(n + "%");
            }


            $scope.changeFrequency = function(row , index){
                var output = document.getElementById("freq"+row+index);

                if (row==0)
                    output.innerHTML = '<output>'+$scope.filters[index].gain.value+' dB</output>';
                else
                    output.innerHTML = '<output>'+ $scope.filtersPistes[row-1][index].gain.value+' dB</output>';

                //$scope.filters[index].gain.value = freq_value;
                //$scope.filtersPistes[row-1][index].gain.value = freq_value;
            };

            $scope.buttonCompressor = 'Turn Compressor ON';
            $scope.compressorSelected = false;

            $scope.updateCompressor = function () {

                var compressorButton = document.getElementById("compressorButton");
                $scope.compressorSelected = !$scope.compressorSelected;

                if ( $scope.compressorSelected == false )
                {
                    $scope.buttonCompressor = 'Turn Compressor ON';
                    compressorNode.disconnect(audioContext.destination);
                    analyser2.disconnect(compressorNode);
                    analyser2.connect(audioContext.destination);
                }

                else
                { $scope.buttonCompressor = 'Turn Compressor OFF';
                    analyser2.disconnect(audioContext.destination);
                    analyser2.connect(compressorNode);
                    compressorNode.connect(audioContext.destination);
                }
            };

            var isPaused = false;

            $scope.play = function(){

                curTime = (new Date()).getTime();

                isPaused = false;

                for (var i = 0; i < soundURLt.length; i++) {

                    bufferSourcet[i] = audioContext.createBufferSource();
                    bufferSourcet[i].buffer = decodedSoundt[i];
                    bufferSourcet[i].start(audioContext.currentTime, delta);

                }

                buildAudioGraph();

                if (stoppressed)
                    $scope.activateParams ($scope.params);

                stoppressed = false;

                activateAll ();

                bplay.disabled = true;
                bpause.disabled = false;

            };


            $scope.stop = function(){
                if (!isPaused){
                    curTime = 0;
                    delta = 0;
                }
                stoppressed = true;
                $scope.saveparams ();
                stopGraph (false);
                initBuffer(false) ;
                bplay.disabled = false;
                bpause.disabled = true;
                bstop.disabled = true;
            };

            $scope.pause = function(){
                isPaused = true;
                delta = delta + (( (new Date()).getTime() - curTime) / 1000);
                console.log (delta);
                $scope.stop ();

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

                    $scope.stereoNodet = [];
                    $scope.filtersPistes = [];
                    $scope.gainNodesT = [];

                }
            }

            $scope.firstTime = true;

            function buildAudioGraph( ) {

                // create source and gain node
                //$scope.gainNode = audioContext.createGain();

                var stereoModify;

                for (var i = 0; i < bufferSourcet.length; i++) {

                    $scope.stereoNodet[i] = audioContext.createStereoPanner();
                    bufferSourcet[i].connect ( $scope.stereoNodet[i]);
                }

                // create the equalizer. It's a set of biquad Filters
                // Set filters
                $scope.filters = [];
                $scope.frequencies.forEach(function(freq, i) {
                    var eq = audioContext.createBiquadFilter();
                    eq.frequency.value = parseFloat(freq);
                    eq.type = "peaking";
                    eq.gain.value = 0;
                    $scope.filters.push(eq);
                });

                for (var j = 0; j < bufferSourcet.length; j++) {
                    $scope.filtersPistes[j] = new Array();

                    $scope.frequencies.forEach(function(freq, i) {

                        var eq = audioContext.createBiquadFilter();
                        eq.frequency.value = parseFloat(freq);
                        eq.type = "peaking";
                        eq.gain.value = 0;
                        $scope.filtersPistes[j].push(eq);

                    });
                }



                for (var j = 0; j < $scope.filtersPistes.length ; j++) {

                    for (var i = 0; i < $scope.filtersPistes[j].length - 1 ; i++) {

                        if (i == 0)
                        { $scope.stereoNodet[j].connect ($scope.filtersPistes[j][i]);
                            $scope.filtersPistes[j][i].connect($scope.filtersPistes[j][i+1]);
                        }
                        else
                        {     $scope.filtersPistes[j][i].connect($scope.filtersPistes[j][i+1]);
                        }

                    }

                    $scope.filtersPistes[j][$scope.filtersPistes[j].length - 1].connect($scope.gainNodesT[j]) ;
                    $scope.gainNodesT[j].connect($scope.gainNode) ;


                }

                // Connect filters in serie
                $scope.gainNode.connect($scope.filters[0]);
                for(var i = 0; i < $scope.filters.length - 1; i++) {
                    $scope.filters[i].connect($scope.filters[i+1]);
                }

                compressorNode = audioContext.createDynamicsCompressor();

                // connect the last filter to the speakers
                $scope.filters[$scope.filters.length - 1].connect($scope.pannerNode);

                if ($scope.firstTime)
                {
                    $scope.firstTime = false;

                    for (var i=0 ; i<convolverNodet.length ; i++)
                    {

                        // direct/dry route source -> directGain -> destination
                        $scope.pannerNode.connect(directGaint[i]);
                        directGaint[i].connect(analyser);


                        // wet route with convolver: source -> convolver
                        // -> convolverGain -> destination
                        $scope.pannerNode.connect(convolverNodet[i]);
                        convolverNodet[i].connect(convolverGaint[i]);
                        convolverGaint[i].connect(analyser);

                        // connect the source to the analyser and the splitter
                        $scope.pannerNode.connect(splitter);



                    }

                    //$scope.pannerNode.connect(analyser);
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

                if   ( $scope.gainNode.gain.value != 0 )
                {
                    $scope.beforeMuteValue = gainSlider.value;
                    $scope.gainNode.gain.value = 0;
                    button.style.backgroundImage="url('./lib/image/sound.png')";
                    console.log (button.style.backgroundImage);
                }

                else if (($scope.gainNode.gain.value == 0) &&  (button.style.backgroundImage=='url("./lib/image/sound.png")'))
                {
                    $scope.gainNode.gain.value = $scope.beforeMuteValue;
                    button.style.backgroundImage="url('./lib/image/mute.png')";
                }

            };

    function checkMute(){
    var button = document.getElementById("mute");
    if ( $scope.gainNode.gain.value != 0 ) 
    button.style.backgroundImage="url('./lib/image/mute.png')";

    for (var i=0 ; i<$scope.gainNodesT.length ; i++)
    {
    if ( $scope.gainNodesT[i].gain.value != 0 ) {
    var b = document.getElementById("mute"+i);
    b.style.backgroundImage="url('./lib/image/mute.png')";
    }
    }
    };

    $scope.$watch('gainNode.gain.value', checkMute, true);

            $scope.mute = function (i) {

                var button = document.getElementById('mute'+i);
                var gainSlideri = document.getElementById('gainSlider'+i);
                if   ( $scope.gainNodesT[i].gain.value != 0 )
                {
                    $scope.beforeMuteValues [i] = gainSlideri.value;
                    $scope.gainNodesT[i].gain.value = 0;
                    button.style.backgroundImage="url('./lib/image/sound.png')";
                }

                else if ($scope.gainNodesT[i].gain.value == 0 && button.style.backgroundImage=='url("./lib/image/sound.png")')
                {
                    $scope.gainNodesT[i].gain.value = $scope.beforeMuteValues [i];
                    button.style.backgroundImage="url('./lib/image/mute.png')";
                }
            };

            $scope.muteothers = function (i) {

                casqueT [i] += 1;
                var button = document.getElementById('muteothers'+i);

                if (casqueT[i] % 2 != 0)
                {

                    button.style.backgroundImage="url('./lib/image/headn.png')";

                    for (var j = 0; j < $scope.gainNodesT.length  ; j++)
                    {
                        if (j != i)
                        {
                            $scope.gainNodesT[j].gain.value = 0;
                            button = document.getElementById('muteothers'+j);
                            button.style.backgroundImage="url('./lib/image/head.png')";
                            if (casqueT[j] % 2 != 0) casqueT [j] += 1;
                        }
                        else
                            $scope.gainNodesT[j].gain.value = 1;
                    }}

                else
                {
                    button.style.backgroundImage="url('./lib/image/head.png')";
                    for (var j = 0; j < $scope.gainNodesT.length  ; j++)
                    {
                        $scope.gainNodesT[j].gain.value = 1;
                    }}

            };


          /*  function loadImpulse(url, i ) {
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
*/
function loadAllImpulses() {
  // onSamplesDecoded will be called when all samples 
  // have been loaded and decoded, and the decoded sample will
  // be its only parameter (see function above)
    bufferLoader = new BufferLoader(
            audioContext,      
            listOfSoundSamplesURLs,   
            onSamplesDecoded          
            );
  
  // start loading and decoding the files
    bufferLoader.load();              
}

function onSamplesDecoded(buffers){
  console.log("all samples loaded and decoded");
  

for (var i=0 ; i<buffers.length ; i++)
{
decodedImpulset[i] = buffers[i];  
buildImpulseNode (i);
}
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
                if (bloadmix!=null && bmoremix!=null) {
                    bloadmix.disabled = true;
                    bmoremix.disabled = true;
                }
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

                breset.disabled = true;
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
                if (bloadmix!=null && bmoremix!=null) {
                    bloadmix.disabled = false;
                    bmoremix.disabled = false;
                }

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
                breset.disabled = false;

                for (var i = 0; i < $scope.trackmixs.length; i++) {
                    document.getElementById('more'+i).disabled = false;
                    document.getElementById('load'+i).disabled = false;
                }

                console.log ("me");
            }


            function verifyMixExist (mix) {
                var exist = false;
                var i = 0;

                while (i<$scope.mixs.length && exist==false) {
                    if($scope.mixs[i].trackName===mix.trackName && $scope.mixs[i].mixName===mix.mixName)
                        exist = true;
                    i++;
                }

                return exist;
            }

            $scope.saveparams = function () {

                $scope.params.gain = [];
                $scope.params.frequencies = [];
                $scope.params.balance = [];
                $scope.params.impulses = [];

                for (var i=0 ; i<=soundURLt.length ; i++) {

                    var obj = {"frequency" : []};
                    var array = new Array();

                    if (i==0)
                    {
                        $scope.params.gain.push ($scope.gainNode.gain.value);
                        $scope.params.balance.push ($scope.pannerNode.pan.value);

                        $scope.frequencies.forEach (function (freq, j) {
                            array.push($scope.filters[j].gain.value);
                        });

                        obj.frequency = array;
                        $scope.params.frequencies.push (obj);
                    }

                    else
                    {
                        $scope.params.gain.push ($scope.gainNodesT[i-1].gain.value);
                        $scope.params.balance.push ($scope.stereoNodet[i-1].pan.value);

                        $scope.frequencies.forEach (function (freq, j) {
                            array.push($scope.filtersPistes[i-1][j].gain.value);
                        });

                        obj.frequency = array;
                        $scope.params.frequencies.push (obj);

                    }
                }

                if ($scope.compressorSelected == false)
                    $scope.params.compressor = "ON";
                else
                    $scope.params.compressor = "OFF";

                console.log ($scope.params.compressor);

                $scope.impulses.forEach (function (impulse, i) {
                    $scope.params.impulses.push (convolverGaint[i].gain.value);
                });

            }

            $scope.saveNewMix = function(){

                $('#saveMixMessage').empty();


                var input = document.getElementById('mixName');
                var validityState_object = input.validity;

                var input2 = document.getElementById('description');
                var validityState_object2 = input2.validity;

                if(validityState_object.valueMissing)
                    input.setCustomValidity('Please set a mix name (required)');
                else
                    input.setCustomValidity('');

                if(validityState_object2.valueMissing)
                    input2.setCustomValidity('Please set a mix description (required)');
                else
                    input2.setCustomValidity('');

                if (! (validityState_object.valueMissing || validityState_object2.valueMissing) ) {

                    {

                        $scope.mix.trackName = JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName;
                        $scope.mix.gain = [];
                        $scope.mix.frequencies = [];
                        $scope.mix.balance = [];
                        $scope.mix.impulses = [];

                        for (var i=0 ; i<=soundURLt.length ; i++) {

                            var obj = {"frequency" : []};
                            var array = new Array();

                            if (i==0)
                            {
                                $scope.mix.gain.push ($scope.gainNode.gain.value);
                                $scope.mix.balance.push ($scope.pannerNode.pan.value);

                                $scope.frequencies.forEach (function (freq, j) {
                                    array.push($scope.filters[j].gain.value);
                                });

                                obj.frequency = array;
                                $scope.mix.frequencies.push (obj);
                            }

                            else
                            {
                                $scope.mix.gain.push ($scope.gainNodesT[i-1].gain.value);
                                $scope.mix.balance.push ($scope.stereoNodet[i-1].pan.value);

                                $scope.frequencies.forEach (function (freq, j) {
                                    array.push($scope.filtersPistes[i-1][j].gain.value);
                                });

                                obj.frequency = array;
                                $scope.mix.frequencies.push (obj);

                            }
                        }

                        if ($scope.compressorSelected == false)
                            $scope.mix.compressor = "OFF";
                        else
                            $scope.mix.compressor = "ON";

                        $scope.impulses.forEach (function (impulse, i) {
                            $scope.mix.impulses.push (convolverGaint[i].gain.value);
                        });

                        $scope.mix.username = $scope.user.username;

                        var divMessage = document.getElementById ("saveMixMessage");

                        if (verifyMixExist ($scope.mix)) {
                            divMessage.style.color = "red";
                            divMessage.innerHTML = "<h4>Choose a different mix name<h4>";
                        }
                        else {
                            $scope.addMix();;
                            divMessage.style.color = "green";
                            divMessage.innerHTML = "<h4>Mix saved successfully</h4>";
                            $('#mixName').val('');
                            $('#description').val('');

                        }
                    }
                } };


            function drawTrack(decodedBuffer)  {

                decodedBuffer.forEach (function(gain , i) {

                    var canvas = document.getElementById ('canvasOnde'+i);
                    waveformDrawer.init(decodedBuffer[i], canvas, 'green');
                    // First parameter = Y position (top left corner)
                    // second = height of the sample drawing
                    waveformDrawer.drawWave(0, canvas.height);
                })
            }
            $scope.comments = CommentsFactory.query();
            $scope.ratings = RatingsFactory.query();


            $scope.loadMix = function(mix){

                $scope.gainNode.gain.value = mix.gain[0];
                $scope.pannerNode.pan.value = mix.balance[0];

                $scope.filters.forEach (function (freq, i) {
                    freq.gain.value = mix.frequencies[0].frequency[i];
                    $scope.changeFrequency (0, i);
                });

                $scope.filtersPistes.forEach (function (freq, i) {
                    freq.forEach (function (frequ, j) {
                        frequ.gain.value = mix.frequencies[i+1].frequency[j];
                        $scope.changeFrequency (i+1, j);
                    });
                });

                $scope.gainNodesT.forEach (function (gain, i) {
                    gain.gain.value = mix.gain[i+1];
                });

                $scope.stereoNodet.forEach (function (pan, i) {
                    pan.pan.value = mix.balance[i+1];
                });

                $scope.impulses.forEach (function (imp, i) {
                    var impulse = document.getElementById ('convolverSlider' + i);
                    impulse.value = mix.impulses[i];
                    convolverGaint[i].gain.value = impulse.value;
                    directGaint[i].gain.value = 1 - convolverGaint[i].gain.value;
                });

                if ( (mix.compressor == 'ON' && $scope.compressorSelected == true) || (mix.compressor == 'OFF' && $scope.compressorSelected == false) )
                    $scope.updateCompressor();


            };

            $scope.activateParams = function (mix) {

                $scope.gainNode.gain.value = mix.gain[0];
                $scope.pannerNode.pan.value = mix.balance[0];

                $scope.filters.forEach (function (freq, i) {
                    freq.gain.value = mix.frequencies[0].frequency[i];
                    $scope.changeFrequency (0, i);
                });

                $scope.filtersPistes.forEach (function (freq, i) {
                    freq.forEach (function (frequ, j) {
                        frequ.gain.value = mix.frequencies[i+1].frequency[j];
                        $scope.changeFrequency (i+1, j);
                    });
                });

                $scope.gainNodesT.forEach (function (gain, i) {
                    gain.gain.value = mix.gain[i+1];
                });

                $scope.stereoNodet.forEach (function (pan, i) {
                    pan.pan.value = mix.balance[i+1];
                });

                $scope.impulses.forEach (function (imp, i) {
                    var impulse = document.getElementById ('convolverSlider' + i);
                    impulse.value = mix.impulses[i];
                    convolverGaint[i].gain.value = impulse.value;
                    directGaint[i].gain.value = 1 - convolverGaint[i].gain.value;
                });

//if ( (mix.compressor == 'ON' && $scope.compressorSelected == true) || (mix.compressor == 'OFF' && $scope.compressorSelected == false) )
//  $scope.updateCompressor();

            };


            $scope.resetParam = function () {

                $scope.gainNode.gain.value = 1;
                $scope.pannerNode.pan.value = 0;

                $scope.filters.forEach (function (freq, i) {
                    freq.gain.value = 0;
                    $scope.changeFrequency (0, i);
                });

                $scope.filtersPistes.forEach (function (freq, i) {
                    freq.forEach (function (frequ, j) {
                        frequ.gain.value = 0;
                        $scope.changeFrequency (i+1, j);
                    });
                });

                $scope.gainNodesT.forEach (function (gain, i) {
                    gain.gain.value = 1;
                });

                $scope.stereoNodet.forEach (function (pan, i) {
                    pan.pan.value = 0;
                });

                $scope.impulses.forEach (function (imp, i) {
                    var impulse = document.getElementById ('convolverSlider' + i);
                    impulse.value = 0;
                    convolverGaint[i].gain.value = 0;
                    directGaint[i].gain.value = 1;
                });


                if ( $scope.compressorSelected == true )
                    $scope.updateCompressor();

            };


            $scope.initParam = function () {

                if ($scope.savedVolume != 10)
                    $scope.gainNode.gain.value = $scope.savedVolume;
                else $scope.gainNode.gain.value = 1;

                $scope.pannerNode.pan.value = 0;

                $scope.filters.forEach (function (freq, i) {
                    freq.gain.value = 0;
                    $scope.changeFrequency (0, i);
                });


                $scope.impulses.forEach (function (imp, i) {
                    var impulse = document.getElementById ('convolverSlider' + i);
                    impulse.value = 0;
                    convolverGaint[i].gain.value = 0;
                    directGaint[i].gain.value = 1;
                });


                if ( $scope.compressorSelected == true )
                    $scope.updateCompressor();

            };


            $scope.loadComments = function (mix){
                $scope.selectedMixName = mix;
                $scope.getCommentsByMixName();
                $('#comment').val('');
                $scope.getRatingsByMixName();
            };

$scope.verifyLikeButtons = function () {

var like = false;
var dislike = false;
var i = 0;

while (!like && i<$scope.ratingsmix.length)
{
if (($scope.ratingsmix[i].username == $scope.user.username) && ($scope.ratingsmix[i].mark == '+'))
like = true;
i++;
}

if (like) document.getElementById ("like").disabled = true;
else document.getElementById ("like").disabled = false;

i=0;
while (!dislike && i<$scope.ratingsmix.length)
{
if (($scope.ratingsmix[i].username == $scope.user.username) && ($scope.ratingsmix[i].mark == '-'))
dislike = true;
i++;
}

if (dislike) document.getElementById ("dislike").disabled = true;
else document.getElementById ("dislike").disabled = false;

};

            $scope.saveComment = function (){

                var input = document.getElementById('comment');
                var validityState_object = input.validity;

                if(validityState_object.valueMissing)
                    input.setCustomValidity('You cannot add an empty comment');
                else
                    input.setCustomValidity('');

                if (! (validityState_object.valueMissing ) ) {
                    $('#comment').val('');
                    $scope.comment.mixName = $scope.selectedMixName;
                    $scope.comment.trackName = JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName;
                    $scope.comment.username = $scope.user.username;
                    $scope.addComment();
                }

            };


            $scope.addLike = function (){

                $scope.rating.mixName = $scope.selectedMixName;
                $scope.rating.mark = "+";
                $scope.rating.username = $scope.user.username;
                $scope.rating.trackName = JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName;;

                $scope.addRating();
            };


            $scope.addDislike = function (){

                $scope.rating.mixName = $scope.selectedMixName;
                $scope.rating.mark = "-";
                $scope.rating.username = $scope.user.username;
                $scope.rating.trackName = JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName;;

                $scope.addRating();

            };

            $scope.likesBar = function (){

                var plus=0;
                var moins=0;
                $scope.ratingsmix.forEach (function (rating, i){
                    if (rating.mark == "+")
                        plus += 1;
                    else if (rating.mark == "-")
                        moins += 1;
                });

                var n = (plus / $scope.ratingsmix.length) * 100;

                $("#likesBar").css("width", n + "%");


                var splike = document.getElementById ("splike");
                var spdislike = document.getElementById ("spdislike");

                splike.innerHTML = plus;
                spdislike.innerHTML = moins;

            };

$scope.getlikes = function (mixName) 
{
  var nb_likes = 0;
$scope.ratings.forEach (function (rating, i){
if (rating.mixName == mixName && rating.trackName == JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName && rating.mark == '+' )
nb_likes ++ ;
});

return nb_likes;
};

/*$scope.getdislikes = function (mixName) 
{
  var nb_dislikes = 0;
$scope.ratings.forEach (function (rating, i){
if (rating.mixName == mixName && rating.trackName == JSON.parse("[" + $scope.selectedTrack + "]")[0].trackName && rating.mark == '-' )
nb_dislikes ++ ;
});

return nb_dislikes;
};
*/
/* ############################
    BUFFER LOADER for loading multiple files asyncrhonously. The callback functions is called when all
    files have been loaded and decoded 
 ############################## */
function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.callback = callback;
    this.bufferList = [];
    this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    console.log('file : ' + url + "loading and decoding");

    var request = new XMLHttpRequest();
    request.open("GET", url, true);

    request.responseType = "arraybuffer";

    var loader = this;

    request.onload = function() {

        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
                request.response,
                function(buffer) {
                        console.log("Loaded and decoded track " + (loader.loadCount+1) + 
                        "/" +  loader.urlList.length + "...");

                    if (!buffer) {
                        alert('error decoding file data: ' + url);
                        return;
                    }
                    loader.bufferList[index] = buffer;

                    //console.log("In bufferLoader.onload bufferList size is " + loader.bufferList.length + " index =" + index);
                    if (++loader.loadCount == loader.urlList.length)
                       // call the callback and pass it the decoded buffers, we've finihed
                      loader.callback(loader.bufferList);
                },
                function(error) {
                    console.error('decodeAudioData error', error);
                }
        );
    };

    request.onprogress = function(e) {
         if(e.total !== 0) {
            var percent = (e.loaded * 100) / e.total;

            console.log("loaded " + percent  + " % of file " + index);
         }
    };
    
    request.onerror = function() {
        alert('BufferLoader: XHR error');
    };

    request.send();
};

BufferLoader.prototype.load = function() {
    console.log("Loading " + this.urlList.length + "track(s)... please wait...");
    for (var i = 0; i < this.urlList.length; ++i)
        this.loadBuffer(this.urlList[i], i);
};



        }]);
})();