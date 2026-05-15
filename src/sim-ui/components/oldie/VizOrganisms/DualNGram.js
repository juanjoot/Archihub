import NGram from './NGram'

const DualNGram = props => {
    return(
        <>
            <div className="dual">
                <NGram location={props.location}/>
                <NGram location={props.location}/>
            </div>
        </>
    )
}

export default DualNGram