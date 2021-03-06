# Changelog

### milstone 2.0
![v2.0](https://github.com/moonblade/watermark/raw/dev/assets/archv2.0.png)

todo:
done:
- start each service in a seperate docker
- expose only userInterface api to outside of cluster
- use docker compose

### mileston 1.2
todo:
add graphql to document service

done:
refactor each service into its own independant thing

### milestone 1.1

v1.1.1

![v1.1](https://github.com/moonblade/watermark/raw/dev/assets/archv1.1.1.png)

v1.1

![v1.1](https://github.com/moonblade/watermark/raw/dev/assets/archv1.1.png)

making microservices

todo :

done:
- use grpc communication
- worker should get work from pubsub queue and not query db
- setup a logging framework - using debug, is okay for nonw
- lint it
- each service should have its own db, and not shared db
    - document and status seperated out

### milestone - 1
minimum viable app with functionality
![v1.0](https://github.com/moonblade/watermark/raw/dev/assets/archv1.0.png)

#### 1.0.6
- Add retriever to get the document

#### 1.0.5
- Add a status api end point that gets status from ticket

#### 1.0.4
- create a worker thread that finds pending items in db, and calls watermaker every x ticks

#### 1.0.3
- modify watermarker to accept uuid, fetch from db, watermark and reinsert

#### 1.0.2
- add a db instance from mlab and connnect to it
- add a user interface that will give doc, add it to db, and return a ticket

#### 1.0.1
- create a watermarker that takes in a document, sync, returns watermarked document
