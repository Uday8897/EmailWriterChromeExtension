# Email Writer Chrome Extension

This Chrome extension enhances your Gmail experience by automatically generating email replies using AI. You can select the tone of the reply, whether **Professional** or **Friendly**, directly within the Gmail interface.

## Features
- **AI-Powered Replies**: Automatically generate email responses using an AI model.
- **Selectable Tone**: Choose between **Professional** or **Friendly** tones for your email replies.
- **Seamless Integration**: The extension adds a button and dropdown directly into Gmail's compose window.
- **Customizable**: Easily adjust the tones and other settings via the extension’s UI.

## Installation

1. **Download the Extension**:
   - Clone this repository or download the ZIP of the code.
   
2. **Load the Extension into Chrome**:
   - Open `chrome://extensions/` in your Chrome browser.
   - Enable **Developer Mode** (top right).
   - Click **Load unpacked** and select the folder containing the extension files.

3. **Start Using**:
   - Once installed, the extension will automatically detect when you're composing an email in Gmail.
   - An "AI Reply" button will appear along with a dropdown to select the tone of the email.

## How It Works

1. **Detects Gmail Compose Window**:
   - The extension listens for changes in the DOM and detects when the Gmail compose window appears.
   
2. **Injects AI Reply Button & Tone Dropdown**:
   - Once the compose window is detected, it injects a button ("AI Reply") and a dropdown to choose the tone (Professional or Friendly).

3. **Generate AI Email Response**:
   - When the "AI Reply" button is clicked, it sends the current email content and selected tone to the backend server.
   - The server generates a response, and the generated email is inserted directly into the compose box.

## Example Usage

1. Open Gmail and click to compose a new email.
2. The extension will automatically detect the compose window and show the **AI Reply** button and the tone selection dropdown.
3. Choose a tone (Professional or Friendly) and click the **AI Reply** button.
4. The generated response will be inserted into the compose window.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Chrome Extension APIs)
- **Backend**: Spring Boot,Spring Web Flux, Gemini AI model integration for email generation
- **AI Models**: Custom AI API for generating email replies with varying tones
- **Gmail Integration**: DOM manipulation for seamless Gmail integration

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License.
