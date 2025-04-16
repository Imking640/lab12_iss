### Fixing the Buggy Code

- This code has 30 issues out of which 1 is no code in style.css . 
- The total marks for the entire codebase is 40, some issues have more marks than the other one. Style.css is of 5 marks. It will get scaled down to 20. All team members will get equal marks.
- You are suppose to work in teams of 4 or 5
- Each team member has to identify atleast 4 issues and fix atleast 4 issue. If someone doesn't do this, their marks get deducted.
- You are suppose to work on a git repository as collaborators

### What kind of bugs are there

- Bugs which will break your code
- Bugs might be a single word
- Bugs might be section of removed code
- Bugs might be section of unnecessary code
- Bugs might be useless files
- Bugs might be in the UI/UX of the pages
- Bugs might be in the api calls
- Bugs might be in the dependencies  

### submission format

- Make submissions on moodle
- Do not remove .git folder 
- Only 1 submission per team
- Submit it as Corrected_Code.zip

### Add the names of the members and roll numbers of your team below

- Anushka Sinha : 2024101141
- Pranjal Garg: 2024101108
- Kartik Gupta: 2024101091
- Pariza: 2024101015
- Vruddhi Shah: 2024113005

Frontend Issues:

    The .container element is missing in items.html, as hinted by a developer comment. This should be re-added to maintain consistent layout structure.

    In profile.html, the script path is incorrect. It references styles/profile.js instead of the correct scripts/profile.js.

    The index.html file uses an outdated XHTML 1.0 DOCTYPE and specifies ISO-8859-1 charset. This should be updated to HTML5 with UTF-8.

    analytics.html lacks a navigation menu, unlike other pages. The navigation should be added for consistency.

    In items.js, the Content-Type header is incorrectly set to "application/html"; it should be "application/json".

    news.html includes input and select elements for search but has no associated event handlers. These should be implemented.

Backend Issues:

    In items.py, the router is incorrectly defined as a plain dictionary. It should use APIRouter().

    The quiz.py file uses a GET method for answer submission. This should be changed to a POST route.

    items.py defines two conflicting @router.post("/") routes. These should be merged or separated with distinct paths.

    The Item model does not inherit from BaseModel, and the name field is incorrectly typed as int. It should be str.

    The delete_item function in items.py includes unnecessary parameters and tries to delete multiple items. It should accept only item_id and delete a single item.

    The main FastAPI app (main.py) does not import or include the users_router. This needs to be added to enable user-related endpoints.

    In quiz.py, input handling relies on a dictionary rather than using clearly defined path/body parameters. This should be corrected.

    The quiz question selection is hardcoded to always return the item at index 1. It should randomly select a question.

    analytics.py generates a plot but does not return it in the API response. Proper dependency injection and return handling are needed.

JavaScript Issues:

    In profile.js, the delete button uses the PATCH method instead of DELETE. This needs to be corrected.

    Some fetch calls are missing the baseURL, which leads to failed requests. All API calls should reference a consistent base URL.

    A mismatch exists between the element ID in profile.html (userCounts) and the JavaScript code (userCount). These need to be synchronized.

    In items.js, a POST request is mistakenly used for deletion. This should be a DELETE request.

    baseURL is inconsistently defined across JS files. It should be standardized across the entire codebase.

    Many JavaScript files lack proper error handling in their fetch calls. Error responses should be handled gracefully with user feedback.

Miscellaneous Issues:

    Several files contain hidden or unclear comments, like “Chocolate Question,” which may confuse developers and should be removed or clarified.

    User-related endpoints are not included in main.py. The appropriate router must be imported and added to the app.

    HTML structure and navigation elements vary between pages. These should be made consistent across the site.

    The quiz page is missing from the navigation menus on some pages. The link should be added for easy access.

    The search and source filter functionality in news.js is not implemented correctly and needs fixing.

    In profile.js, multiple fetch URLs are missing the required baseURL, leading to failed API calls.

    In analytics.py, the data properties are incorrectly accessed using names and usernames instead of name and username.

    Several JavaScript files do not handle failed API requests appropriately. Standardized error handling should be introduced.

    home.js exists but contains only comments and no functional code. It should either be implemented or removed.


