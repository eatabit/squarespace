window.onload = function() {

  if (document.getElementsByClassName("homepage").length > 0){
    assetsVersion = "v6";
    imageAssetsRootURL = "http://assets.eatabit.com/" + assetsVersion + "/images/";

    customerChatImages = ["customer_items.png", "customer_fulfillment.png", "customer_address.png", "customer_update.png", "customer_final.png"];
    restaurantChatImages = ["restaurant_greeting.png", "restaurant_fulfillment.png", "restaurant_address.png", "restaurant_confirmation.png", "restaurant_update.png", "restaurant_final.png"];

    imagesArray = customerChatImages.concat(restaurantChatImages);

    for (var i = 0; i < imagesArray.length; i++) {
      var img = new Image();
      img.src = imageAssetsRootURL + imagesArray[i];
    }

    element = document.getElementById("slideshow");

    customerChatDiv = document.createElement("div");
    customerChatDiv.setAttribute("style", "height:100px;position:absolute;right:35%;top:40%;z-index:10001;")

    restaurantChatDiv = document.createElement("div");
    restaurantChatDiv.setAttribute("style", "height:100px;position:absolute;left:15%;top:25%;z-index:10001;")

    chatImgStyle = "opacity:0;position:absolute;bottom:0px;";

    customerChatImg = document.createElement("img");
    customerChatImg.setAttribute("id", "customerChatBubble");
    customerChatImg.setAttribute("style", chatImgStyle);
    customerChatImg.setAttribute("src", "http://assets.eatabit.com/" + assetsVersion + "/images/customer_handle.png");

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
            restaurantChatImg.setAttribute("src", "http://assets.eatabit.com/" + assetsVersion + "/images/" + restaurantChatImages[restaurantChatImagesIndex]);
            restaurantChatImagesIndex ++;
            restaurantChatY.run();
          }, timeoutDuration);
        }
      });

      restaurantChatY.on("end", function() {
        if (customerChatImages.length >= (customerChatImagesIndex + 1)) {
          setTimeout(function() {
            customerChatImg.setAttribute("style", chatImgStyle);
            customerChatImg.setAttribute("src", "http://assets.eatabit.com/" + assetsVersion + "/images/" + customerChatImages[customerChatImagesIndex]);
            customerChatImagesIndex ++;
            customerChatY.run();
          }, timeoutDuration);
        }
      });

      customerChatY.run();
    });
  };
};
