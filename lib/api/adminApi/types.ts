export type SearchUsersQueryParams = {
  page: number;
  pageSize: number;
  destinationOfficeId?: number;
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