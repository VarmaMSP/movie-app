# movie-app

**[Demo](http://ec2-13-233-84-74.ap-south-1.compute.amazonaws.com/)**


**Local Seup**

1.  Clone repo

	`> git clone https://github.com/VarmaMSP/movie-app.git`
  
	`> cd movie-app`
	

1.  Setup up database by executing `docs/schema.sql`

	`mysql > source <path_to_repo>/docs/schema.sql`
	
1.  Edit `server/.env` with TMDB api key and db credentials.

1.  Install dependecies and build frontend.

	`> yarn setup`
  
	`> yarn build`

1. Run server and visit http://localhost:8080

	`> node server`

