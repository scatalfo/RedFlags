# RedFlags

Red Flags is all about the playful exploration of relationships. Share your insights, cast votes, and uncover red flags with a touch of humor.

## Demo
https://redflags-66580.web.app/

## Tech Stack  

**Client:** React, Vite, Codux, TypeScript

**Server:** Firebase

## Features  

- Vote on red flags
- Data visualization
- Anonymous authentication to prevent repeat voters
- Votes stored in the backend

## Lessons Learned  

- I learned a lot about the React ecosystem and how to use it to build a modern web app.
- I found CSS styling to be more painful than initially expected. It takes more work than I would have imagined to make all the buttons look how I want them to!
- I learned about deploying a React app to Firebase, specifically, Vite, tends to do things a little bit differently, so there was a small learning curve there.
- I managed to reduce the initially very high amount of database reads by caching the initial data from firebase, and using that for the rest of the session. This was a big win for performance client side, and especially server side, as it reduced the number of reads per full session from 900 to 30 (assuming there were 30 red flags in the database).
- I learned about the new modular Firebase API for web, and how to leverage anonymous authentication to create a frictionless user experience.

## Inspiration

I recently saw a funny graphic and wanted to expand upon and crowdsource the idea:
![Red Flags](src/assets/inspo.jpeg)

## License  

[MIT](https://choosealicense.com/licenses/mit/)  
