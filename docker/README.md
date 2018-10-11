# How to run docker  
-Install [docker](https://www.docker.com/get-started).  
  -If you have Windows 10 Home Edition install [docker toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)   
-Within the docker directory run the following command `docker-compose up -d`.  
  -The first time this is run docker will download the necessary images.  This will take some time as they are hundreds of MB in size.  
-Open a browser and navigate to [http://localhost:8080](http://localhost:8080)  
  -If you are on windows you will need to specify the ip address of the container.  Find it with this command `docker-machine ip`  
  -You should now see the TaaG webapp.  
-To verify that the mysql docker is running use the following command `mysql -u webapp -ptaag -h localhost --protocol=tcp`  
  -If you are able to connect to mysql it should be good but feel free to SELECT some tables to verify.  

-To stop the containers run the following command in the docker directory `docker-compose stop` or `docker-compse down --volumes` to remove the copied volumes after shutdown.  

## Commands useful for troubleshooting docker  
-`docker logs <container_name>`  
-`docker ps`  
-`docker exec -it <container_id> /bin/bash`  
-`docker-machine ip` (Windows OS only)  

