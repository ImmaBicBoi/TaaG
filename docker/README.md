# How to run docker  
- Install [docker](https://www.docker.com/get-started).  
  - If your machine doesn't support docker install [docker toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)   
- Within the <git_path>/Taag/docker directory run the following command `docker-compose up -d`.  
  - The first time this is run docker will download the necessary images.  This will take some time as they are hundreds of MB in size.  
- Open a browser and navigate to [http://localhost:8080](http://localhost:8080)  
  - If you are on windows you will need to specify the ip address of the container.  Find it with this command `docker-machine ip`  
  - You should now see the TaaG webapp.  
- To verify that the mysql docker is running use the following command `mysql -u webapp -ptaag -h localhost -P 3310 --protocol=tcp`  
  - If you are able to connect to mysql it should be good but feel free to SELECT some tables to verify.  
  - You can connect to the mysql container from the tomcat container after running the following commands:  
    - `atp-get update`  
    - `atp-get install mysql-client`
- To verify the back-end api webservice is running use the following command or navigate to the URL in a browser `curl 'http://localhost:8080/Taag/service/person/1'`.  
    - You should see a JSON response.  
    - It may take a few seconds for the web service to start up and become responsive.  Please wait a few seconds after starting the docker container to call the web service.  

- To stop the containers run the following command in the <git_path>/Taag/docker directory `docker-compose stop` or `docker-compse down --volumes` to remove the copied volumes after shutdown.  

## Commands useful for troubleshooting docker  
- `docker ps` (This command show the container id, name, what ports are open, etc.)  
- `docker logs <container_name>`  
- `docker exec -it <container_id> /bin/bash`  
- `docker-machine ip` (Windows OS only)  
