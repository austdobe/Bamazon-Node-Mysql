drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products(
    item_id int auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(100),
    price decimal(10,2) not null, 
    quantity int not null,
    primary key(item_id)
);

insert into products (product_name, department_name, price, quantity) values ("Pencil", "Office Supply", 10.99, 150), ("Baseball caps", "Clothing", 20.39, 100), ("Couch", "Home Goods", 399.99, 100), ("Baseball Glove", "Sporting", 39.99, 25), ("Tennis Shoe", "Footwear", 60.99, 50), ("Wireless Headphones", "Electronics", 99.99, 60);

select * from products