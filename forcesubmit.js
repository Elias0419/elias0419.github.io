let aInsert = document.getElementsByClassName('detail-bar-value')
let newDiv = document.createElement('button');
newDiv.innerHTML = '<span class="detail-bar-value"><button style="background: #0084ff; border: none; border-radius: 5px; padding: 8px 14px; font-size: 15px; color: #fff;"  id="button">Click</button>  </span>';
document.body.insertBefore(newDiv, aInsert.nextSibling)
document.getElementById("button").addEventListener("click", forceSubmit);
function forceSubmit() {
  var form = document.getElementsByTagName("form")[0];
  const response = confirm("Are you sure you want to attempt to submit a broken task?");
  if (response) {
    console.log(form.id);
    document.getElementById(form.id).submit();
  } else {
    alert("Cancel was pressed");
    //return;
  }
}
