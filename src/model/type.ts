export interface CustomerModel {
    custID: string;
    custTitle: string;
    custName: string;
    custAddress: string;
    city: string;
    province: string;
    postalCode: string;
    dob: Date;
    salary: number;
}

export interface ItemModel{
    itemCode: string;
    description: string;
    unitPrice: number;
    qtyOnHand: number;
    packSize: string;

}