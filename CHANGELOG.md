# Changelog

## v2.0.8

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.7...v2.0.8)

### 🩹 Fixes

- Fix process definition advanced filter ([d2b3ed0](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/d2b3ed0))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

## v2.0.7

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.6...v2.0.7)

### 🚀 Enhancements

- Add process definition advanced filters ([ddafaf1](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/ddafaf1))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

## v2.0.6

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.5...v2.0.6)

### 🚀 Enhancements

- Update process definition shape and filtering ([d92f505](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/d92f505))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

## v2.0.5

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.4...v2.0.5)

### 🚀 Enhancements

- Add scopeKey filter to element instance history query ([a7958c5](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/a7958c5))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

## v2.0.4

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.3...v2.0.4)

### 🚀 Enhancements

- Add advanced filtering to state in user tasks ([#49](https://github.com/vsgoulart/camunda-api-zod-schemas/pull/49))

### 🩹 Fixes

- Naming and unnecessary exports ([3fea1a5](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/3fea1a5))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>
- Vítor Tavares ([@vitorwtavares](https://github.com/vitorwtavares))

## v2.0.3

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.2...v2.0.3)

### 🩹 Fixes

- Add email to current user ([89232e5](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/89232e5))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

## v2.0.2

[compare changes](https://github.com/vsgoulart/camunda-api-zod-schemas/compare/v2.0.1...v2.0.2)

### 🩹 Fixes

- Fix current user response format ([c6638e9](https://github.com/vsgoulart/camunda-api-zod-schemas/commit/c6638e9))

### ❤️ Contributors

- Vinicius Goulart <vinicius.goulart@camunda.com>

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
