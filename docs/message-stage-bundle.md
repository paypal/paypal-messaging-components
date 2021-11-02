# Creating A Stage Bundle

Makes your code live for testing in stage environments.

In **your branch**, after PR approved by the assigned reviewer.

## Build A Stage Tag:

In your VS terminal

### First Time

-   Have an owner add you to the namespace
-   `sudo npm i -g @paypalcorp/web`
-   `npm run build -- -t your_stage_tag_name_here`

### When Prompted

-   Username: `PayPal Email`
-   Password: `Paypal Password`

### Successful stage!

-   Go to link in terminal to view bundle
-   `Click` Request Approval
-   Assigned reviewer - test locally and in stage

### Test

In demos folder:

-   standalone.html
    -   update the src="" to messaging.js link from bundle
    -   save and run
