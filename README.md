# Playwright Generic Tests

Repo contains tests that can be used across any project because the tests are universal.

Some tests will depend on configuration values being present. We expect to find these values in the `{ test }` object from the Playwright package.

Expected values should be defined in your tests that include any packages from this repo. Make sure you define these values AFTER requiring `test` from the Playwright package, and BEFORE you load your shared test package.



# @todo WARNING

This approach may have problems with running tests in parallel.

e.g., if we set `test.SHAREDCONFIG` in one file, and change it in another, what happens when the tests run in parallel?


