# Data-Privacy-Vault

This service provides a simple tokenization mechanism for sensitive data. It exposes HTTP endpoints to tokenize and detokenize data, allowing users to store sensitive data securely and retrieve it later using a token.

## Getting Started

To get started with the tokenization service, follow these steps:

1. Clone the repository:
    ```
    git clone https://github.com/excellencia/Data-Privacy-Vault
    cd Data-Privacy-Vault
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the server:
    ```
    npm start
    ```

By default, the server will run on port 3000. You can access the tokenization endpoints at:
- `http://localhost:3000/api/tokenize` (POST): Endpoint to tokenize data.
- `http://localhost:3000/api/detokenize` (POST): Endpoint to detokenize data.

## API Endpoints

### POST /api/tokenize

This endpoint tokenizes the provided sensitive data.

#### Request Body
```json
{
    "id": "req-12345",
    "data": {
        "field1": "value1",
        "field2": "value2",
        "fieldn": "valuen"
    }
}
```

#### Success Response (HTTP Code 201)
```json
{
    "id": "req-12345",
    "data": {
        "field1": "t6yh4f6",
        "field2": "gh67ned",
        "fieldn": "bnj7ytb"
    }
}
```

### POST /api/detokenize

This endpoint detokenizes the provided tokenized data.

#### Request Body
```json
{
    "id": "req-33445",
    "data": {
        "field1": "t6yh4f6",
        "field2": "gh67ned",
        "field3": "invalid token"
    }
}
```

#### Success Response (HTTP Code 200)
```json
{
    "id": "req-33445",
    "data": {
        "field1": { "found": true, "value": "value1" },
        "field2": { "found": true, "value": "value2" },
        "fieldn": { "found": false, "value": "" }
    }
}
```

## Dependencies

- express: ^4.17.1
- body-parser: ^1.19.0
- uuid: ^8.3.2

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.