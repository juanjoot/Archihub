import { useState, useEffect, useRef } from "react"
import { Box } from "@material-ui/core"
import { Controller, Scene } from "react-scrollmagic";

const LazyCard = props => {
    const trigger = useRef();
    const [load,setLoad]=useState(false);
    const loadLazyCard = (progress) =>{
       
    if(progress===1)
       if (!load){            
            setLoad(true)
            props.handlerLoadSection(props.idSection)
        }
    }

    
    return (
        <Box ref={(element) => {
            trigger.current = element;
        }}>

            <Scene
                duration={window.innerHeight}
                classToggle="visible"
                offset={-window.innerHeight / 2}
                triggerElement={trigger.current}
            >
                {(progress, event) => (                    
                    <div>
                        {progress > 0 ?                        
                            <>
                            {props.children}
                            {loadLazyCard(progress)}
                            </>
                            :null
                        }

                    </div>
                )}
            </Scene>

        </Box>
    )

}

export default LazyCard