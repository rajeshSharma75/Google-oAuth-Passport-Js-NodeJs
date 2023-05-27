   /** Requiring modules */
    const express         = require("express");
    const session         = require("express-session");
    const passport        = require("passport");  
    const GoogleStrategy  = require('passport-google-oauth20').Strategy  // Requiring GoogleStrategy class  
    const path            = require("path");
    require("dotenv").config();
    require("ejs"); 
    


    /**creating an app */
    const app = express() ;


    /** serve static files */
    app.use(express.static(path.join(__dirname,"public"))) ;

    /** Set ejs as view engine  */
    app.set('views', path.join(__dirname, 'public/views'))
    app.set("view engine","ejs");

    /** session middleware configuration  */
    app.use(session({
        secret:process.env.SESSION_SECRET,  // this helps express to create an unique session id while encrypting cookies to store information.
        resave:false, // don't save session if unmodified    
        saveUninitialized:true,
        cookie:{               // in development we use local server as http so if it'll we true now,
          secure:false,       // then session will not create cookies and store in browser coz cookies will only travle on secure connection as https,
          maxAge: 60000      // and thus it'll not store cookies on local server as http but it will on secure connection as https,
        },                  // The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }. we do not need to proactively write.but in              
    }))                    // production we need configure accordingly .  
       
    
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
                                   // when app.use(session({..})) invoked it creates an "req.session" object.
                                  // and when passport.session() invoked it add an additional object as "req.session.passport".

    

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
        callback(null,profile) ;  // we can save the profile data in our data base using a insertion query here if we want.
    }))
    
    /** after user successfully logged in passport will call to serializeUser to read and store the profile information to the user browser and create a session id  */
       passport.serializeUser(function(user,callback){    // it store all the user information in "req.session.passport.user.{..}"        
        callback(null,user) ;
       });

       passport.deserializeUser(function(obj,callback){  // after serialization it calls the deserialize user to attach user information in "req.user",
        callback(null,obj) ;                            //  it takes the last object of "req.session.passport.user.{...}" and attach to "req.user",
       });                                             //   which can be accesible anywhere in app in "req.user".
    


       /** requset handler for Home (login page) */
       app.get("/login",(req,res)=>{
        if(req.isAuthenticated()){           // Note : passport js provides an function "req.isAutenticated()" to check on every route whether 
            res.redirect("/dashboard");     //         the req is authenticated or not to access our pages, we can use it to our any req handler 
        }else{                             //  it returns true if the user is authentic else return false .
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
        req.logout(function (err) {          //  req.logout() provided by passport js to clear the both sessions object of "req.session.passport"
          if (err) {                        //  and the “req.user" object
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
      
      /** Listening our server at port 3000 */
       app.listen(3000 || process.env.PORT,()=>{
        console.log("Server is listening on port 3000");
       })