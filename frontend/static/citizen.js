function dismiss(id) {
  var post = document.getElementById("post"+id);
  post.parentNode.removeChild(post);
  //TODO notify server, so it won't be displayed on future page loads
}

function voteon(id, username) {
  var req;
  var form = document.getElementById("wtr"+id);
  try{
    req = new XMLHttpRequest();
    } catch(e) {
    try{
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try{
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        alert("Browser doesn't appear to support AJAX");
      }
    }
  }
  req.open("PUT","/users/"+username+"/vote/"+form.id,true)
  req.send(null);

  req.onreadystatechange = function(element) { 
    form.getElementsByTagName('div')[0].innerHMTL = "<em>"+req.readyState+"</em>";

    if(req.readyState==4) {
      if(req.status == 200 && req.responseText != null) {
        form.innerHTML = req.responseText;
      } else { //the 'div' thing is a hack
        form.getElementsByTagName('div')[0].innerHMTL = "<br /> <em>Failed to contact server</em>";
      }
    } else {
      document.getElementById('status'+id).innerHTML = "<em>Waiting for the server...</em>";
    }
  }
}