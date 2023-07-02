# CODE CHALLENGE PHASE 1 WEEK 3

# Description

The code challenge for week three, I worked on Flatdango. It allows a user to purchase movie tickets that are being shown in our theatre. A local API has been used to fetch and store our data in. The frontend has been built with HTML, CSS and JavaScript. The project's core deliverables are described below:

# Project Guidelines

The project should conform to the following:

# Core Deliverables

As a user, I can:

1. See the first movie's details, including its **poster, title, runtime,
   showtime, and available tickets** when the page loads. The number of
   available tickets will need to be derived by subtracting the number of
   `tickets_sold` from the theater's `capacity`. You will need to make a GET
   request to the following endpoint to retrieve the film data:

   GET /films/1

   Example Response:
   {
   "id": "1",
   "title": "The Giant Gila Monster",
   "runtime": "108",
   "capacity": 30,
   "showtime": "04:00PM",
   "tickets_sold": 27,
   "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
   "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
   }

2. Buy a ticket for a movie. After clicking the "Buy Ticket" button, I should
   see the number of available tickets decreasing on the frontend. I should not
   be able to buy a ticket if the showing is sold out.

3. When a ticket is purchased, persist the updated number of `tickets_sold` on
   the server. Remember, the frontend shows the number of available tickets
   based on the `tickets_sold` and the `capacity`, so only the `tickets_sold`
   should be updated on the backend when a ticket is purchased. You will need to
   make a request that follows this structure:

   ```txt
   PATCH /films/:id

   Request Headers: {
     Content-Type: application/json
   }

   Request Body: {
     "tickets_sold": 28
   }
   ----
   Example Response:
   {
      "id": "1",
      "title": "The Giant Gila Monster",
      "runtime": "108",
      "capacity": 30,
      "showtime": "04:00PM",
      "tickets_sold": 28,
      "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
      "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
   }
   ```

4. Delete a film from the server. Add a delete button next to each film in the
   `ul#films` menu. When the button is clicked, remove the film from the list
   and also delete the film on the server:

   ```txt
   DELETE /films/:id

   Example Response:
   {}
   ```

# Project Setup

To run the code challange, follow these steps:

1. First you need to have the json server installed in your laptop globally by running(for linux users):

   ```sh
   sudo npm install json-server.
   ```

2. Clone the repository:

```sh
git@github.com:Noelle-Wavinya-Maingi/Week-3-Phase-1-Code-Challenge.git
```

3. Navigate to your local directory: cd nameofthedirectory

4. Run the following to start your server:

```sh
json-server --watch db.json
```

5. To test if the server is up and running paste this on a new tab:

```sh
http://localhost:3000/films
```

5. Execute the program on a webpage: index.html.

# Author

The author of the code challenge solution is Noelle Maingi.

# Licence

This code challenge is under the MIT licence. For more on the licence, open [LICENCE](LICENCE)
