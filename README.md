# Product Cart System
- This project is a Product Cart System built using Laravel with MySQL as the database. It provides APIs and CMS views to manage products and cart items.

## TASK DETAILS

### PHASE 1
- Product CRUD operations (Create, Read) with multiple image uploads.
- Store image paths as **comma-separated text** in the product table.
- API Endpoint to list all products with paginated response.
- Products images are displayed as **array format** in the response.

### PHASE 2
- Add products to cart using **POST API** with hardcoded user ID (**1**).
- List cart items with **GET API**.
- CMS UI to display cart products with product name, price, and images.
- Designed using **Tailwind CSS** for better UI/UX..

### API Documentation

#### 1. Product API GET 
```
curl --location 'http://127.0.0.1:8000/api/products'
```

```json
{
  "status": 201,
  "data": {
    "current_page": 1,
    "data": [
   {
                "id": 1,
                "name": "Tablet",
                "price": "25000.00",
                "images": [
                    "/storage/product_images/1741365657_tablet.jpg"
                ],
                "created_at": "2025-03-07T16:40:58.000000Z",
                "updated_at": "2025-03-07T16:40:58.000000Z"
            },
            {
                "id": 2,
                "name": "Mobile",
                "price": "50000.00",
                "images": [
                    "/storage/product_images/1741365698_mobile.png"
                ],
                "created_at": "2025-03-07T16:41:38.000000Z",
                "updated_at": "2025-03-07T16:41:38.000000Z"
            },
            {
                "id": 3,
                "name": "Headphone",
                "price": "5000.00",
                "images": [
                    "/storage/product_images/1741365717_headphone.jpg"
                ],
                "created_at": "2025-03-07T16:41:57.000000Z",
                "updated_at": "2025-03-07T16:41:57.000000Z"
            },
            {
                "id": 4,
                "name": "Camera",
                "price": "100000.00",
                "images": [
                    "/storage/product_images/1741365731_camera.jpg"
                ],
                "created_at": "2025-03-07T16:42:11.000000Z",
                "updated_at": "2025-03-07T16:42:11.000000Z"
            },
            {
                "id": 5,
                "name": "Earphone",
                "price": "1000.00",
                "images": [
                    "/storage/product_images/1741365746_earphone.png"
                ],
                "created_at": "2025-03-07T16:42:26.000000Z",
                "updated_at": "2025-03-07T16:42:26.000000Z"
            }
    ],
    "total": 5
  }
}
```

#### 2. Product API POST - 
```
curl --location 'http://127.0.0.1:8000/api/products' \
--form 'name="Earphone"' \
--form 'price="1000"' \
--form 'images=@"earphone.png"'
```

```json
{
  "status": 201,
  "data": {
    "message": "Data has been added successfully"
  }
}
```

#### 3. Cart API POST - 
```
curl --location 'http://127.0.0.1:8000/api/cart' \
--form 'user_id="1"' \
--form 'product_id="1"'
```

```json
{
  "status": 201,
  "data": {
    "message": "Product has been added to cart successfully"
  }
}
```

#### 4. CMS UI Screenshot

![image](https://github.com/user-attachments/assets/652297d4-e239-4f6e-a782-7b34810d9d70)


### Instructions

- **MySQL database file** is included in the project folder at `product_database.sql`.
- **Postman collection** is included in the project folder at `Laravel Task.postman_collection.json` to test APIs easily.

1. Clone the project repository.
2. Install dependencies:
```bash
composer install
```
3. Set up **.env** file with database credentials.
4. Run migrations:
```bash
php artisan migrate
```
5. Link Storage:
```bash
php artisan storage:link
```
6. Start the application:
```bash
php artisan serve
```

