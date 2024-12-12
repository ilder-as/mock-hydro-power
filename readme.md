# Mock API for Power Station and Reporting Data

This folder contains a simple API for mocking data related to power stations and reporting. The API is designed to provide dynamic mock data and can be easily wired towards a real API in the future.

## Prerequisites

Before you can run the mock API, make sure you have **Node.js** installed.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the mock server with type generation:

```bash
npm run mock
```

The `mock` command runs the following steps in sequence:

1. `npm run generate:api`
   - `npm run combine-yaml` - Combines component YAML files into a single OpenAPI spec
   - `orval --config ./orval.config.ts` - Generates TypeScript types from the spec
2. `npm run test:types` - Validates TypeScript types
3. `prism mock openapi.combined.yaml -d` - Starts the mock server with dynamic data

## Available Scripts

- `npm run mock` - Full sequence: generate types, validate, and start mock server
- `npm run generate:api` - Combines YAML and generates TypeScript types
- `npm run combine-yaml` - Only combines component YAML files
- `npm run test:types` - Validates TypeScript types

## Project Structure

```
.
├── components/          # OpenAPI component schemas
├── scripts/            # Build and development scripts
├── src/
│   └── api/           # Generated API types and client
├── openapi.yaml       # Main OpenAPI specification
└── openapi.combined.yaml  # Generated combined specification
```

## Mock Server

The mock server uses [Prism](https://stoplight.io/open-source/prism) to provide dynamic responses based on the OpenAPI specification. When running, it will:

- Validate requests against the schema
- Generate dynamic response data
- Support all defined endpoints with example data

The server runs on `http://localhost:4010` by default.

## Type Generation

The project uses [Orval](https://orval.dev/) to generate TypeScript types and a React Query client from the OpenAPI specification. Generated files are placed in `src/api/generated/`.

## Data Generation

See https://v6.fakerjs.dev/guide/ for allowed methods for data generation in the OpenAPI schemas.

## Development Workflow

1. Modify OpenAPI schemas in `components/` or the main spec in `openapi.yaml`
2. Run `npm run mock` to regenerate types and start the server
3. The mock server will automatically use the updated specification

## Contributing

When adding new endpoints or modifying existing ones:

1. Update the relevant component schemas in `components/`
2. Update the paths in `openapi.yaml`
3. Run `npm run mock` to validate and test changes

## License

[Add your license information here]
