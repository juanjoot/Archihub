const Card = props => {
    return(
        <>
            <div className={`cardUi ${props.class}`}>
                {props.children}
            </div>
        </>
    )
}

export default Card