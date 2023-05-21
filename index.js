   /** Requiring modules */
    const express         = require("express");
    const session         = require("express-session");
    const passport        = require("passport");  
    const GoogleStrategy  = require('passport-google-oauth20').Strategy  // Requiring GoogleStrategy class  
     require("ejs"); 
    const path            = require("path");
    require("dotenv").config();
    


    /**creating an app */
    const app = express() ;


    /** serve static files */
    app.use(express.static(path.join(__dirname,"public"))) ;

    /** Set ejs as view engine  */
    app.set('views', path.join(__dirname, 'public/views'))
    app.set("view engine","ejs");

    /** session middleware configuration  */
    app.use(session({
        secret:process.env.SESSION_SECRET,  // this helps express to create an unique session id to store information
        resave:false,     
        saveUninitialized:true,
        cookie:{secure:false,maxAge: 60000},   // in development we use local server as http so if it'll we true now, 
        }))                     //then session will not create cookies and store in browser coz cookies will only travle on secure connection as https,
                               // and thus it'll not store cookies on local server as http but it will on secure connection as https,
                              //however for let's keep it as false for development
    
    
    /** Initialize passport */                      
    app.use(passport.initialize()) ;  // init passport on every route call of our app.  
    
   /** As the user navigates from page to page, the session itself can be authenticated using the built-in session strategy. 
     * Because an authenticated session is typically needed for the majority of routes in an application, 
     * it is common to use this as application-level middleware, after session middleware.
     * app.use(passport.authenticate('session'));
     * This can also be accomplished, more succinctly, using the passport.session() alias.  */
     app.use(passport.session())  ;   // allow passport to use "express-session . Note : before this statement 
                                     //you must configure the session middleware and order of these 
                                    //should be same first,passport.initialize() then passport.session()

    

    let oAuthOption = {
        clientID     : process.env.CLIENT_ID,
        clientSecret : process.env.CLIENT_SECRET,
        callbackURL  : process.env.CALLBACK_URL, 
    } ;

    /** connect our app to google oAuth
     * GoogleStrategy(option,callback_func)  
     */ 
    passport.use(new GoogleStrategy(oAuthOption,function(accessToken,refreshToken,profile,callback){
        // Use the profile information to authenticate the user
       // console.log(profile);
        callback(null,profile) ;  // we can save the profile data in our data base using a insertion query here if we want.
    }))
    
    /** after user successfully logged in passport will call to serializeUser to read and store the profile information to the user browser and create a session id  */
       passport.serializeUser(function(user,callback){    // it store all the user information in (req.user) which we can access to show data on rendering any page.         
        callback(null,user) ;
       });

       passport.deserializeUser(function(obj,callback){
        callback(null,obj) ;
       });
    


       /** requset handler for Home (login page) */
       app.get("/login",(req,res)=>{
        if(req.isAuthenticated()){
            res.redirect("/dashboard");
        }else{
        res.render("login.ejs") ;
        }
       })


     /** once user click on button of login page, handler for that route and serving option to login via google mails */
        app.get('/auth/google',passport.authenticate('google',{scope :["profile","email"]})) ;  // Authenting with google and in scope- getting user's profile and email 
                                                                                             // Scope means what data we want once the user get authenticated or logged in.
                                                                                            // passport.authenticate is a middleware to authenticate user 
                                                                                           // it has diffrents strategy as, google,local,facebook,twitter,etc.
      
                                                                                        

    /** callbackURL handler after user successfully logged in */
        app.use("/auth/google/callback",passport.authenticate('google',{failureRedirect:"/login"}),(req,res)=>{       // in callback we again check and make sure it is authenticated ,            
            res.redirect("/dashboard")  ;                                                                            // if it fails to authenticate redirect to login page again. else redirect to dashbord
        }) ;
                                                                                                     

    /** req handler for dashboard */  
      app.get("/dashboard",(req,res)=>{   
        if(req.isAuthenticated()){       //passport provides a method in req to check if the request is authenticated or not before serving the any page after login.
           res.render("dashboard.ejs",{
            user : req.user,
        });
        }else{
            res.redirect("/login");
        }
      })  

    /** req handler for logout  */
      app.get("/logout", (req, res) => {
        req.logout(function (err) {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/login");
          }
        });
      });

    
      /** Handling non-matching request with 404 page not found */
      app.all("*",(req,res)=>{
        res.status(404).send("Page not found");
       
      })
      
      
       app.listen(3000 || process.env.PORT,()=>{
        console.log("Server is listening on port 3000");
       })