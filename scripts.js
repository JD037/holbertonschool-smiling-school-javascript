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
      let newCarouselItem = $('<div class="carousel-item"><div class="row"></div></div>');
      $('#carouselExampleControls2 .carousel-inner').append(newCarouselItem);
      let count = 0; // Counter for items per slide

      response.forEach(function(tutorial, index) {
        var activeClass = index === 0 ? 'active' : '';
        if (count === 0) {
          newCarouselItem.addClass(activeClass);
        }

        // Function to create star rating HTML based on the tutorial's rating
      var starsHtml = '';
      for (let i = 0; i < 5; i++) {
        starsHtml += i < tutorial.star ? '<img src="images/star_on.png" alt="Star On">' : '<img src="images/star_off.png" alt="Star Off">';
      }

      var cardHtml = `
      <div class="col-12 col-sm-6 col-lg-3 d-flex align-items-stretch">
        <div class="card mx-2">
          <img src="${tutorial.thumb_url}" class="card-img-top" alt="${tutorial.title}">
          <div class="card-body">
            <h5 class="card-title">${tutorial.title}</h5>
            <p class="card-text">${tutorial['sub-title']}</p>
          </div>
          <div class="card-footer bg-transparent">
            <img src="${tutorial.author_pic_url}" class="rounded-circle mr-2" alt="Author" style="width: 40px; height: 40px;">
            <span class="text-muted">${tutorial.author}</span>
            <div class="rating mt-2">${starsHtml}</div>
            <small class="text-muted">${tutorial.duration}</small>
          </div>
        </div>
      </div>
    `;


        newCarouselItem.find('.row').append(cardHtml);
        count++;

        // When we've added 4 items, or we're at the last item, append a new carousel item
        if (count % 4 === 0 || index === response.length - 1) {
          newCarouselItem = $('<div class="carousel-item"><div class="row"></div></div>');
          $('#carouselExampleControls2 .carousel-inner').append(newCarouselItem);
          count = 0; // Reset counter for the new slide
        }
      });

      // Initialize or refresh the carousel
      $('#carouselExampleControls2').carousel({
        interval: false
      });

      // Make sure to remove the last carousel item if it's empty
      if (count === 0) {
        $('#carouselExampleControls2 .carousel-inner .carousel-item').last().remove();
      }
    },
    error: function() {
      // Handle error
      $("#carouselExampleControls2 .carousel-inner").html('<p>Error loading tutorials</p>');
    }
  });
  
  // AJAX call for latest videos
  $.ajax({
    url: 'https://smileschool-api.hbtn.info/latest-videos',
    type: 'GET',
    beforeSend: function() {
      $("#carouselExampleControls3 .carousel-inner").html('<div class="loader"></div>'); // Adjust if you have a different loader element
    },
    success: function(response) {
      $("#carouselExampleControls3 .loader").remove();
      let itemsPerSlide = 4;
      let count = 0;
      let carouselInner = $("#carouselExampleControls3 .carousel-inner");
      carouselInner.empty(); // Clear the carousel inner

      response.forEach(function(video, index) {
        // Add active class to the first item
        var activeClass = index === 0 ? 'active' : '';

        // Generate the star rating HTML
        var starsHtml = '';
        for (let i = 0; i < 5; i++) {
          starsHtml += i < video.star ? '<img src="images/star_on.png" alt="Star On">' : '<img src="images/star_off.png" alt="Star Off">';
        }

        // Create the card HTML
        var cardHtml = `
          <div class="col-md-3">
            <div class="card mx-2">
              <!-- Thumbnail image -->
              <img src="${video.thumb_url}" class="card-img-top" alt="${video.title}">
              <div class="card-body">
                <!-- Video title and subtitle -->
                <h5 class="card-title">${video.title}</h5>
                <p class="card-text">${video['sub-title']}</p>
                <!-- Rating and author details -->
                <div class="user-info">
                  <img src="${video.author_pic_url}" class="rounded-circle mr-2" alt="${video.author}" style="width: 40px; height: 40px;">
                  <div class="rating">${starsHtml}</div>
                  <small class="text-muted">${video.author}</small>
                  <small class="text-muted">${video.duration}</small>
                </div>
              </div>
            </div>
          </div>
        `;

        // Append a new row to the carousel item or create a new item
        if (count % itemsPerSlide === 0) {
          var newRow = $('<div class="row justify-content-center"></div>');
          var newCarouselItem = $('<div class="carousel-item ' + activeClass + '"></div>').append(newRow);
          carouselInner.append(newCarouselItem);
        }
        carouselInner.find('.carousel-item').last().find('.row').append(cardHtml);
        count++;
      });

      // Initialize or refresh the carousel
      $('#carouselExampleControls3').carousel({
        interval: false
      });

      // If the last carousel item is empty or has less than 'itemsPerSlide', remove it
      if (count % itemsPerSlide !== 0) {
        $('#carouselExampleControls3 .carousel-inner .carousel-item').last().remove();
      }
    },
    error: function() {
      $("#carouselExampleControls3 .carousel-inner").html('<p>Error loading latest videos.</p>');
    }
  });
});