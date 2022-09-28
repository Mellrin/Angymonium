export interface userItem {
    email: string,
    password: string,
    permissions?: any,
    registrationDate: Date,
    role: { _id: string, title: string },
    username: string,
    _id: string
  }