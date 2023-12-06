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

    // AJAX call for popular tutorials
$.ajax({
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    type: 'GET',
    beforeSend: function() {
      $("#carouselExampleControls2 .carousel-inner").html('<div class="loader"></div>');
    },
    success: function(response) {
      $("#carouselExampleControls2 .loader").remove();
      response.forEach(function(tutorial, index) {
        var activeClass = index === 0 ? 'active' : '';


        
        var cardHtml = `
          <div class="col-md-3">
            <div class="card mx-2">
              <img src="${tutorial.thumb_url}" class="card-img-top" alt="${tutorial.title}">
              <div class="card-body">
                <h5 class="card-title">${tutorial.title}</h5>
                <p class="card-text">${tutorial['sub-title']}</p>
                <!-- Here you'll add the stars -->
              </div>
              <div class="card-footer">
                <small class="text-muted">${tutorial.author}</small>
                <small class="text-muted">${tutorial.duration}</small>
              </div>
            </div>
          </div>
        `;
  
        // Create a new row for each set of 4 tutorials or the last set if fewer than 4
        if (index % 4 === 0 || index === response.length - 1) {
          var newRow = $('<div class="carousel-item '+activeClass+'"><div class="row justify-content-center"></div></div>');
          $("#carouselExampleControls2 .carousel-inner").append(newRow);
        }
        // Append the card to the last row
        $("#carouselExampleControls2 .carousel-inner .row").last().append(cardHtml);
      });
      // Initialize or refresh the carousel
      $('#carouselExampleControls2').carousel();
    },
    error: function() {
      // Handle error
      $("#carouselExampleControls2 .carousel-inner").html('<p>Error loading tutorials</p>');
    }
  });  
});


  