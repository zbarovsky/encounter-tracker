# Encounter Tracker Readme

## Idea
Encounter tracker for DnD adventures to make lists of encounters and, when started, the order can be adjusted based on the intiative roll of each monster (or hoard of monsters), and PC's.

You're parties ready to fight that adult black dragon, initiative is rolled, and now you as the DM have to deal with the hassle of writing out and keeping track of the initiative order. WELL NOT ANYMORE! Now all that can be solved with my (soon to be created) encounter tracker. With it you can create your encounters ahead of time (no more making it up on the fly, even though we all know it happens all the time, and that's okay), and with simply adding their init roll, can adjust where in the initiative order they stand. The best part, this is doable for your players characters as well.

## Wireframes && ERD
* Main Page: https://wireframe.cc/ndgoMT
* Create Profile: https://wireframe.cc/lpcfvt
* Profile List: https://wireframe.cc/XeBtUQ
* Monster Results: https://wireframe.cc/eUarXM
* Init Roll: https://wireframe.cc/ujqq5c
* Party Create: https://wireframe.cc/cSTwJj
* Party Profile Page: https://wireframe.cc/ODCURg

* ERD: https://dbdiagram.io/d/5efc19ef0425da461f041746 

## Tech Stack
* HTML
* CSS/Bootstrap
* JS/EJS
* Node
* Sequelize
* Axios
* Postgres
* DnD 5e API (http://www.dnd5eapi.co)
* A lot of dependencies

## MVP
* Log in and have indivial profiles ✅
* Search monsters by name and get relevent information ✅
* add monsters to encounter list ✅
* show encounter list ✅
* make list moveable based on intiative roll ✅

## Stretch
* Ability to add PC's and relevent stats to a list
* Add PC's to encounter list
* Hoard rolls 
* Init roll button ✅
* Multiple encounter lists ✅
* Update and track health during encounter ✅
* Ability to add custom monsters ✅
* Friends list (view other peoples encounters)

## Roadblocks
* A lot to complete in a week
* It's a lot of pages to build
* Not the best with CSS/Bootstrap to make page look clean
* Lots of different relationships between postgres tables, making sure they link properly will be difficult

## Bugs
* init and health have to be updated together every time, or the page doesn't refresh and the data doesn't populate. -- FIXED.
* cannot search for monsters without signing in/up first SOLVED: now have to be logged in to use search, if not, redirects to log in page.
* If user adds an extra space at the end, they can't search for the monster.

## Acknowledgements
* Link to my background image: https://wallpapercave.com/w/wp4786823
* Thanks to Tyler, Daniel, and Emily for testing my app at launch.
