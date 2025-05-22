# @vzeta/camunda-api-zod-schemas

This is a community-driven open-source project that provides [Zod](https://zod.dev/) schemas and TypeScript type definitions for the Camunda 8 REST API.

It aims to help developers build robust and type-safe applications when interacting with Camunda 8.

The official Camunda 8 REST API documentation can be found here: [https://docs.camunda.io/docs/next/apis-tools/camunda-api-rest/camunda-api-rest-overview/](https://docs.camunda.io/docs/next/apis-tools/camunda-api-rest/camunda-api-rest-overview/)

## Installation

You can install the package using your favorite package manager:

```bash
# pnpm
pnpm add @vzeta/camunda-api-zod-schemas

# npm
npm install @vzeta/camunda-api-zod-schemas

# yarn
yarn add @vzeta/camunda-api-zod-schemas
```

## Usage

The library exports modules that correspond to the different parts of the Camunda API. You can import the schemas and types you need from the main package or specific sub-modules like `@vzeta/camunda-api-zod-schemas/tasklist`.

Refer to the exported members from `lib/main.ts` and other files in the `lib` directory for available schemas and types.

## Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository and send pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.