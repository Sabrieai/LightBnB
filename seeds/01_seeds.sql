INSERT INTO users (name,email,password)
VALUES ('Paula Rain', 'prstunt@TMZ.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Amy Payne', 'girlboss@thesun.org','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Connor King', 'artmajor@ocad.edu','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('James Java', 'blonde@espresso.gov','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(1,'Bathurst Bungalow','nice','https://cdn.vox-cdn.com/thumbor/xg30zbgw4Ms9rM_hZz4Z-iICBaY=/0x0:3686x2073/1820x1213/filters:focal(1549x743:2137x1331):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg','https://cdn.vox-cdn.com/thumbor/xg30zbgw4Ms9rM_hZz4Z-iICBaY=/0x0:3686x2073/1820x1213/filters:focal(1549x743:2137x1331):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg',100,1,2,3,'Canada','Bathurst','Toronto','Ontario','M5S 2R5',TRUE),
(2,'Bloordale Bachelor','cozy','https://www.domushousing.com/wp-content/uploads/2020/08/TypicalStudioSuite_Type1_Living_Area-scaled.jpg','https://www.domushousing.com/wp-content/uploads/2020/08/TypicalStudioSuite_Type1_Living_Area-scaled.jpg',50,0,1,0,'Canada','Bloor','Toronto','Ontario',' M6H 4A9',TRUE),
(3,'Bloordale 1bdrm','cozy','https://www.domushousing.com/wp-content/uploads/2020/08/TypicalStudioSuite_Type1_Living_Area-scaled.jpg','https://www.domushousing.com/wp-content/uploads/2020/08/TypicalStudioSuite_Type1_Living_Area-scaled.jpg',75,0,1,1,'Canada','Bloor','Toronto','Ontario',' M6H 4A9',TRUE);

INSERT INTO reservations (start_date,end_date,property_id,guest_id)
VALUES('2021-01-28','2021-02-28',1,2),
('2021-01-10','2021-01-15',2,4),
('2021-05-20','2021-05-05',3,3),
('2021-10-25','2001-11-02',3,1);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message)
VALUES(1,3,4,5,'good'),
(2,1,1,2,'ok'),
(3,3,3,5,'big'),
(4,2,2,3,'small');