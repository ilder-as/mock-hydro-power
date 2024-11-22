# Mock API for Power Station and Reporting Data

This folder contains a simple API for mocking data related to power stations and reporting. The API is designed to provide dynamic mock data and can be easily wired towards a real API in the future.

We are using [Prism](https://stoplight.io/open-source/prism) from Stoplight to mock the API based on an OpenAPI specification [githublink](https://github.com/stoplightio/prism).

## Getting Started

### Prerequisites

Before you can run the mock API, make sure you have **Node.js** installed.

To start the mock API, simply run the following command:

```bash
prism mock openapi.yaml -d
```

The API uses Faker to generate dynamic mock data. The dynamic mode (-d) ensures that each time you make a request, you receive randomized data based on the schema.
