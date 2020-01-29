const axios = require('axios').default;
let buttonBuy = document.querySelectorAll('.picture__price__right a');

document.addEventListener('DOMContentLoaded', function() {
  buttonBuy.forEach((item) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      item.innerHTML = '<img src=\'img/spinner.gif\' alt=\'\'/>';
      axiosQuery('https://reqres.in/api/products/3');
    });
  });

  function axiosQuery(url) {
    axios.get(url)
      .then(function (response) {
        // handle success
        console.log(response);
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



