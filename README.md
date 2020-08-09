# Kete

## Install Dependencies

```
yarn install
docker-compose run script yarn install
```

## Running

To run with Tailwind Just-In-Time Mode:
```
yarn start
```

Optionally, to run in docker:
```
docker-compose up
```

View the app at http://localhost:7780

## Testing

Run unit tests:

```
yarn test
```

To run a single unit test:
```
yarn test /path/to/test/file.js -t "test name"
```


Open Cypress test runner:

```
yarn cypress install
yarn cypress open
```

## Updating Configuration
View the config page at http://localhost:7780/config

## Testing Authentication
View the auth page at http://localhost:7780/auth
