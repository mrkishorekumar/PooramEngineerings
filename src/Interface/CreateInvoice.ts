export interface IBill {
    itemNo: string,
    name: string,
    quantity: number,
    price: number,
    total: number
  }

export interface ICreateInvoice {
    to : string,
    subTotal : number,
    sgstRate : number,
    cgstRate : number,
    igstRate : number,
    total : number
  }