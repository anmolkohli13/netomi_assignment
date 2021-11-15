let dropdown = document.getElementById('country');
dropdown.length = 0;
let dropdown2 = document.getElementById('state');
dropdown2.length = 0;

let defaultOption1 = document.createElement('option');
defaultOption1.text = 'Choose Country';
let defaultOption2 = document.createElement('option');
defaultOption2.text = 'Choose State/Province';

dropdown.add(defaultOption1);
dropdown.selectedIndex = 0;
dropdown2.add(defaultOption2);
dropdown2.selectedIndex = 0;

const url = 'https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json';



fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }


      response.json().then(data => {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].name;
      	  option.value = data[i].name;
      	  dropdown.add(option);
    	}    

      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });

  function populate() {
    var selection = document.getElementById('country');
    // console.log(selection);
    var countrysel = selection.options[selection.selectedIndex].value;
    // console.log(countrysel);
    fetch(url)
  .then(
    response=> {
        if (response.status !== 200) {  
            console.warn('Looks like there was a problem. Status Code: ' + 
              response.status);  
            return;  
        }
        response.json().then(data => {
            let option;

            for(let i = 0; i < data.length; i++)
            {
                if(countrysel == data[i].name)
                {
                    // console.log(countrysel);
                    // console.log(data[i].states);
                    var obj = data[i].states;
                    // console.log(obj);
                    for(var j in obj)
                    {
                        option = document.createElement('option');
                        option.text = obj[j].name;
                        option.value = j=obj[j].name;
                        dropdown2.add(option);
                    }
                    // console.log(dropdown2);
                }
            }
        })
    }
  ).catch(function (err) {
      console.error('Fetch Error -', err);
  });
  }
  

const fname = document.getElementById('name');
const email = document.getElementById('email');
const cno = document.getElementById('cno');
const form = document.getElementById('myform');
const countryValue = document.getElementById('country');
const stateValue = document.getElementById('state');
const errorElement = document.getElementById('res');


myform.addEventListener('submit', (e) => {
    let messages = [];
    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(fname.value === '' || fname.value == null){
        messages.push("Name is a required field");
    }
    else if(fname.value.length < 4 || fname.value.length > 10)
    {
        messages.push("name Length should be between 4-10 characters");
    }
    if(!email.value.match(emailregex))
    {
        messages.push("Enter a valid email address");
    }
    if(!cno.value.match(/^\d{10}$/) )
    {
        messages.push("enter a valid phone number");
    }
    if(countryValue.value == "Choose Country")
    {
        messages.push("Please select a country");
    }
    if(stateValue.value ==  "Choose State/Province")
    {
        messages.push("Please select a state");
    }
    if(messages.length == 0)
    {
        messages.push("Success All fields are valid");
    }

    if(messages.length > 0 ){
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }
    

})



// request.send()