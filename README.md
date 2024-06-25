# Kitchen API

This project implements a RESTful API for managing authentication, vendors, customers and menus.

## API Documentation

### Authentication Routes

#### 1. POST /api/v1/auth/register-customer

-   **Description:** Endpoint for customer account registration.
-   **Parameters:**
    -   Body:
        ```json
        {
            "email": "lilstex@gmail.com",
            "password": "password"
        }
        ```
-   **Response:**
    -   Status 201 - Successful registration
        ```json
        {
            "status": true,
            "message": "Account registered successfully",
            "data": {
                "id": 1,
                "email": "johndoe@gmail.com",
                "createdAt": "2024-06-25T16:07:35.787Z",
                "updatedAt": "2024-06-25T16:07:35.787Z"
            }
        }
        ```

#### 2. POST /api/v1/auth/vendor-login

-   **Description:** Endpoint for vendor login.
-   **Parameters:**
    -   Body:
        ```json
        {
            "email": "resa@gmail.com",
            "password": "password"
        }
        ```
-   **Response:**
    -   Status 200 - Successful login
        ```json
        {
            "status": true,
            "message": "Login successful",
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5MzMxNzAzfQ.OqttAVTrzZYgJFbS3a7kiDA139-AvBU9oFFhe7STwZo"
            }
        }
        ```

#### 3. POST /api/v1/auth/customer-login

-   **Description:** Endpoint for customer login.
-   **Parameters:**
    -   Body:
        ```json
        {
            "email": "lilstex@gmail.com",
            "password": "password"
        }
        ```
-   **Response:**
    -   Status 200 - Successful login
        ```json
        {
            "status": true,
            "message": "Login successful",
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzE5MzMxNzAzfQ.OqttAVTrzZYgJFbS3a7kiDA139-AvBU9oFFhe7STwZo"
            }
        }
        ```

### Customer Restricted Routes

#### 1. GET /api/v1/customer/vendors

-   **Description:** Retrieve list of vendors.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Query:
        -   page (default: 1)
        -   pageSize (default: 10)
-   **Response:**
    -   Status 200 - Successful retrieval
        ```json
        {
            "status": true,
            "message": "List of vendors retrieved successfully",
            "data": {
                "vendors": [
                    {
                        "id": 1,
                        "email": "resa@gmail.com",
                        "name": "Restaurant A",
                        "description": "Fine dining",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z"
                    },
                    {
                        "id": 2,
                        "email": "resb@gmail.com",
                        "name": "Restaurant B",
                        "description": "Casual dining",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z"
                    },
                    {
                        "id": 3,
                        "email": "resc@gmail.com",
                        "name": "Restaurant C",
                        "description": "Fast food",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z"
                    }
                ],
                "currentPage": 1,
                "pageSize": 10,
                "totalPages": 1,
                "totalItems": 3
            }
        }
        ```

#### 2. GET /api/v1/customer/vendors/{id}

-   **Description:** Retrieve details of a specific vendor.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Path:
        -   id (example: 1)
-   **Response:**
    -   Status 200 - Successful retrieval
        ```json
        {
            "status": true,
            "message": "Vendor retrieved successfully",
            "data": {
                "id": 1,
                "email": "resa@gmail.com",
                "name": "Restaurant A",
                "description": "Fine dining",
                "createdAt": "2024-06-25T19:56:12.000Z",
                "updatedAt": "2024-06-25T19:56:12.000Z"
            }
        }
        ```

#### 3. GET /api/v1/customer/vendors/{id}/menu

-   **Description:** Retrieve menu items of a specific vendor.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Path:
        -   id (example: 1)
    -   Query:
        -   page (default: 1)
        -   pageSize (default: 10)
