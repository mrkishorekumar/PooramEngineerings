export interface Root {
    _id: string
    from: From
    to: To
    items: Item[]
    isDeleted: boolean
    dcNo: number
    createdAt: string
    __v: number
  }
  
  export interface From {
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
    _id: string
  }
  