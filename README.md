# sitiomabuhaycanteen 1.0

This is the official frontend of the Sitio Mabuhay Canteen (PROJECT)

09-23 Update

Working Registration
    - Register using (LRN, First Name, Last Name, Password)
    - Hashed Password before saving to database for security

Working Login
    - Log In using (LRN and Password)

09-24 Update

Working Order
    - Predefined product display 
    - Cart add/remove system
    - Place order handling (frontend only)
Note: Hindi pa pumapasok sa database ang orders, hanggang backend server palang natapos ko. 7 na banaman nagising hihi

09-26 Update

Order details now recorded on database.
Customer Name,
Items,
Total Amount,
Status, and
Date

10-02 Update

*Added order counter logic (server+DB)
   - to make a unique order number
*Implemented OrdrNum on order placement
*Backend fetching for orders
*Started working on staff page
   - still no authentication (add '/staff' on url to access)
   - order display (not good/backend errors)
   - no css codes (styling)
Comming soon
*Admin page
*IU modifications

10-03 Update

 *Staff page
   - still no authentication (add '/staff' on url to access)
   - different order displays (pending, ready, claimed)
   - minimal css codes (styling)

Comming soon
*Admin page
*IU modifications

10-04 Update

 *Staff Page
  - still no authentication (add '/staff' on url to access)
  - accurate order fetching (old orders = top, new orders = bottom)
  - nice styling (open for feedback)

Comming soon
*Register Page Update (staff register)
*Login Page update (staff login)
*Staff authentication
*Admin page
*IU modifications

10-05 Update

 *Order Page
  - CSS codes rework (same design with staff page)
  - JavaScript codes reworked (to fetch products that suits with CSS)
  - HTML codes reworked (elements ordering to suit with CSS)
  - Mobile View Based (compressed display when on desktop)

Comming soon
*Custom order placed notification (instead of web alert)
*Order history display
*Cancel order feature
*Register Page Update (staff register)
*Login Page update (staff login)
*Staff authentication
*Admin page
*IU modifications

10-23 Update
*Working Registration, Login, Order, and Staff page.
*Authentication for Customers and Staffs.
*Restricted Order and Staff page. (only authorized users allowed)
*Users data reset to organize data. (all beta testers must register again)

10-24 Update
- Added myOrders page to view orders.
- Added cancel order feature. (within 2 minutes)
- Added styles on myOrders.
- All frontend functions connected to backend routes.

01-06-25 Update
- Added remaining stock in orders page.
- Added toast notification when adding items to cart.
- Added toast notification when trying to place order with empty cart.

01-08-25 Update
- Added loading indicator when logging in as customer.
- Added loading indication when loggin in as staff.

01-10-25 Update
- Added loading indicator when placing order.
- Added prompt for successful order.
- Added prompt for expired loggin session. (redirect to login page after 3s)
- Added prompt for errors when placing order. (e.g. out of stock, network errors, backend failures etc.)
- Added toast notification when removing items in cart.
- GitHub repository reorganized.

###January 28 2025 Update###
    - Added loading indicator registering a user.
    - Added prompt for successful registration.
    - Added prompt for errors in registration.
    - Added show button for passwords.

###January 29 2025 Update###
    - Added loading indicators in staff page.
    - Added prompts when updating orders.
    - Minor error handling.
NOTE: Dapat naka enable yung mga options for notification para mag notify sa customer ang order update.
