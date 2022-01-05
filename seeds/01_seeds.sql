--Create three or more rows in each table.--
--Get as creative as you want when inserting data.
--Use the examples below if you want help coming up with entries.
--Use $2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u. as every users password. It's the word password hashed with bcrypt.
--For the text columns, don't worry about adding long descriptions or messages. Just use the word description or message.--

INSERT INTO users (name,email,password)
INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
INSERT INTO reservations (start_date,end_date,property_id,guest_id)
INSERT INTO property_reviews (guest_id,property_id,reservations_id,rating,message)