import { memo } from 'react'
import CreateInvoice from './CreateInvoice'


function DummyInvoice() {

    return <CreateInvoice flag={true} />
}

export default memo(DummyInvoice)