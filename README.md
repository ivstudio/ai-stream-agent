# AI Stream Agent

This is an Express.js application that integrates with OpenAI's GPT-3.5-turbo model to provide a chat completion service using Server-Sent Events (SSE).

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Environment Variables](#environment-variables)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/ivstudio/ai-stream-agent.git
    cd ai-stream-agent
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/0) file in the root directory and add your OpenAI API key:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    ```

## Usage

1. Start the server:

    ```sh
    npm run server
    ```

2. The server will start on `http://localhost:3000`.

## Testing Endpoints

```sh
curl -N -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello, how are you?"}]}' \
  http://localhost:3001/api/chat
```

### POST /chat

This endpoint accepts a list of messages and returns a stream of chat completions.

-   **URL**: `/chat`
-   **Method**: `POST`
-   **Headers**: `Content-Type: application/json`
-   **Body**:

    ```json
    {
    	"messages": [{ "role": "user", "content": "Hello!" }]
    }
    ```

-   **Response**: Server-Sent Events (SSE) stream with chat completions.
