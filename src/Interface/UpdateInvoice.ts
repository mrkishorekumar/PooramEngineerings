import { ICompanyList } from '../Pages/CompanyList'


export interface Root {
    _id: string
    from: ICompanyList
    to: To
    items: Item[]
    subTotal: number
    sgstRate: number
    cgstRate: number
    igstRate: number
    total: number
    isDeleted: boolean
    invoiceNo: number
    createdAt: string
    __v: number
}

export interface To {
    _id: string
    name: string
    gstin: string
    addressLine1: string
    city: string
    state: string
    pincode: string
    default: boolean
    __v: number
}

export interface Item {
    itemNo: string
    name: string
    quantity: number
    price: number
    total: number
    _id: string
}
