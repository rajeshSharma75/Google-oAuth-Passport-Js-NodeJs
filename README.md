 # Google oAuth Using Passport.js Library in Node Js
 > By Rajesh Sharma 

 </br>

 ### To use google oAuth we need to follow this.

 - Before your application can make use of Sign In With Google, you must register your app with Google. 
 - This can be done in the APIs & Services page of the Google Cloud Platform console. 
 - Once registered, your app will be issued a client ID and secret which will be used in the strategy configuration.

 ### To register follow this .
 - Go to this url : https://console.cloud.google.com/ </br>
 ![sign_in_image](./public/images/1sign_in_page.png)
 - Sign in with your gmail id .
 ![2after_sign_in_page](./public/images/2after_sign_in_page.png)
 ![2after_sign_in_page](./public/images/3creating_new_project.png)
 ![2after_sign_in_page](./public/images/4giving_project_name.png)
 ![2after_sign_in_page](./public/images/5select_project.png)
 ![2after_sign_in_page](./public/images/6explore_and_enable_api.png)
 ![2after_sign_in_page](./public/images/7choose_credentials.png)
 ![2after_sign_in_page](./public/images/8create_credentials.png)
 ![2after_sign_in_page](./public/images/9select_oauth_client_id.png)
 ![2after_sign_in_page](./public/images/10configure_consent_screen.png)
 ![2after_sign_in_page](./public/images/11choosing_external.png)
 ![2after_sign_in_page](./public/images/12app_name_support_email.png)
 ![2after_sign_in_page](./public/images/13app_domain.png)
 ![2after_sign_in_page](./public/images/14developer_contact_information.png1)
 ![2after_sign_in_page](./public/images/15add_scopes.png)
 ![2after_sign_in_page](./public/images/16selected_scope.png)
 ![2after_sign_in_page](./public/images/17update.png)
 ![2after_sign_in_page](./public/images/18save_and_continue.png)
 ![2after_sign_in_page](./public/images/19add_test_users.png)
 ![2after_sign_in_page](./public/images/20save_and_continue.png)
 ![2after_sign_in_page](./public/images/21back_to_dashboard.png)
 ![2after_sign_in_page](./public/images/22oauth_client_id_application_type.png)
 ![2after_sign_in_page](./public/images/23authorised_javascript_origins.png)
 ![2after_sign_in_page](./public/images/24redirect_url.png)
 ![2after_sign_in_page](./public/images/25oauth_client_credentials_download.png)




  After creating oAuth credentials 

  install npm packages 
  ```javascript
  
  PS C:\Users\rs\Desktop\google_oauth_using_passport_node_js>$ npm i --save express 
                                                             $ npm i --save express-session 
                                                             $ npm i --save passport 
                                                             $ npm i --save passport-google-oauth20 
                                                             $ npm i --save ejs
                                                             $ npm i --save dotenv
  ```

  
  

  Note : Chances are you will go through an error as "401. That’s an error. Error: invalid_client The OAuth client was not found" 
  solution : Check your dotenv (.env) file and make sure there would be no comma or semicolon there at the end of any line.

 > ## Let's understand how passport Js framework work first .
  Passport js consist of two seprate library.
  First the "Passport Js" and the second is "Stretegy" library .

  ### Login process with Passport js happens in two parts.
  - Passport.js library - manage the session.(always required)
  - Strategy library - authentication or handle login process.(depends which strategy you want to use)  

   Passport.js library : It is always required, you must install this. It connect with "express-session" library to store the user information in req.session object. It works with already logged in users.It doesn't play any role in authentication of user.
   It maintains the session to store the authenticated information of user to authenticate again and logged in directely if previously they authenticated themself and not logged out yet.  

  Stretagy library : It is like the which plateform authentication you want to authenticate by, for example - google, facebook, twitter,local etc. 

  When you authenticate user via user_name and password which you have saved in your database. this is known as "local strategy"
  
  ```javascript
    
    //  To use Local strategy authenticate user by user_name and password
      $ npm install passport-local

    // To use Google strategy install npm package
      $ npm i --save passport-google-oauth20    // (used in current repo. )

    // Another npm package for Google strategy 
      $ npm install passport-google-oidc

    // To use Facebook strategy install npm package
     $ npm install passport-facebook

    // To use Facebook strategy install npm package
     $ npm install passport-twitter

  ```

  With strategy we authenticate the request whether it is authenticate or not by the method(mechanism) provided by particular strategy.
  They also provide the necessary data of paricular user to verify them,or store them in our database or use in our application to show their name,email etc. 

  Have you ever noticed when you logged in with your any email using google oauth on any application,How do they welcome you with your name without asking to you and says to complete your profile or do it later on.

  How do they get your email id, photos,name and other general information, they get it from the the strategy you use to login like : login with google or facebook or twitter etc. 




