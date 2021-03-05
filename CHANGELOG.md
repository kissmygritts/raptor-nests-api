# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- Remove `POST /nests/:id/new` route
- Add `GET /nests/feed` route(?)

## [0.4.2] - 2021-03-05

### Fixed

- `nests.probable_origin` enum didn't have accipiter/buteo as an option, fixed.

## [0.4.1] - 2021-03-02

## Added

- `created_by`, `updated_by` are updated included in the PUT/POST request body
  - These fields are updated in the database relate ownership of a row in the database

## Fixed

- Enum schemas to match the frontend values

## Removed

- Nest Decorations, not used often enough

## [0.4.0] - 2021-02-16

## Added

- Authentication routes
  - `/register` to create a new user
  - `/login` to sign in as an existing user
  - By default existing users are unverified. This must be done manually to ensure data isn't exposed to unverified users. Right now verified users are NDOW biologists
- All routes have a `preValidated` lifecycle method that requires a `Authorization` header with a JWT.
  - except `/login` and `/register`

## Fixed

- Changes to the location schema in v 0.3.0 caused an error when creating the geom on `PUT /nests/:nestid/visits`. I fixed this.

## [0.3.0] - 2021-02-13

### Added

- Routes for batch uploading data to the database. This will be useful for scripting bulk uploads.
  - `/:table/batch` is the route for each table: `nests`, `nest-visits`, `locations`
- Utility functions to help with the batch inserts
- Location schema broken into `body`, `response`, `sharedProps` to better compose schemas. This addition is more flexible for composing the different schemas. Looking into changing all schema to this format.

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
