var siteName = document.getElementById('siteName') ;
var websiteUrl = document.getElementById('websiteUrl') ;
var tbody = document.getElementById('tbody');
var urlRegex = /^(https):\/\/[a-zA-Z0-9]{3,}\.com$/ ;
var nameRegex = /^\w{3,}$/i ;
var submitbtn = document.querySelector(' .submit');
 

 if(localStorage.getItem('websiteData') !== null) {
    var allWebsites = JSON.parse(localStorage.getItem('websiteData'))
    displayTable();
 } else {
    var allWebsites = [] ;
 }



function createWebsite() {
     

    if(siteName.value != "" && websiteUrl != "" && 
    siteName.classList.contains('is-valid') &&
    websiteUrl.classList.contains('is-valid')

    )  {
        var Website = {
            websiteName : siteName.value ,
            websiteurl : websiteUrl.value
    
        }
        allWebsites.push(Website)
        localStorage.setItem('websiteData' , JSON.stringify(allWebsites))
        retriveWebsite()
         submitbtn.removeAttribute("data-bs-toggle" ,"modal");
        submitbtn.removeAttribute("data-bs-target" ,"#exampleModal");
  
    }
    else {
        submitbtn.setAttribute("data-bs-toggle" ,"modal");
        submitbtn.setAttribute("data-bs-target" ,"#exampleModal");
    }
   
   
}
submitbtn.addEventListener("click" ,createWebsite)




var trs = '';
function retriveWebsite(){  
var lastIndex = allWebsites.length -1;
       trs = `  <tr>
                    <td>${lastIndex}</td>
                    <td>${allWebsites[lastIndex].websiteName}</td>
                  
                    <td> <button class="btn  button ">
                    <a href= "${allWebsites[lastIndex].websiteurl}" target = "_blank">
                    <i class="fa-solid fa-eye "></i> Visit
                    </a>
                    </button>
                    </td>
 
                    <td> <button onclick ='deleteWebsite(${lastIndex})'  class="btn btn-danger">
                    <i class="fa-solid fa-trash"></i> Delete
                    </button>
                </td>
     </tr>
`
   tbody.innerHTML += trs
} 


function displayTable() {
    var trs = ''
    for(var i = 1; i< allWebsites.length ; i++) {
        trs += `  <tr>
        <td>${i}</td>
        <td>${allWebsites[i].websiteName}</td>
      
        <td> <button class="btn   button">
        <a href= "${allWebsites[i].websiteurl}" target = "_blank">
        <i class="fa-solid fa-eye"></i> Visit
        </a>
        </button>
        </td>

        <td><button onclick ='deleteWebsite(${i})'    class="btn btn-danger">
        <i class="fa-solid fa-trash"></i> Delete
        </button>
    </td>
</tr>
`
    }
  tbody.innerHTML = trs;
}

function deleteWebsite(index) {
    allWebsites.splice(index , 1)   
    displayTable() ; 
    localStorage.setItem('websiteData' , JSON.stringify(allWebsites)) // set new products in localstorage

}

function clearAll() {
  siteName.value = '' ,
  websiteUrl.value = '' ,
  siteName.classList.remove('is-valid');
  websiteUrl.classList.remove('is-valid');
  siteName.classList.remove('is-invalid');
  websiteUrl.classList.remove('is-invalid');
}

siteName.addEventListener("input", function() {
    validate(siteName ,nameRegex)
})

websiteUrl.addEventListener('input', function() {
    validate(websiteUrl , urlRegex)
})
 

function validate(element , regex) {
    var  testregex = regex;
    if(testregex.test(element.value) ){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        submitbtn.removeAttribute("data-bs-toggle" ,"modal");
        submitbtn.removeAttribute("data-bs-target" ,"#exampleModal");
        return true
        
    }
 
    else {
        element.classList.remove('is-valid');
        element.classList.add('is-invalid');
         submitbtn.setAttribute("data-bs-toggle" ,"modal");
         submitbtn.setAttribute("data-bs-target" ,"#exampleModal");
         return false
    }
    }




