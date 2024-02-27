import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private loggesinUser! : User; 
  constructor() { }

 private users = [
      {
        userId: 1,
        name: 'learner@geeks4learning.com',
        surname: '',
        role: 'Learner',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      {
        userId: 2,
        name: 'admin@geeks4learning.com',
        surname: '',
        role: 'Admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
      // Add more mock users as needed
    ];
   
    setLoggedIn(username : string)
    {
     const dummy = this.getUserByUsername(username);
     if(dummy)
         {
          const newUser : User = {
            userId: dummy.userId,
            name: dummy.name,
            surname: dummy.surname,
            role: dummy.role,
            token: dummy.token
          };

         this.loggesinUser = newUser;
         }

         return this.loggesinUser;
        
    }

    getLoggedIn(){
      return this.loggesinUser;
    }

    getUsers() {
      return this.users;
    }
  
    getUserById(userId: number) {
      return this.users.find((user) => user.userId === userId);
    }

    getUserByUsername(name: String) {
        return this.users.find((user) => user.name === name);
      }

  
}

export interface User{

  userId: number,
  name : string,
  surname : string,
  role : string,
  token : string
}