-   **Response:**
    -   Status 200 - Successful retrieval
        ```json
        {
            "status": true,
            "message": "Menu items retrieved successfully",
            "data": {
                "menu": [
                    {
                        "id": 1,
                        "name": "Pasta",
                        "price": 12.5,
                        "description": "A little pasta",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z",
                        "VendorId": 1,
                        "Vendor": {
                            "id": 1,
                            "email": "resa@gmail.com",
                            "name": "Restaurant A",
                            "description": "Fine dining"
                        }
                    },
                    {
                        "id": 2,
                        "name": "Burger",
                        "price": 8.5,
                        "description": "A little burger",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z",
                        "VendorId": 1,
                        "Vendor": {
                            "id": 1,
                            "email": "resa@gmail.com",
                            "name": "Restaurant A",
                            "description": "Fine dining"
                        }
                    },
                    {
                        "id": 3,
                        "name": "Pizza",
                        "price": 10,
                        "description": "A little pizza",
                        "createdAt": "2024-06-25T19:56:12.000Z",
                        "updatedAt": "2024-06-25T19:56:12.000Z",
                        "VendorId": 1,
                        "Vendor": {
                            "id": 1,
                            "email": "resa@gmail.com",
                            "name": "Restaurant A",
                            "description": "Fine dining"
                        }
                    }
                ],
                "currentPage": 1,
                "pageSize": 10,
                "totalPages": 1,
                "totalItems": 3
            }
        }
        ```

#### 4. GET /api/v1/customer/menu/{menuId}

-   **Description:** Retrieve details of a specific menu item.
-   **Parameters:**

    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Path:

        -   menuId (example: 1)

-   **Response:**
    -   Status 200 - Successful retrieval
        ```json
        {
            "status": true,
            "message": "Menu item retrieved successfully",
            "data": {
                "id": 1,
                "name": "Pasta",
                "price": 12.5,
                "description": "A little pasta",
                "createdAt": "2024-06-25T19:56:12.000Z",
                "updatedAt": "2024-06-25T19:56:12.000Z",
                "VendorId": 1,
                "Vendor": {
                    "id": 1,
                    "email": "resa@gmail.com",
                    "name": "Restaurant A",
                    "description": "Fine dining"
                }
            }
        }
        ```

### Vendor Restricted Routes

#### 1. POST /api/v1/vendor/menu

-   **Description:** Create a new menu item for the vendor.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Body:
        ```json
        {
            "name": "Salad",
            "price": 9,
            "description": "Healthy salad"
        }
        ```
-   **Response:**
    -   Status 201 - Successful creation
        ```json
        {
            "status": true,
            "message": "Menu item created successfully",
            "data": {
                "id": 4,
                "name": "Salad",
                "price": 9,
                "description": "Healthy salad",
                "VendorId": 1,
                "createdAt": "2024-06-25T21:07:35.000Z",
                "updatedAt": "2024-06-25T21:07:35.000Z"
            }
        }
        ```

#### 2. PUT /api/v1/vendor/menu/{menuId}

-   **Description:** Update an existing menu item.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Path:
        -   menuId (example: 4)
    -   Body:
        ```json
        {
            "name": "Salad",
            "price": 9,
            "description": "Healthy salad updated"
        }
        ```
-   **Response:**
    -   Status 200 - Successful update
        ```json
        {
            "status": true,
            "message": "Menu item updated successfully",
            "data": {
                "id": 4,
                "name": "Salad",
                "price": 9,
                "description": "Healthy salad updated",
                "VendorId": 1,
                "createdAt": "2024-06-25T21:07:35.000Z",
                "updatedAt": "2024-06-25T21:10:20.000Z"
            }
        }
        ```

#### 3. DELETE /api/v1/vendor/menu/{menuId}

-   **Description:** Delete a menu item.
-   **Parameters:**
    -   Header:
        ```
        authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIwODQxODB9.60qxpvDKlXV3x4-XDf2GRWgEkuSvL_XuCYPbn5jil-0
        ```
    -   Path:
        -   menuId (example: 4)
-   **Response:**
    -   Status 200 - Successful deletion
        ```json
        {
            "status": true,
            "message": "Menu item deleted successfully"
        }
        ```

## Running Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your database configuration and JWT secret
4. Run the server: `node index.js`
