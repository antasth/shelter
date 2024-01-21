# Shelter

## <img src="https://raw.githubusercontent.com/antasth/images-for-readme.md/main/Shelter/shelter1.png" width="45%"></img> <img src="https://raw.githubusercontent.com/antasth/images-for-readme.md/main/Shelter/shelter2.png" width="45%"></img> <img src="https://raw.githubusercontent.com/antasth/images-for-readme.md/main/Shelter/shelter3.png" width="45%"></img> <img src="https://raw.githubusercontent.com/antasth/images-for-readme.md/main/Shelter/shelter4.png" width="45%"></img>

---

[Deploy](https://antasth.github.io/shelter/)

---

## **About the project**

This project was developed as part of the RSSchool frontend course. [Link to task](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/shelter/shelter.md). Shelter is a project in which it was necessary to create a website using a [figma layout](https://www.figma.com/file/Yk6EnbY63FyG2PJTFkJDMh/shelter), consisting of two pages, make it adaptive and interactive.
The development of this project was divided into 3 stages:

- In the first part of the task, it was necessary to create the main and pets pages according to the layout, which are displayed correctly with a window width of at least 1280px.
- In the second stage it was necessary to add adaptability to the pages created in the first stage, up to a width of 320px inclusive
- In the third stage it was necessary to add interactivity to pages:
  - Burger menu on both pages
  - Popup window for pets cards
  - Infinite slider on the main page
  - Pagination on the pets page

## **Features**

1. Burger menu

- When the page width is less than 768px, the navigation bar is hidden and a burger icon appears.
- When you click on the burger icon, a 320px wide adaptive menu smoothly appears on the right, the burger icon smoothly rotates 90 degrees.
- Responsive menu height takes up the entire screen height.
- When you click on the burger icon again or on a space free from the burger menu, the adaptive menu smoothly disappears, moving off the right side of the screen, the burger icon smoothly rotates 90 degrees back.
- When you click on any link (interactive or non-interactive) in the menu, the adaptive menu smoothly disappears to the right, the burger icon rotates 90 degrees back.
- The location and size of the elements in the burger menu corresponds to the layout (vertical and horizontal centering of menu elements, icon placement).
- The area free of the burger menu is darkened.
- The page under the burger menu does not scroll.

2. Slider on the main page

- When you click on the arrows, you move to a new block of elements.
- Changing blocks occurs with the corresponding carousel animation.
- The slider is endless, i.e. you can press left or right endlessly, and each time you will scroll in that direction with a new set of cards.
- Each new slide contains a pseudo-random set of animal cards, i.e. is formed from initial objects in random order.

3. Pagination on the pets page

- When the page is reloaded, the first pagination page always opens.
- Pressing the > or < buttons opens the next or previous pagination page, respectively, when you press the >> or << buttons, the last or first pagination page opens, respectively.
- The circle in the center indicates the current page number. When switching pages, the number changes to the current one.
- Each pagination page contains a pseudo-random set of pets, i.e. is formed from initial objects in random order.

4. Popup window

- A pop-up appears when you click on any place on the card with a description of a specific animal, part of the page outside the popup is darkened.
- When opening a popup, the vertical scroll of the page becomes inactive, when closing it becomes active again. When you click on the area around the popup or on the button with a cross, the popup closes, while when you click on the popup itself, nothing happens.
- The popup window (not counting the button with a cross) is centered on all axes, the sizes of the popup elements and their location coincide with the layout.

## **Stack**

- HTML5
- CSS3
- Javascript
