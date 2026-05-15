const MenuIcon = props => {
    return(
        <>
            <div className="item">
                <div className="icon">
                    {props.children}
                </div>
                <div className="tooltipUi">
                    {props.title}
                </div>
            </div>
        </>
    )
}

export default MenuIcon