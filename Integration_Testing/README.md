# Hex to RGB API

A small Node.js project: a hex-to-RGB library (`src/hexToRgb.js`), an Express REST API that uses it (`src/app.js`), and a Jest test suite (`test/`).

## Setup and usage

```bash
npm install
npm start              # starts the API at http://localhost:3000
```

## API

`GET /api/hex-to-rgb/:hex`

```bash
curl http://localhost:3000/api/hex-to-rgb/ff8800
# {"hex":"ff8800","rgb":{"r":255,"g":136,"b":0}}
```

Use `%23` for a leading `#` (e.g. `/api/hex-to-rgb/%23f80`). Invalid input returns `400` with `{ "error": "..." }`.

## Tests

```bash
npm test                  # unit + integration tests
npm run test:unit
npm run test:integration
npm run test:coverage
```
