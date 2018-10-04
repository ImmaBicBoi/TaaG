# How to run Docker

-After installing [docker](https://www.docker.com/get-started).  
-Within the docker directory run the following command "docker-compose up -d".  
  -The first time this is run docker will download the necessary images.  This will take some time as they are hundreds of MB in size.  
-Open a browser and navigate to [http://localhost:8080](http://localhost:8080)  
  -You should see the default TaaG page.  

-To stop the containers run the following command in the docker directory "docker-compose stop --volumes"  


## Commands Useful For Trouble Shooting Docker  
-docker logs <container_name>
-docker ps
-docker exec -it <container_id> /bin/bash

