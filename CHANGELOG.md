# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.2.0](https://github.com/yzw7489757/ceval/compare/v1.1.0...v1.2.0) (2020-06-23)


### Features

* **single function:** support obj.arr = xxx & obj[variable] left hide handle ([ef11834](https://github.com/yzw7489757/ceval/commit/ef118342050192743a7313dc860381e6d8843e55))

## [1.1.0](https://github.com/yzw7489757/ceval/compare/v1.0.7...v1.1.0) (2020-06-23)


### ⚠ BREAKING CHANGES

* **single function:** support typeof 1 && typeof(1); Declare errors caused by some variables, e.g. var inf, 'in' is
keyword; functions Unused; return function of Interrupt the current operation cycle;
 add
consts:NaN、Infinity;

### Bug Fixes

* **single function:** use functions,reg of keyword, add consts ([d0f7203](https://github.com/yzw7489757/ceval/commit/d0f72032fb6d1b1e97926d6ae9c2a9449b4f16bd))

### [1.0.7](https://github.com/yzw7489757/ceval/compare/v1.0.6...v1.0.7) (2020-06-18)


### Bug Fixes

* **single function:** comment reg and function body loop ([9acba89](https://github.com/yzw7489757/ceval/commit/9acba89bd4125344d2c97892440ee20a0cd5a020))

### [1.0.6](https://github.com/yzw7489757/ceval/compare/v1.0.5...v1.0.6) (2020-06-07)

### [1.0.5](https://github.com/yzw7489757/ceval/compare/v1.0.4...v1.0.5) (2020-06-07)


### ⚠ BREAKING CHANGES

* **single function:** `var a = 1` and `a = 1` ,it shouldn't be the same effect, The former is a declarat

ISSUES CLOSED:  ion, while the latter is only a modification

### Bug Fixes

* **single function:** `var a = 1` and `a = 1` ,it shouldn't be the same effect ([e0ad9a9](https://github.com/yzw7489757/ceval/commit/e0ad9a98b468f26d33c3e3114bdc0a20cabd15a5))
* **single function:** fix :Error reported at the end of semicolon ,update docs ([b41b7b7](https://github.com/yzw7489757/ceval/commit/b41b7b781817bc3e8f4312f0fbcb699b3eed31bc))

### [1.0.4](https://github.com/yzw7489757/ceval/compare/v1.0.3...v1.0.4) (2020-06-05)


### Features

* **single function:** support custom opeartor function ([b97246b](https://github.com/yzw7489757/ceval/commit/b97246bfdcf08b61b6c5690697f49ebbef327392))

### 1.0.3 (2020-06-05)


### ⚠ BREAKING CHANGES

* **number type:** is basic number);
* parser, token-stream, options.test.js

ISSUES CLOSED:  none

### Features

* **single function:** support handle number percision, four operations. fix 0.1 bug ([17aec00](https://github.com/yzw7489757/ceval/commit/17aec009d29ddf6a8c132a56dc5eb2aa36aa5192))


### Bug Fixes

* **number type:** add online explame and docs, fix:(0.1 not ([e5f91ea](https://github.com/yzw7489757/ceval/commit/e5f91ea4bbc65a0a2bca5e3fbec7ce9976c837e5))


* ⚠️feat(token & parser): 支持options ([3a31864](https://github.com/yzw7489757/ceval/commit/3a318649c75a9f4cbac8a8f353d550407715fd3f))
