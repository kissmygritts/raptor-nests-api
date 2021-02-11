# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Remove `POST /nests/:id/new` route
- Add `GET /nests/feed` route(?)

## [0.2.3] - 2021-02-10

### Changed

- Update JSON Schema `enums` to match frontend

## [0.2.2] - 2021-02-09

### Fixed

- `location_details` was excluded from the nest props which caused a nest to be entered
  into the database without it.

## [0.2.1] - 2021-02-08

### Changed

- Update schema to match front-end
- Create nest visit route now accepts and handles updated nest locations
  - rewrote the handler for `POST /nest/:id/visit` to deal with the fact that
    adding additional nest visits can change the nest locations. Still works
    without a location prop.

## [0.2.0] - 2021-02-08

### Added

- POST nest visit takes location and visit data props
- Edit nest details. Send request to `PUT /nests/:id`

### Changed

- Add `>` and `=` to clarify adult, production counts
- `location.exact_coordinates` changed from boolean to string type

### Deprecated

- `POST /nests/:id/new` will be removed in a future release. Use `POST /nests/:id/visit`

## [0.1.1] - 2021-01-04

Initial release
