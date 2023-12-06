$(document).ready(function() {
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/quotes',
      type: 'GET',
      beforeSend: function() {
        // Add loader element inside the carousel
        $("#carouselExampleControls").prepend('<div class="loader"></div>');
      },
      success: function(response) {
        // Remove the loader
        $('.loader').remove();
  
        // Loop through the response and create carousel items
        response.forEach(function(quote, index) {
          var activeClass = index === 0 ? 'active' : '';
          var carouselItem = `
            <div class="carousel-item ${activeClass}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${quote.pic_url}" class="d-block align-self-center" alt="${quote.name}">
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">« ${quote.text} »</p>
                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                    <span class="text-white">${quote.title}</span>
                  </div>
                </div>
              </div>
            </div>`;
            $('#carouselExampleControls .carousel-inner').append(carouselItem);
        });
  
        // Reinitialize the carousel
        $('.carousel').carousel();
      }
    });
  });
  
  