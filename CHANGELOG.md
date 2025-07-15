# Changelog

## v2.0.1

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.0...v2.0.1)

### 🩹 Fixes

- Rename batchOperationId -> batchOperationKey ([#47](https://github.com/vsgoulart/camunda-api-zod-schemas/pull/47))

### 🏡 Chore

- Fix formatting ([d2d1fa5](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/d2d1fa5))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>
- Patrick Dehn ([@pedesen](https://github.com/pedesen))

## v2.0.0

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v1.2.0...v2.0.0)

### ⚠️ Breaking Changes

- Bump to zod v4 ([c7f0cc5](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/c7f0cc5))
- Remove cjs support ([9df4d63](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/9df4d63))

### 🚀 Enhancements

- Add batch operation endpoints ([#44](https://github.com/vsgoulart/camunda-api-zod-schemas/pull/44))

### 💅 Refactors

- Replace biome with prettier ([9733d7b](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/9733d7b))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>
- Patrick Dehn ([@pedesen](https://github.com/pedesen))

## v1.1.0

### ⚠️ Breaking Changes

- Temporarily revert to Zod v3

### 🚀 Enhancements

- Temporarily add CJS support

### 🩹 Fixes

- Fixes inconsistency in `getProcessInstanceSequenceFlowsResponseBodySchema` name

### ❤️ Contributors

- Vinicius Goulart
- Patrick Dehn

## v1.0.0

### ⚠️ Breaking Changes

- Migrate to Zod v4
- Add Camunda unified version to export path. `@vzeta/camunda-api-zod-schemas` -> `@vzeta/camunda-api-zod-schemas/8.8`

### 🚀 Enhancements

- Implement all missing endpoints and definitions from the [Camunda API](docs.camunda.io/docs/8.8/apis-tools/camunda-api-rest/specifications/camunda-8-rest-api/)

### ❤️ Contributors

- Vinicius Goulart
- Alexandre Bremard
- Patrick Dehn
- Sebastian Stamm

## v0.0.1

### 🏡 Chore

- Bootstrap project ([0236e68](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/0236e68))

### 🤖 CI

- Add renovate.json ([#1](https://github.com/vsgoulart/camunda-api-zod-schemas/pull/1))

### ❤️ Contributors

- Vinicius Goulart
