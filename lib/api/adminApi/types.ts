import officeTypes from "@/shared/types/branch-office/office-types";

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

export type UpdateBranchOfficeBody ={
  officeId: number;
  name?: string;
  address?: string;
  officeType?: officeTypes;
  isAvailable?: boolean;
  servingCanteenId?: number;
}

export type GetOfficeFullInfoListParams = {
  page: number;
  pageSize: number;
  sortOrder?: string;
  orderBy?: string ;
};

export type CreateBranchOfficeBody ={
  name: string;
  address: string;
  officeType: officeTypes;
  isAvailable: boolean;
  servingCanteenId?: number;
}