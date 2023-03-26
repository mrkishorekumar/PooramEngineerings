import { memo } from 'react'

function ToAddress() {
    return (
        <div>
            <h3>To</h3>
            <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
            <input required className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
            <div className="input-group mt-3">
                <span className="input-group-text" id="basic-addon1">GST</span>
                <input required type="number" className="form-control" placeholder="GST Number" />
            </div>
            <datalist id="datalistOptions">
                <option value="San Francisco" />
                <option value="New York" />
                <option value="Seattle" />
                <option value="Los Angeles" />
                <option value="Chicago" />
            </datalist>
        </div>
    )
}

export default memo(ToAddress)