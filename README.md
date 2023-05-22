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
  
  PS C:\Users\rs\Desktop\google_oauth_using_passport_node_js> npm i --save express 
                                                              npm i --save express-session 
                                                              npm i --save passport 
                                                              npm i --save passport-google-oauth20 
                                                              npm i --save ejs
  ```

  
  

  Note : Chances are you will go through an error as "401. That’s an error. Error: invalid_client The OAuth client was not found" 
  solution : Check your dotenv (.env) file and make sure there would be no comma or semicolon there at the end of any line.

