export interface LoginResponse {
	token: string;
	user: {
	  id: string;
	  email: string;
	  firstName: string;
	  lastName: string;
	};
  }
  
  export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
  }

  
export interface UserUpdateData {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
  }