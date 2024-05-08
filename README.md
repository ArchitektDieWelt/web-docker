# README

The Webdocker is a central registry or [Subject](https://en.wikipedia.org/wiki/Observer_pattern)
to which fragments(web components) can subscribe. Subscribed fragments declare their resources (js or CSS scripts) to the
registry. The registry is responsible for loading the resources.

It is mostly used for delivery of microfrontends to the overall project, providing multiple ways to trigger the assets injection.

### Summary of setup

1. fragment: Next to Web Docker, this repo contains a fragment folder, which mocks the behavior of a fragment
2. test-Host: A vue application that registers the web docker and loads the fragment
3. web docker: contains the docker code responsible for registry and event handling. This is the actual asset that
   is uploaded as a build artifact.
4. tests: A folder containing end-to-end tests for fragment, test-host and web docker (using playwright)

### Observed Modules

Assets for observed modules are initially not injected in page. An observation mechanism examines the page for frequent updates
and injects the assets only if the custom elements associated with the module are present on the page

### Page Modules

These are modules which are injected into the page as soon as the first render is finished.

### Global Modules

These are particular types of page modules which can be used by other modules as shared dependency.   

### Local development

1. run following build commands to create the test fragments
   ```bash
      nvm use
      npm run build:page-module
      npm run build:observed-module
   ```
2. Serve the fragments
   ```bash
      nvm use
      npm run serve:fragments
   ```
3. Serve the test host
   ```bash
      nvm use
      npm run dev:test-host
   ```
4. on the browser, navigate to `http://localhost:5173/test-host.html` to see the test host and the loaded page fragment
NOTE: navigating to `http://localhost:5173` will not show the fragment as the test host is not loaded on the root path

#### Environment variables
logging is disabled by default. To enable logging, set the following environment variable
   
   ```bash
    VITE_APP_LOG_EVENTS=true
   ```

### APIS

In order to register new components to the web docker, the following APIs can be used

## 1 - Registering using custom events

```javascript
    window.dispatchEvent(new CustomEvent('webdocker:register', {
        detail: {
            name: 'page-module',
            resources: [
                'http://domain/page-module.js',
                'http://domain/page-module.css'
            ]
        }
    }));
```
