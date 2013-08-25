function chatAnimation() {

  if (document.getElementsByClassName("homepage").length > 0){

    customerChatImages = [
      "http://assets.eatabit.com/v12/images/customer_items.png",
      "http://assets.eatabit.com/v12/images/customer_fulfillment.png",
      "http://assets.eatabit.com/v12/images/customer_address.png",
      "http://assets.eatabit.com/v12/images/customer_update.png",
      "http://assets.eatabit.com/v12/images/customer_final.png"
    ];
    restaurantChatImages = [
      "http://assets.eatabit.com/v12/images/restaurant_greeting.png",
      "http://assets.eatabit.com/v12/images/restaurant_fulfillment.png",
      "http://assets.eatabit.com/v12/images/restaurant_address.png",
      "http://assets.eatabit.com/v12/images/restaurant_confirmation.png",
      "http://assets.eatabit.com/v12/images/restaurant_update.png",
      "http://assets.eatabit.com/v12/images/restaurant_final.png"
    ];

    imagesArray = customerChatImages.concat(restaurantChatImages);

    YUI().use("gallery-preload", function(Y) {
      Y.preload (imagesArray);
    });

    element = document.getElementsByClassName("homepage")[0];

    customerChatDiv = document.createElement("div");
    customerChatDiv.setAttribute("style", "height:100px;position:absolute;right:35%;top:40%;z-index:10001;")
    customerChatDiv.setAttribute("class", "chatDiv");

    restaurantChatDiv = document.createElement("div");
    restaurantChatDiv.setAttribute("style", "height:100px;position:absolute;left:15%;top:25%;z-index:10001;")
    restaurantChatDiv.setAttribute("class", "chatDiv");

    chatImgStyle = "opacity:0;position:absolute;bottom:0px;";

    customerChatImg = document.createElement("img");
    customerChatImg.setAttribute("id", "customerChatBubble");
    customerChatImg.setAttribute("style", chatImgStyle);
    customerChatImg.setAttribute("src", "http://assets.eatabit.com/v12/images/customer_handle.png");

    restaurantChatImg = document.createElement("img");
    restaurantChatImg.setAttribute("id", "restaurantChatBubble");
    restaurantChatImg.setAttribute("style", chatImgStyle);

    element.appendChild(customerChatDiv).appendChild(customerChatImg);
    element.appendChild(restaurantChatDiv).appendChild(restaurantChatImg);

    customerChatImagesIndex = 0;
    restaurantChatImagesIndex = 0;

    timeoutDuration = 3000;

    YUI().use("anim", function(Y) {

      var customerChatY = new Y.Anim({
        node: customerChatImg,
        duration: 0.5,
        easing: "easeOut",
        from: { opacity: 0 },
        to: { opacity: 1 }
      });

      var restaurantChatY = new Y.Anim({
        node: restaurantChatImg,
        duration: 0.5,
        easing: "easeOut",
        from: { opacity: 0 },
        to: { opacity: 1 }
      });

      customerChatY.on("end", function() {
        if (restaurantChatImages.length >= (restaurantChatImagesIndex + 1)) {
          setTimeout(function() {
            restaurantChatImg.setAttribute("style", chatImgStyle);
            restaurantChatImg.setAttribute("src", restaurantChatImages[restaurantChatImagesIndex]);
            restaurantChatImagesIndex ++;
            restaurantChatY.run();
          }, timeoutDuration);
        }
      });

      restaurantChatY.on("end", function() {
        if (customerChatImages.length >= (customerChatImagesIndex + 1)) {
          setTimeout(function() {
            customerChatImg.setAttribute("style", chatImgStyle);
            customerChatImg.setAttribute("src", customerChatImages[customerChatImagesIndex]);
            customerChatImagesIndex ++;
            customerChatY.run();
          }, timeoutDuration);
        }
      });

      customerChatY.run();
    });
  };
};

chatAnimation.call();
