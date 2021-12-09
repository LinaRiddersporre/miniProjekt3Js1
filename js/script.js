const searchButton = document.querySelector('.search');
let sizeNavigation = document.querySelector('.sizeNavigation');
let caruselItem = document.querySelector('#carouselItem');

const chosenSizeText = document.querySelector('.chosenSize');
let chosenSize = 'm';

sizeNavigation.addEventListener('click', function(event){
    console.log(event);
    const eventTarget = event.target;
    console.log(eventTarget);
    if(eventTarget.tagName === 'BUTTON'){
        console.log(event.target.tagName);
        if(eventTarget.innerText === 'small'){
            chosenSize = 'm';
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

    anime({
        targets: '#search',
        left: '240px',
        backgroundColor: '#FFF',
        borderRadius: ['0%', '50%'],
        easing: 'easeInOutQuad',
        loop: 4
      });
      console.log(anime);
    
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
        
    console.log('caruselItem', numberOfPictures);
    
    const allImgEl = document.querySelectorAll('img');
    for(let i = 0; i<allImgEl.length; i++){
        const element = allImgEl[i];
        console.log('element', element)
        element.remove();
    }
    
    for(let i = 0; i<numberOfPictures; i++){
        
        let photo = pictureArray.photos.photo[i];
        console.log(photo);
        
        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', '#carouselItem');
        let pic = document.createElement('img');
        console.log(pic);
        caruselItem.appendChild(itemDiv);
        itemDiv.appendChild(pic);

        
        pic.src=`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${chosenSize}.jpg`;
    }
    
}


