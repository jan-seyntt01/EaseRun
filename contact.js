const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event){
    event.preventDefault();

    const fName = document.getElementById('firstName').value;
    const lName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    if(fName && lName && email && subject && message){
        alert(`Thank you, ${fName}! Your message has been sent.`);
    }
    else{
        alert('Please fill out all the fields.')
    }
});