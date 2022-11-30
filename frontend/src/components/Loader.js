const Loader = ({customText}) => {
    return(
        <>
            <button class="btn btn-dark" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                {customText} 
            </button>
        </>
    )
}

export default Loader