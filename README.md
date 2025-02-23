# 🤖 AI Stream Agent

This Express.js app connects to OpenAI to power real-time chat completions with Server-Sent Events (SSE). It streams responses seamlessly, keeping conversations smooth and responsive. 🚀

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing Endpoints](#testing-endpoints)

## Features

- **Real-Time Streaming**: Utilizes SSE to stream OpenAI chat completions with low latency.
- **Class-Based Controller**: Implements a `ChatController` class for better organization, maintainability, and context binding.
- **Input Sanitization**: Limits message content length and supports configurable models (`gpt-3.5-turbo`, `gpt-4`).
- **Robust Validation**: Ensures messages are non-empty arrays with valid `role` and `content` fields.
- **Comprehensive Logging**: Tracks request lifecycle, errors, and client disconnections with request IDs.
- **Error Handling**: Gracefully handles errors with detailed SSE error events and HTTP responses.
- **Configurability**: Supports environment variables for max tokens, temperature, and port settings.

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

    ```js
    {
        "messages": [{ "role": "user", "content": "Hello!" }],
        "model": "gpt-3.5-turbo" // Optional: gpt-3.5-turbo or gpt-4
    }
    ```

- **Response**: Server-Sent Events (SSE) stream with chat completions.

### Response: SSE stream with events

```sh
data: {"content": "Hi there!", "requestId": "uuid"} (message chunks)
data: {"event": "[DONE]", "requestId": "uuid"} (completion signal)
Errors: data: {"error": "message", "event": "[ERROR]", "requestId": "uuid"}
```

### Error Responses

```sh
400 Bad Request: Invalid messages or model.
500 Internal Server Error: Server-side issues.
```
