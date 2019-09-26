var params = new URLSearchParams(window.location.search),
    contact = document.querySelectorAll('.contact'),
    trial = document.querySelectorAll('.trial'),
    type = document.querySelector('input[name=form]');

if(params.has('page') && params.get('page') === 'contact'){
    contact.forEach(function(e){
        e.style.display = "block";
    });
    trial.forEach(function(e){
        e.style.display = "none";
    });
    type.value = 'Contact';
}else{
    contact.forEach(function(e){
        e.style.display = "none";
    });
    trial.forEach(function(e){
        e.style.display = "block";
    });
    type.value = 'Trial';
}
