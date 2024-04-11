# README

The teleporter, is a central registry or [Subject](https://en.wikipedia.org/wiki/Observer_pattern),
where fragments(web components) can subscribe to. Subscribed fragments declare their resources (js or css scripts) to the
registry. Registry is responsible for loading the resources.

### Summary of set up

1. fragment: Next to Teleporter, this repo contains a fragment folder, which mocks the behaviour of a fragment
2. test-Host: A vue application that registers the teleporter and loads the fragment
3. teleporter: contains the loader code, which is responsible for registry and event handling. This is the actual asset that
   is uploaded as a build artifact.
4. tests: A folder containing end-to-end tests for fragment, test-host and teleporter (using playwright)

### Local development

#### .env entries

```bash
VITE_APP_LOG_EVENTS=true
```
