import MuiLink from '@material-ui/core/Link'
import {  makeStyles } from '@material-ui/core/styles'


export const  startegyLink = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }

export  const Link = (props) => {
    const { url, className } = props.contentState.getEntity(props.entityKey).getData()
    const goToLink= (e) =>{
      window.open(url, "_blank");
  }
    return (
        <MuiLink
            href={url}         
            // target="_blank"       
            style={{color: '#2876d9'}}
            // onClick={goToLink}
        >
            {props.children}
        </MuiLink>
    )
}


