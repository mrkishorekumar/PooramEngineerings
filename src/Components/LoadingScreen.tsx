import { memo } from 'react'

function LoadingScreen() {
    return (
        <div style={{ height: "90vh" }} className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default memo(LoadingScreen)