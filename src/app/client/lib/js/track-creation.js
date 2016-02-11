    var fileDrop = document.querySelector('ol#droppedFiles');
    var fileDrag = document.querySelector('#filedrag');
    var memFiles = new Array();
    var files = [];
      
    //on glisse sur la zone à déposer
      function dragOverHandler(event) {
      //alert("Drag over a droppable zone");
    event.stopPropagation();
    event.preventDefault();
    }

    //on lache le fichier que l'on glissait
    function dragLeaveHandler(event) {
      //alert("drag leave");
    event.target.classList.remove('draggedOver');
      }
    
      //On depose le fichier dans la zone correspondante
      function dropHandler(event) {
      //alert('drop event');
    event.stopPropagation();
    event.preventDefault();
    event.target.classList.remove('draggedOver');
    files = event.dataTransfer.files;
    var filesLen = files.length;
    var filenames = "";
    //alert(filesLen);
    for(var i = 0 ; i < filesLen ; i++) {
        filenames += '\n' + files[i].name;
      var li = document.createElement('li');
      li.textContent = files[i].name + " ";
      var progressBar = document.createElement('progress');
      progressBar.id = "progressBar"+i;
      progressBar.value = 0;
      progressBar.max = 100;
      li.appendChild(progressBar);
      document.querySelector("#droppedFiles").appendChild(li);
      memFiles.push(files[i]);
    }
  }


function verifySubmit () {

                var input1 = document.getElementById('title');
                var validityState_object = input1.validity;
               
                var input2 = document.getElementById('group');
                var validityState_object2 = input2.validity;
                
                if (files.length == 0) 
                 {
                  $('#sp_upload').html('You must drop at least one file');
                }
                else {
                  $('#sp_upload').html('');
                }
  
  if (!validityState_object.valueMissing && !validityState_object2.valueMissing && !(files.length == 0) )   
  saveForm ();           
  
  return false;    
  
  }

    function saveForm() {

      var pistes = [];
      var s = "";
      for(var i=0; i < files.length; i++)
       { 
        pistes.push (
         {'pisteMp3' : files[i].name}
          );
      }
       
var pistesJson = JSON.stringify(pistes) ;

var data = $('#myForm').serializeArray();

data.push({name: 'piste', value: pistesJson});

     $.ajax({
                url:'/tracks',
                type:'post',
                data:data,
                success:function(response, status, xhr){
                    if (response.error==null) 
                    sendFiles (true);    
                    else 
                    sendFiles (false);    

                },
                error:function ( ){
                  alert ('Track upload fail');
                }
            }); 
  }
    
    function sendFiles (success) {
   
   if (success) {
    var xhr2 = new XMLHttpRequest();
    var folder = document.getElementById('title').value;
    xhr2.open('GET', '/api/folder/'+folder);
    xhr2.send();

   
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/file');
        var form = new FormData();
        for(var i=0; i < files.length; i++)
       { 
        form.append('file',files[i]);
        console.log (files.length);
       }
        xhr.send(form);

  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
    alert("Track uploaded successfully");
    window.location.replace("/");
    }
}}

   else
      { alert("Track title exists already");
        $('#droppedFiles').html ('');
        files = []; 
      }
     
     }
  