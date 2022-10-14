 # how to run it locally
 
  # step 1
 spin mongo container first

    $ docker run -d --rm --name=mongodb -p 27017:27017 mongo
  
  or 
  Run a local instance of mongodb on your machine and replace the env MONGO_CONNECTION_URI variable 
  with your db connection for this service
   # step 2

 npm run start:dev

 done !!


 # how to run it on docker

  # step 1
  docker-compose build web3-service

 # step 2 
  docker-compose up web3-service

  done !!