# pw-web-request Changelog

  - v1.1.1 (2024-01-14)
    - Bugfix: Fixes package playwright dependencies
    - Bugfix: Fixes implementation of redirect301 tests
    - Bugfix: Fixes config key names for canonical tests
    - Bugfix: Fixes implementation of http200 tests

  - v1.1.0 (2024-01-14)
    - Maintenance: Implements limitation where tests will not run UNLESS configuration is provided
      - For tests that do not require configuration, pass an empty object
      - See [Github issue](https://github.com/kpander/playwright-generic-tests/issues/5)

  - v1.0.0 (2023-12-02)
    - Initial release of generic web tests for use in Playwright
      - http200
      - domainRedirect
      - canonical
      - redirect301
