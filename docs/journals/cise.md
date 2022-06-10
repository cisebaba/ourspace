
## Jun 9,2022
Our fist goal was as soon as finishing mentorhip backend jumping into frontend. Amanda did some delete and put endpoints prep from the other night but couldn't made it run. We looked over it together and solved the problem! my approach was comparing the delete and put with FastApi docs and trivia-game-clues file. I am happy that we didn't have spend hours on these. 
I knew that it is not gonna be easy to implement the user authorization to the microservices since we didn't know how to handle it without polling user information. (Thanks god we have Curtis!) After a demonstration of handling it on the frontend and backend. I had my couple AHA on the mentorship. It is much more make sense if why we don't have to poll the user data since we are not letting people to reach the features for "users only" part. I feel more comfortable with JWT and cookies. 

## Jun 8,2022
We started to the accounts part with my team. We made a plan about how to implement user & authorization with the other microservices. We created our table but looked like instead of creating different microservices we added all the databases in the same table and ended up creating monolith accidently. Thanks Curtis! he helped give us a walk through for separating tables. 
We skimmed through the FASTApi's on the accounts microservice and tried to understand how we are gonna handle the authorization. After that we worked on the GET & POST request on new user database. 
After the class I jumped into Create Event and fixed the errors on (after submission refreshing the states and it was not creating location if it was exist.)
Today was my AHA moment day! again(Thanks Curtis!)When we were fixing things on database all the steps lightened me and understand why we could use foreign key on the other tables. 

## Jun 7,2022
Amanda and I worked on the mentorship microservice (left from the other night)
We make that microservice working on Docker container and figured fast api GET & POST working. I had spend some time on unknown issues on Docker and tables but figured them out eventually.
It is super nice to my progress on postgres and FastAPI. I am getting like to work on API more than Django. My AHA moment was in general settle the backend as an ongoing container. 

 ## Jun 6,2022
 We worked with Allisha and Starr the form from we left last week. I tried some experimental thinks like 2 hooks for one location and for one event to handleSubmit for both of them together. I thought we could handle it on the front-end but couldn't figured (at least I tried). I knew what we have to do and made my on point questions ready. After quick meeting with our group we jumped into working on the same thing with Mitch and he said we can handle two posts in one post view. I had my AHA moment in there and figured the code to some point. Thanks God Allisha love to play around and improved my code and made it work! 
 Since we know how the data type looks like when we get the list from the backend. We created the states and saw how hard the nested structures would be! Thanks Curtis to helping and showing us how to handle nested data submission on the front-end! This microservice took more time than we expect but I learned new things! 
 We spend our night with Amanda settle the Menthorship microservice database and docker file and planing the UI/UX. We planned to create FAST API on the back-end for this microservice. 
 
 ## Jun 3,2022
Today we worked on the front-ent events. I thought it would be easy because we did the similar things in conference go app but creating an application from 0 to 1 makes you to know and take care of every single details like we learned load data yesterday. I am very happy to create a front-end with React hooks.
as I user I feel like if we are not getting a lot of informative details it is not necessary to jump into page. so I thought people can click the details and the event card expand and show the details. My group team like the idea. 
Playing around UseState and UseEffect was fun and productive. Our list is working. In the form i realized we missed the point of Location and State has their own entities and can't only fetch it from events URL. My next goal is figure that out and make the form work.  

 ## Jun 2,2022
 We used group generator and I stayed at the same microservice with Starr and Allisha. We worked on a json file how to load the data of states and cities implement with with django. We got help from Mitch and figured how to load the json data to database. We made the Location & Events api CRUD done. 
 I had to go to a networking meeting and left 1 hour early.

 ## Jun 1,2022
 We divided to groups after figuring git issues about our branches. I was with Amanda and Starr working on events microservice. We spend most of our time on how should the Location Entity get the data from. It was a long research and discussion. We created our models I've jumped into the views to finish at least events part. 
 After stepped away I had my AHA! moment about npm installing us states suggestion which came from Starr. We were thinking about how could we attach it with the api and out Location entity. While spending so much time on the same think, I can't expand my perspective but finally got the logic in the way of thinking backwards. As we handled the forms it is gonna create a state and the state will mount it with api and post will handle adding into database. Looking forward to try it tomorrow! 

 ## May 31, 2022
 I created a file structure tree for team to help to visualize the project as like the other given repos on the weekend. It helps me to visualize and create a starter point and I was sure it will help to my team too. I did some quick research on the weekend to find a starter point of a project. It's been a long time since we haven't start our projects on our own and find out if we want to use django get back into the module 1 commands(it was good to refresh my memory) Find out some helpful link about react app installation but ended up trivia-game-testable readme file super helpful. 
 Our team spend our time find the best name for our project. After voting session, we decided to start first microservice on Django so started project. First microservice Docker dev file, docker compose file and the last react app is created. We got help and had super productive meeting with Curtis. We ended our day with changing name on our gitlab repo.  

## May 27, 2021
 While I was doing the changes on my branch we did meeting and I shared my screen. We discuss about unmatched fields and put thing in the order. Decided to create id for voting and attach it with the user. 
 We spend our meeting mostly on the architecture and road mapping. We started on docker file but couldn't be successful on it yet. 


