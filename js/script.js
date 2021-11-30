const searchButton = document.querySelector('.search');
let sizeNavigation = document.querySelector('.sizeNavigation');
let divPicture = document.querySelector('.picture');
const chosenSizeText = document.querySelector('.chosenSize')
let chosenSize = 'm';

sizeNavigation.addEventListener('click', function(event){
    console.log(event);
    const eventTarget = event.target;
    console.log(eventTarget);
    if(eventTarget.tagName === 'BUTTON'){
        console.log(event.target.tagName);
        if(eventTarget.innerText === 'small'){
            chosenSize = 'm';
            divPicture.style.maxWidth = '950px';
            chosenSizeText.innerText = 'Small';
        }
        else if(eventTarget.innerText === 'medium'){
            chosenSize = 'z';
            chosenSizeText.innerText = 'Medium';
        }
        else if(eventTarget.innerText === 'large'){
            chosenSize = 'b';
            chosenSizeText.innerText = 'Large';
        }
    }
})

searchButton.addEventListener('click', function(){
    const textInput = document.querySelector('input');
    const numberOfPicturesInput = document.querySelector('.numberOfPictures');
    searchPicture(textInput.value, numberOfPicturesInput.value, chosenSize);
});

function searchPicture(pictureWord, numberOfPictures){
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=584c5aa84ce28241f9ddb9e73fa780f1&text=${pictureWord}&format=json&nojsoncallback=1`;
    
    fetch(url).then(
        function(response){
            console.log(`Response: `, response);
            return response.json();
        }
    ).then(
        function(data){
            console.log(`Data: `, data);
            displayPictures(data, numberOfPictures);

        }
    ).catch(
        function(error){
            console.log(error);
            alert('Något gick fel, testa igen') 
        }
    )
}

function displayPictures(pictureArray, numberOfPictures){
        
    console.log('picture', numberOfPictures);
    
    const allImgEl = document.querySelectorAll('img');
    for(let i = 0; i<allImgEl.length; i++){
        const element = allImgEl[i];
        element.remove();
    }
    
    for(let i = 0; i<numberOfPictures; i++){
        let photo = pictureArray.photos.photo[i];
        let pic = document.createElement('img');
        divPicture.appendChild(pic);
        pic.src=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${chosenSize}.jpg`;
    }
    
}



