# README

The Webdocker is a central registry or [Subject](https://en.wikipedia.org/wiki/Observer_pattern)
to which fragments(web components) can subscribe. Subscribed fragments declare their resources (js or CSS scripts) to the
registry. The registry is responsible for loading the resources.

### Summary of setup

1. fragment: Next to Web Docker, this repo contains a fragment folder, which mocks the behavior of a fragment
2. test-Host: A vue application that registers the web docker and loads the fragment
3. web docker: contains the docker code responsible for registry and event handling. This is the actual asset that
   is uploaded as a build artifact.
4. tests: A folder containing end-to-end tests for fragment, test-host and web docker (using playwright)

### Local development

#### .env entries

```bash
VITE_APP_LOG_EVENTS=true
```
