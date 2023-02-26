# startup

### Merge Conflicts

- Fix by checking file for conflicts and resolving issues.

### AWS Server

- ip - http://18.217.200.168/
- domain - https://ndc922-cs260.click
- ssh command - ssh -i [key pair file] ubuntu@[ip address]
- deploy command - ./deployWebsite.sh -k [yourpemkey] -h [yourdomain]

### Simon HTML

- domain - https://simon.ndc922-cs260.click
- deploy command - ./deployFiles.sh -k [yourpemkey] -h [yourdomain] -s simon
- Notes
- Use proper structure elements to give meaning to your sections like nav, main, and footer.
- Menu can be used as an alternative to ul.
- Can use br and hr to create breaks and dividers.
- Can put links inside li elements to get bullet point links.

### Startup Specification - Recipe Book

- Home Page

![homePage](https://user-images.githubusercontent.com/97918203/214979549-7e3a241c-2f34-4d6b-b5df-a64ac2213ccf.png)

- My Recipes Page

![myRecipePage](https://user-images.githubusercontent.com/97918203/214979629-566b08a2-1783-427e-be1c-690ff5ed4685.png)

- Key Features
  - Search recipes using API and save them to your recipe list
  - Add personalized recipes
  - Fetch and render saved recipes from database
  - Chat with peers about recipes
  - Authenticated accounts
  - Elevator Pitch
  - Cook books are a thing of the past, today everything is digital and in your pocket, why shouldn't your recipes. With my webite, recipe book, you will be able to create and save all of your recipes to your account. In addition, you will get access to thousands of recipes with just a simple search. Why wait to cook the food of your dreams? Start now with recipe book.

### Simon CSS

- To add tailwind to project you need to include the script in the head of the file
- Tailwind allows you to add css selectors without any css by putting common naming conventions into class names
- You can use position absolute and position relative to move something on top of other elements without messing up the flex box
- Giving something a border-radius of 50% will make it a circle
- Can use flex-column on body elements to stick footer to bottom and navbar to the top

### Simon JS

- You can store variables in local storage by using the local storage object
- You can dynamically change pages with window.location.href
- JS has built in json parser
- Have to create elements before you can add them to the dom
- Create classes with classes with class keyword, constructor, and setting properties
- Can create a delay effect with promises and setTimeout
- Can set elements styles from js with dynamic values
