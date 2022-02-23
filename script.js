//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");


button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  showFile(); //calling function
});

function showFile(){
  let intestazione=[];
  let stampa="[";
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
      if (typeof (FileReader) != "undefined") {
          var reader = new FileReader();
          reader.onload = function (e) {
              var rows = e.target.result.split("\n");
              for (var i = 0; i < rows.length; i++) {
                  var cells = rows[i].split(",");
                  if (cells.length > 1) {
                      if(i!=0)
                        stampa= stampa+'{';
                      for (var j = 0; j < cells.length; j++) {
                        if(i==0)
                        {
                          intestazione[j]=cells[j];
                        }
                        else
                        {
                            if(j==cells.length-1)
                              stampa=stampa+'"'+intestazione[j]+'":"'+cells[j]+'"';
                            else
                            stampa=stampa+'"'+intestazione[j]+'":"'+cells[j]+'",';
                        }
                      }
                      if(i!=0)
                      {
                        if(i==rows.length-1)
                        stampa=stampa+'}';
                        else 
                          stampa=stampa+'},';
                      }

                  }
              }
              stampa=stampa+']';
              console.log(stampa);
          }
          reader.readAsText(fileUpload.files[0]);
      } else {
          alert("This browser does not support HTML5.");
      }
  } else {
      alert("Please upload a valid CSV file.");
  }
}
