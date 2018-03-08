
# chat21-support-dashboard


## Features

- Angular 5.0
- Firebase Auth
- Firebase Database CRUD (Firestore & Realtime DB)
- MongoDB CRUD

## Prerequisite

For Firebase Auth and Firebase Database: create an account at https://firebase.google.com/
For MongoDB CRUD: install and running chat21-api-nodejs (https://github.com/chat21/chat21-api-nodejs)

- `git clone https://github.com/chat21/chat21-support-dashboard.git`
- `cd chat21-support-dashboard`
- `npm install`

Edit the environment.ts file and create the enviroment.prod.ts in `src/environments/`.

#### environment.ts
```typescript
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: 'APIKEY',
        authDomain: 'PROJECT-ID.firebaseapp.com',
        databaseURL: 'https://PROJECT-ID.firebaseio.com',
        projectId: 'PROJECT-ID',
        storageBucket: 'PROJECT-ID.appspot.com',
        messagingSenderId: '123456789'
    },
    mongoDbConfig: {
        MONGODB_CONTACTS_BASE_URL: 'http://localhost:3000/app1/contacts/',
        MONGODB_DEPARTMENTS_BASE_URL: 'http://localhost:3000/app1/departments/',
        MONGODB_FAQ_BASE_URL: 'http://localhost:3000/app1/faq/',
        TOKEN: 'JWT_TOKEN'
    },
};
```
#### environment.prod.ts
```typescript
export const environment = {
    production: true,
    firebaseConfig: {
        // same as above, or use a different firebase project to isolate environments
    },
     mongoDbConfig: {
        // same as above
    },
};
```

And finally `ng serve`
