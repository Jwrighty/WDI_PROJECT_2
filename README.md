# WDI - PROJECT - 2 - Shout Out Eat Out

Heroku: [https://floating-taiga-98107.herokuapp.com/]()

**Skills** : 
HTML5, CSS3, JavaScript ES6, jQuery, Gulp, Yarn, Git, GitHub, MongoDB, Mongoose, Express, Google Maps & Place API, bcrypt.

# Intro & Brief
![](https://i.imgur.com/hOTrWCy.jpg)

The task for this project was to build an authenticated, MVC, RESTful resource Express app and if possible use an external API. The idea behind Shout Out Eat Out came from the fact that far too many people take pictures of their food and do absolutely nothing with them! The app looks to make use of those food pictures to develop a platform where you can use them to quickly “Shout Out” about a good dining experience. The app makes heavy use of the Google Maps API, incorporating autocomplete for search and Google Places data for printing out locations on the index and map.

# Shouting Out
A key component and big learning point for this project was working with Google's API. Beginning with utilising Auto-complete when a user wants to "Shout Out" about a place. Once selected there is a listener for a change event on the field that then populates hidden form fields with the data that i wanted to get from the Google Places API. On submission this is what is then stored in my own DB when creating a Shout Out for a restaurant.  I later added some logic that would check if the restaurant already existed and if so it would only add the users image submission and not create a full new entry.

I would like to have been able to allow users to upload an image at this stage rather than share a link but was advised against exploring imeag storage options at this stage.
![](https://i.imgur.com/aeW80YI.png)

#Eating Out
Another significant learning and probably the biggest challenge from this project was working with google maps and using the data captured from Google Places to plot markers on a map.

![](https://i.imgur.com/HchllWf.jpg)

This is also where i printed out an index of all restaurants that have recieved a "Shout Out"

![](https://i.imgur.com/H4d7f5u.jpg)

# The Restaurant

All images that have been submitted as part of a Shout Out by users are displayed in a scrolling gallery. There is also a counter based on the length of the image array to display how many users have Shouted Out about the restaurant. Data is pulled through from my database with the info that was captured earlier at the point the user created a Shout Out and the location plotted on a map.

![](https://i.imgur.com/JCtTNzc.jpg)
