const axios = require('axios').default;
let buttonBuy = document.querySelectorAll('.picture__price__right a');

/*Adding the id to buttons*/
buttonBuy.forEach((item, index) => {
  item.setAttribute('data-item', index);
});

/*Compares the data-attribute with cookie*/
buttonBuy.forEach((item) => {
  let attribute = item.getAttribute('data-item');
  if(getCookie('item'+attribute)) {
    item.classList.add('button_basket');
    item.innerHTML = '<span class="button__basket__label">В корзине</span>';
  } else {
    item.classList.remove('button_basket');
    item.innerHTML = 'Купить';
  }
});

/*Checking if the picture is sold*/
let pictures = document.querySelectorAll('.picture');
pictures.forEach((item) => {
  if(item.getAttribute('data-mode') == 'sold') {
    item.classList.add('picture_sold');
    let priceBlock = item.querySelector('.picture__price');
    priceBlock.innerHTML = '<h2>Продана на аукционе</h2>';
  }
});

/*Main functions*/
document.addEventListener('DOMContentLoaded', function() {
  buttonBuy.forEach((item) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      let currentButton = this;
      item.innerHTML = '<img src=\'img/spinner.gif\' alt=\'\'/>';
      axiosQuery('https://reqres.in/api/products/3', currentButton);
    });
  });

  function axiosQuery(url, button) {
    let currentButton = button;
    axios.get(url)
      .then(function (response) {
        // handle success
        console.dir(response);
        currentButton.classList.add('button_basket');
        currentButton.innerHTML = '<span class="button__basket__label">В корзине</span>';
        let dataIndex = currentButton.getAttribute('data-item');
        setCookie('item' + dataIndex, dataIndex);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }
});

/*Sets cookie*/
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = 'expires='+ d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/*gets the cookie*/

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}