
## journal format
* The date of the entry (Most Recent at Top)
* A list of features/issues that you worked on and who you worked with, if applicable
* A reflection on any design conversations that you had
* At least one ah-ha! moment that you had during your coding, however small

# June 6, 2022
<ul>
<li> Features/Issues Worked On : </li>
    <ul>
        <li> 
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
<li> Reflection : </li>
    <ul>
        <li> 
        I learned a lot about how react hooks work and the difference between class based and function based components. 
        </li> 
    </ul>
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
<li> Reflection : </li>
    <ul>
        <li> 
        I learned a lot about how to store data on the backend and then load that data into your container. We are considering creating a cities Json file to store data but for now are leaving that field up to the user to define. 
        </li> 
    </ul>
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
<li> Reflection : </li>
    <ul>
        <li> 
        Finding an api that is formatted the way we want and is currently being maintained proved difficult. We also ran into issues when considering how we wanted to store this information in our database. We ultimately decided it might be best to allow people to manually put in the data as a string and then call an external api on the frontend to Query match in order to eventually filter events. This will allow us to move forward and potentially work around some of the data integration issues when using a third party api.
        </li> 
    </ul>
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
<li> Reflection : </li>
    <ul>
        <li> 
        Some challenges from today was setting up the docker files and making sure our react application was using the volume we wanted. We ultimately figured it out and was overall a great learning experience.
        </li> 
    </ul>
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
<li> Reflection : </li>
    <ul>
        <li> 
        Some highlights of discussion were the importance of utilizing a ubiquitous language. Deciding that we are going to try to use both MongoDB and a Relational database. We are leaning more towards trying to use react to build the bulk of the application. We also identified some potential roadblocks surrounding the implementation of some of our features such as Upvoting and execution of the mentorship page.
        </li> 
    </ul>
<li> Ah-Ha Moment : </li>
    <ul>
        <li>
        I was surprised to learn that some of our more conceptually simple features might end up being the hardest to implement for example, the Upvote feature and Search feature. I am excited to see how we end up tackling those blocks.
        </li>
    </ul>
</ul>

