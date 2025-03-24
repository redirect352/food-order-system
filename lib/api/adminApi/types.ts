export type SearchUsersQueryParams = {
  page: number;
  pageSize: number;
  destinationOfficeId?: number;
  s?:string;
  active?: boolean;
  sortOrder?: string;
  orderBy?: string ;
};

export type UpdateUserQueryParams = {
  id: number,
  body: UpdateUserBody,
};
export type UpdateUserBody = {
  login?: string;
  email?: string;
  role?: string;
  emailConfirmed?: boolean;
  active?: boolean;
  officeId?: number;
}
export type UpdateUserPasswordParams = {
  id:number,
  body:{
    newPassword:string,
  }
}