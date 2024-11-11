# Title
ReactJS Full Stack Assignment - Interactive Bookstore Application

## Objective
The application should allow users to browse and search for books, view book details, add books to a shopping cart, and place an order.

## Tech Stack
Use ReactJS, React Router, Redux or React Context API, CSS or CSS frameworks, Git, and Github for hosting the repository.

## Completion Instructions

### Functionality
#### Must Have
* Build a React JS application with multiple pages/components, including Home, Book Listing, Book Details, Shopping Cart, and Checkout pages.
* Implement features such as book search, book filtering, add to cart, remove from cart, and order placement.

| Page            | Page Details                                                                                                             | Navigation                                                                            |
|-----------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| Home            | Header - links for pages Home, Book List, Cart, Banner-Heading, description, and "Explore Books" Button                  | -                                                                                     |
| Book List       | Header-links for pages Home, Book List, Cart, Book Items-image,title,subtitle,price,Search (by title), Filter (by price) | "Book List" link in Header,"Explore Books" Button, "Back" Button in Book Details Page |
| Book Details    | Book detailed information-image,title,subtitle,price,description,etc., "Add to cart" Button, "Back" button               | Each Book Item in Book List Page                                                      |
| Cart            | Cart Items, "Remove" Button, "Remove All" Button, Order Summary, "Checkout" Button                                       | "Cart" link in Header, "Back" Button in Checkout Page                                 |
| Checkout        | "Back" button, Order Form - Personal Details - First Name, Last Name, Email, Mobile No., Place Order Button,             | Checkout in Cart                                                                      |


    
#### Nice to Have
* implementing user authentication
* when order is placed, cartList must get empty
  
### Guidelines to develop a project
#### Must Have
* Use Github
    * Commit code regularly and commit messages should be clear
    * Include a README file explaining the project setup, usage instructions, and any additional information
    * The repo should be well organised and easy to read.
    * The code should be clean, modular, and well-structured
* The application should be visually appealing, and user friendly 
* The application should be handle all the errors

#### Nice to Have
* Implement unit tests

### Submission Instructions

#### Must Have
* Github Repository

#### Nice to Have
* Deploy the application on a hosting platform.

## Technical Details

### Routes

| PAGE          | ROUTE        | PATH          |
|---------------|--------------|---------------|
| Home          | Home         | /             |
| Book List     | Book List    | /books        |
| Book Details  | Book Details | /books/:isbn13|
| Cart          | Cart         | /cart         |
| Checkout      | Checkout     | /checkout     |
| Not Found     | Not Found    | /not-found    |


### Routes & Components

**Home**

| Component      | Details                                          | State              | API (IT Bookstore)       |
|----------------|--------------------------------------------------|--------------------|--------------------------|
| Home           | Heading, description, and "Explore Books" button | -                  | -                        |
| Header         | links for pages Home, Book List, Cart            | (Context Consumer) | -                        |

**Book List**

| Component      | Details                                          | State                                                                 | API (IT Bookstore)       |
|----------------|--------------------------------------------------|-----------------------------------------------------------------------|--------------------------|
| BookList       | Range Slider Filter (by price)                   | apiStatus, booksData, minPrice,maxPrice                               | /new                     |                      
| Header         | links for pages Home, Book List, Cart            | (Context Consumer)                                                    | -                        |
| BookSearch     | Search (by title), "Search" button               | query                                                                 | /search/{query}          |
| BookItem       | Book Items (title,subtitle,image,price)          | -                                                                     | -                        |
| Loader         |                                                  | -                                                                     | -                        |
| ErrorMessage   |                                                  | -                                                                     | -                        |     

**Book Details**

| Component      | Details                                                                                                            | State                                                   | API (IT Bookstore)       |
|----------------|--------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------|--------------------------|
| BookDetails    |  Book detailed information-image,title,subtitle,price, description, etc., "Add to cart" Button, "Back" button      | apiStatus, bookDetailsData,quantity (Context Consumer)  | /books/{isbn13}          |                                                 | apiStatus, booksData, priceRangeValue|  /new                    |                      
| Header         | links for pages Home, Book List, Cart                                                                              | (Context Consumer)                                      | -                        |
| Loader         |                                                                                                                    | -                                                       | -                        |
| ErrorMessage   |                                                                                                                    | -                                                       | -                        |


**Cart**

| Component      | Details                                                                           | State              | API (IT Bookstore)       |
|----------------|-----------------------------------------------------------------------------------|--------------------|--------------------------|
| Cart           | Cart Items, "Remove" Button,"Remove All" Button, Order Summary, "Checkout" Button | (Context Consumer) | -                        |                       
| Header         | links for pages Home, Book List, Cart                                             | (Context Consumer) | -                        |
| CartListView   |                                                                                   | (Context Consumer) | -                        |
| CartItem       | Book Detailed info (image,title,subtitle,price,description)                       | (Context Consumer) | -                        |
| OrderSummary   | heading, div-container, "Procced" Button                                          | (Context Consumer) | -                        |

**Checkout**

| Component         | Details                                                                                                 | State                                                                 | API (IT Bookstore)       |
|-------------------|---------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|--------------------------|
| Checkout          | "Back" button                                                                                           | (Context Consumer)                                                    | -                        |                       
| UserDetailsForm   | Order Form-Personal Details-First Name, Last Name, Email, Mobile No., Place Order Button, Order Summary | name,address,email,phone,nameError,addressError,emailError,phoneError | -                        | 
| PaymentSuccessView| image, heading, description, "Go To Home Page" Button                                                   | -                                                                     | -                        |
| Header            | links for pages Home, Book List, Cart                                                                   | (Context Consumer)                                                    | -                        |

**Not Found**

| Component      | Details                                          | State              | API (IT Bookstore)                   |
|----------------|--------------------------------------------------|--------------------|--------------------------------------|
| NotFound       | image,description,"Home Page" Link               | -                  | -                                    |                                   
| Header         | links for pages Home, Book List, Cart            | (Context Consumer) | -                                    |         

**App**

| Component      | Details             | State                                                                                                                                                         | API (IT Bookstore)    |
|----------------|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------- |-----------------------|
| App            | -                   | cartList (Context Povider), Context: cartList, addCartItem(), removeCartItem(),removeAllCartItems(),incrementCartItemQuantity(),decrementCartItemQuantity()   | -                     |                                                
 


## Resources
## Design files
Home, Book List, Book Details, Shopping Cart, Checkout
Reference: crossword.in

### APIS
Books, Book Details, Search
API Reference: api.itbook.store

### Third-party packages
Icons (react-icons)
Loader (react-loader-spinner)
Range slider (rc-slider)




