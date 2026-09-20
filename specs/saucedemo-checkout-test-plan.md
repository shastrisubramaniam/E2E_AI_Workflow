# SCRUM-101: SauceDemo Checkout Test Plan

## Objective
Validate the end-to-end checkout journey for the SauceDemo e-commerce experience, covering cart review, required field validation, order summary, completion flow, and error handling.

## Application Under Test
- URL: https://www.saucedemo.com
- Username: standard_user
- Password: secret_sauce

## Test Scope
- Login and product listing access
- Cart review and quantity display
- Checkout form validation
- Order overview and totals
- Order completion confirmation
- Navigation and cancel flows
- Error and edge-case handling

## Test Data
- Valid user credentials: standard_user / secret_sauce
- Product add-to-cart selections: Sauce Labs Backpack, Sauce Labs Bike Light
- Checkout form values: first name = Jane, last name = Doe, postal code = 10001
- Invalid values: empty strings, special characters, too-short postal values

## Scenario 1: Successful checkout flow
### Purpose
Verify the full happy path from login through purchase confirmation.

### Steps
1. Open the login page.
2. Log in with the standard user credentials.
3. Add at least one product to the cart.
4. Open the cart.
5. Confirm the product details and total price are displayed.
6. Click Checkout.
7. Enter valid first name, last name, and zip code.
8. Click Continue.
9. Confirm the overview page shows item summary, shipping, and totals.
10. Click Finish.
11. Confirm the order confirmation screen displays a success message.

### Expected Results
- User is redirected to the inventory page after login.
- Cart badge updates when a product is added.
- Cart page displays product name, description, price, and quantity.
- Checkout page shows all fields and required validation.
- Overview page displays subtotal, tax, and total.
- Confirmation page shows a success confirmation and a Back Home button.

## Scenario 2: Cart review validation
### Purpose
Ensure the cart reflects the right product data before checkout begins.

### Steps
1. Log in to the app.
2. Add a product to the cart.
3. Navigate to the cart.
4. Review the product details.
5. Click Continue Shopping then return to the cart.

### Expected Results
- Product details match the selected item.
- Price and quantity are displayed correctly.
- Continue Shopping returns to the products page without losing the session.
- Checkout button is enabled when the cart has items.

## Scenario 3: Required-field validation on checkout
### Purpose
Confirm that blank checkout fields are blocked and each field gets a clear message.

### Steps
1. Log in and add a product.
2. Go to the cart and click Checkout.
3. Leave all fields empty and click Continue.
4. Submit a form with only the first name filled.
5. Submit with missing last name or zip.

### Expected Results
- The application prevents move to the next step.
- Error messages indicate the missing required field.
- User remains on the checkout information page until valid values are entered.

## Scenario 4: Invalid data handling
### Purpose
Ensure invalid values do not pass validation.

### Steps
1. Navigate to the checkout form.
2. Enter special characters or malformed values in the form fields.
3. Attempt to continue.

### Expected Results
- The app shows validation errors for invalid entries.
- The user cannot proceed beyond the information step until valid data is supplied.

## Scenario 5: Cancel flow
### Purpose
Verify users can cancel checkout at any point.

### Steps
1. Log in and add an item to the cart.
2. Navigate to checkout information.
3. Click Cancel.
4. Repeat on the overview page and confirm return to the cart.

### Expected Results
- Cancel takes the user back to the cart or product list.
- No order is placed when the user cancels.
- The cart remains intact unless reset explicitly.

## Scenario 6: Order completion and return to inventory
### Purpose
Confirm the final success state after the order is finished.

### Steps
1. Complete valid checkout information and continue.
2. Review the item list and totals.
3. Click Finish.
4. Click Back Home.

### Expected Results
- User reaches the order confirmation page.
- Confirmation text indicates the order was placed successfully.
- Back Home returns to the product listing page.
- Cart is cleared after order completion.

## Exploratory Notes
- The app uses stable data-test attributes for inputs and actions.
- Browser interactions should prefer explicit waits for the cart, continue, and finish actions.
- The checkout step is sensitive to missing required fields, so assertions should validate both the error banner and the staying page state.

## Coverage Summary
This plan covers all acceptance criteria from SCRUM-101: AC1, AC2, AC3, AC4, and AC5.
