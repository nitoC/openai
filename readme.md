
# Elastic Team OpenAI Powered Text Generator 

This Node.js web application that leverages OpenAI's API for text generation. The application aims to provide a user-friendly platform for generating diverse text outputs based on user prompts.

## Features

- Page layout with a header, main chat area, and input field.
- Integration with OpenAI's API for text generation.
- Customization options for text output, such as length, creative temperature, keywords, and tone.
- Support for providing detailed prompts or context for generating text.
- Interactive mode for continuous conversation with the AI.
- Graceful handling of potential API errors.


## Additional Features, Functionalities and possible drawbacks

In addition to the challenge specifications, you have implemented the following features and functionalities:

- Timeout: Requests that are not completed within 29000 milliseconds (29 seconds) are automatically timed out to prevent long waiting times. This returns (**" OOPS!! something went wrong with your request this could be due to a timeout, please refresh page or try again "**). The time might not be enough to generate some responses so To adjust timeout go to line 152 of the main.js file in public folder and also adjust line 17 in openai.js in the utils folder to change to the desired time in both files.
- Back-and-Forth Communication: The application enables back-and-forth communication with the OpenAI API, allowing users to have interactive conversations with the AI.
- Input Field Validation: If the input field is empty and the submit button is clicked, no request is sent to the API, and the form is not submitted.
- Submission Throttling: After clicking the submit button, no further submissions are allowed until the previous request is settled, preventing multiple concurrent requests.
- Typing Functionality: When a response is being generated by the AI, the typing indicator is displayed, giving a visual cue to the user that the application is processing the request.
- Scroll to Latest Message: When a response is generated, the chat interface automatically scrolls down to the bottom or the latest message, ensuring that the user can easily view the generated response.
- logout button leads back to the login page.

**please note that a settings button and sidebar was added to the application but is hidden using the css transform property to meet design specifications. feel free to explore by visiting the styles.css and adjusting the sidebar class selector's scale value from 0 to 1 or delete transform property. This allows users to easily set and experiment on the temperature, maximum length and restarting text without using the chatarea input field or prompts.**

## Getting Started

To get started with the completed challenge, follow these steps:

1. Clone this repository to your local machine.
2. install typescript globally / locally.
3. Install the required dependencies using `npm install` or `yarn install`.
4. Configure the necessary environment variables in a `.env` file. Make sure to include the required API keys for OpenAI.
5. Run the application using `npm start` or `yarn start`.
6. Access the application in your web browser at the provided URL.
7. In your browser visit http://localhost:4000
8. login using the credentials below.

**Please note that you must have a stable internet connection before running yarn start or npm start to avoid the app crashing on startup due to connectivity issues to openai.**

## How to Login

To access the chat section, use the following login credentials:

- **Email: guest@gmail.com**
- **Password: guest001**

**Please note that using any other credentials will result in an "Invalid credentials" error.**

## Folder Structure

The project follows a modular folder structure to keep the code organized and maintainable. Here's an overview of the folder structure:
- src
   - config
     - config.ts 
  - controllers
    - chat.ts
    - home.ts
    - login.ts
    - loginUser.ts
    - authenticate.ts
    - settings.ts
  - models
    - settings.ts
  - routes
    - index.ts
  - utils
    - openai.ts
    - copyPug.ts
  - views
    - partials
      - Header.pug
      - messageBox.pug
      - Input.pug
    - layouts
      - index.pug
      - login.pug
  - index.ts
- public
  - css
    - styles.css
    - login.css
  - js
    - main.js
    - login.js
- package.json

Feel free to explore the different folders and files to understand the project's structure.


## Dependencies

The following dependencies are used in this project:

-   `@types/express`: TypeScript type definitions for Express.
-   `@types/fs-extra`: TypeScript type definitions for fs-extra.
-   `@types/node`: TypeScript type definitions for Node.js.
-   `body-parser`: Node.js body parsing middleware.
-   `dotenv`: Loads environment variables from a `.env` file.
-   `express`: Fast, unopinionated, minimalist web framework for Node.js.
-   `fs-extra`: File system utilities for Node.js.
-   `openai`: Library for interacting with the OpenAI GPT-3.5 API.
-   `pug`: Template engine for Node.js, used for generating HTML.
-   `typescript`: JavaScript superset that provides static typing.

## Font usage
 
 All font imports were done at the top of the css files.
For styling the application, the following fonts were used:

- Inter: This font was used in the chat area to provide a clean and modern look. It is imported in the `styles.css` file.
- Poppins: This font was used in the login page to create an attractive and elegant login interface. It is imported in the `login.css` file.

**Please ensure that the necessary font imports are included in the respective CSS files to maintain the intended visual presentation of the application.**