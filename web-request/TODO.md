- test that external links are working ('ok' response)
- test that internal links are working ('ok' response)
- a11y tests


playwright tips
- https://thats-it-code.com/playwright/playwright__tips-and-tricks-1/#playwright-get-all-links

found_elements = page.locator('a')
found_elements = page.locator('a[href]')
print(f"{found_elements.count()} link/links are found.")


https://www.programmablebrowser.com/posts/404-checker-playwright/


