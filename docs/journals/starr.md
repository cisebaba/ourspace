
## journal format
* The date of the entry (Most Recent at Top)
* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

# June 10, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>  
        I worked with Allisha today to write some SQL to handle calculating the averages. This took us a little while to figure out but was a great learning experience because I learned a lot about using pgAdmin and had a pretty enlightening conversation with Chris and Jeff about how to use the Group By method. 
        </li> 
        <li>
        I couldn't stop thinking about wanting our data to display on the front end on our list reviews page so after mandatory fun I worked on fixing that problem and it turned out to be due to naming conventions and needing to update our models. I ended up creating a reviews class that had the "throw away" data names so I could fetch them and then send them to the front end. After that It was super easy to get the page to render what I wanted. Now I really want to figure out how to map over the star component in order to display the averages in the form of stars on the screen. I also want to get the form working. 
        </li>
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        I am really glad we decided to let the backend handle the averaging of our data rather than trying to do it all in the frontend because it is so much more efficient to do it in the backend. Although I am sad to delete all the code I worked on yesterday writing javascript functions to average our data I am glad I learned a better way to do it by using aggregate functions.
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        One of my big ah-ha moments today was just finally feeling like I understand how to use group by and pgAdmin. I also learned that the reason %s worked instead of %d is because the 
        </li>
    </ul>
</ul>



# June 9, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>  
        I worked with Allisha today on the reviews feature. We fixed some errors in our SQL and started working on the frontend. We got some stars for the rating feature to show up on the screen so that was super exciting. We also started thinking about how to average the ratings. I wrote a few functions to handle this but after talking with Chris learned that it would be better to do this on the backend with aggregate functions. 
        </li> 
    </ul> 
  <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        We spent a lot of time trying to figure out why our insert functions were not working on the back end when wanting to put in the value of a integer. Eventually we figured out using %s worked which surprised me because I orginally thought that reserved for strings and that you were supposed to us %d for integers. There was a sad moment when I was talking to Chris about the database and getting our averages to display on the frontend. What I orginally wanted to to do was get all the data from the frontend and then send it through the following functions to average it and then display it on the screen. I was not thinking about the constraints of this slowing down the frontend and how to handle the possibility of two different people posting reviews at the same time and that causing the average to be out of date for one or both parties. I am looking into handling the averaging capacity on the backend.
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        My Ah-ha moment was thinking through how to write some functions to handle the data, sort it and then average it the way I wanted. We unfortunately are not going to be using this code but I am very proud of myself for thinking through this problem and writing working code that could handle it. It felt like my very own leetcode problem! 
        ``` 
        NEED TO FIGURE OUT HOW TO FORMAT CODE IN MARKDOWN
        function getValues(data, key){
        let values = [] ;
            for (let i = 0; i < data.length ; i++){
                if(data[i].hasOwnProperty(key)){ 
                    values.push(data[i][key]);
                } 
            }
            return values
        }
        ```
   
</ul>

# June 8, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>  
        We worked on the users stuff as a group today. We ended up separating the tables for each feature into their own databases. 
        We also decided to change the table for user and have a separate profile table to hold specific user information that isn't just the username/password. 
        </li> 
    </ul> 
<li> Reflection : </li>
    <ul>
        <li> 
        </li> 
    </ul>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        </li>
    </ul>
</ul>

# June 7, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li> 
        I worked on the company reviews microservice with Allisha. We decided to use a postgres database to handle our data so we set that up. 
        </li> 
    </ul> 
<li> Reflection : </li>
    <ul>
        <li> 
        </li> 
    </ul>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        </li>
    </ul>
</ul>

# June 6, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li> 
        I worked with Cise and Allisha on the frontend for the conference/events. We ended up having to reconfigure some our views to handle the creation of a new location while creating a new event. We also learned a lot about nesting data and how to format our form on the frontend. 
        </li> 
    </ul> 
<li> Reflection : </li>
    <ul>
        <li> 
        </li> 
    </ul>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        </li>
    </ul>
</ul>


# June 3, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li> 
         I worked with Cise and Allisha on the frontend for the conference/events. We created a page that lists all the events and a page with a form to create an event. We spent a long time trying to get the states drop down to work and we were successful. The forms page does not yet actually create a new event.  
        </li> 
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        I learned a lot about how react hooks work and the difference between class based and function based components. 
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        We kept running into an error that there was an issue with a file that we renamed but the error was showing the orginal file name. We deleted the file and rebuilt it and then it dawned on us that we needed to rebuild the docker container because when docker orginally created the image it did so with a very specific file layout and wasn't recongizing our changes. The error went away after we rebuilt the image.
        </li>
    </ul>
</ul>


# June 2, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>
        I worked with Cise and Allisha on conference/events, we decided to ditch the idea of using an api for location information because we couldn't find one that was being maintained. Instead we created a JSON file to hold our data. 
        </li> 
        <li>
        I worked with Allisha on conference/events. We finished the views and updated the create location model to have a default photo if the user doesn't provide one. The backend for conference/events is done!
        </li> 
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        I learned a lot about how to store data on the backend and then load that data into your container. We are considering creating a cities Json file to store data but for now are leaving that field up to the user to define. 
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        I have issues with commas at least once during every project and today was that day! I couldn't figure out why my data wouldn't load into my docker container and I kept getting a 'Deserialization Error Problem installing Fixture' which turned out to be because of a rouge comma in the json.py file. 
        </li>
    </ul>
</ul>



# June 1, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>
        We as a group set up an additional layer of security on git by setting up additional branches on git. 
        </li>
        <li> 
        I worked with Amanda and Cise to set up conference/events but we ran into a lot of issues trying to set up the APIs. 
        </li> 
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        Finding an api that is formatted the way we want and is currently being maintained proved difficult. We also ran into issues when considering how we wanted to store this information in our database. We ultimately decided it might be best to allow people to manually put in the data as a string and then call an external api on the frontend to Query match in order to eventually filter events. This will allow us to move forward and potentially work around some of the data integration issues when using a third party api.
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        I realized the benefits to having your data stored on the backend and not stored in the frontend/browser. By utilizing the backend you increase security and also reduce the load your webpage has on a users computer.
        </li>
    </ul>
</ul>

# May 31, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>
        We worked together today to decided on a website name of OurSpace, finish setting up docker, made a django project/application for events and set up our frontend application using react. 
        </li> 
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        Some challenges from today was setting up the docker files and making sure our react application was using the volume we wanted. We ultimately figured it out and was overall a great learning experience.
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        A potential roadblock I see for us is when we add more microservices/django apps to handle other features and getting those all set up in docker correctly.
        </li>
    </ul>
</ul>

# May 27, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li>
        Our Team spent most of today working together to make some final decisions on the application architecture and implementing changes based on the feedback we received from Chris and Curtis.
        </li> 
    </ul> 
    <br></br>
<li> Reflection : </li>
    <ul>
        <li> 
        Some highlights of discussion were the importance of utilizing a ubiquitous language. Deciding that we are going to try to use both MongoDB and a Relational database. We are leaning more towards trying to use react to build the bulk of the application. We also identified some potential roadblocks surrounding the implementation of some of our features such as Upvoting and execution of the mentorship page.
        </li> 
    </ul>
    <br></br>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        I was surprised to learn that some of our more conceptually simple features might end up being the hardest to implement for example, the Upvote feature and Search feature. I am excited to see how we end up tackling those blocks.
        </li>
    </ul>
</ul>

