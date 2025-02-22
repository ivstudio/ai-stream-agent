# AI Stream Agent

This Express.js app connects to OpenAI to power real-time chat completions with Server-Sent Events (SSE). It streams responses seamlessly, keeping conversations smooth and responsive. 🚀

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing Endpoints](#testing-endpoints)

## Installation

1. Clone the repository:

    ```sh
    git clone git@github.com:ivstudio/ai-stream-agent.git
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
    npm run dev
    ```

2. The server will start on `http://localhost:3001`.

## Testing Endpoints

You can test the chat completion endpoint using **cURL**:

```sh
curl -N -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello, how are you?"}]}' \
  http://localhost:3001/api/chat
```

### POST

This endpoint accepts a list of messages and returns a stream of chat completions.

- **URL**: `/api/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:

    ```json
    {
        "messages": [{ "role": "user", "content": "Hello!" }]
    }
    ```

- **Response**: Server-Sent Events (SSE) stream with chat completions.
