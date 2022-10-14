# how to run it locally

# step 1

spin mongo container first

    $ docker run -d --rm --name=mongodb -p 27017:27017 mongo

# step 2

npm run start:dev

done !!

# how to run it on docker

# step 1

docker-compose build shop-service

# step 2

docker-compose up shop-service

done !!
