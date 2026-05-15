import { useState, useRef } from 'react';
import * as React from 'react';
import Draft from "draft-js";
//import "./rich.css";

import { makeStyles } from '@material-ui/core/styles'
import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import Divider from '@material-ui/core/Divider';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LinkIcon from '@material-ui/icons/Link';
import SmsIcon from '@material-ui/icons/Sms';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';

import LinkInputURL from "./LinkIngresoURL"
import  {Link, startegyLink} from "./LinkTextoEditable"
import  {PopoverEdit, startegyPopover} from "./PopoverTextoEditable"

import PopoverInput from './PopoverInput';


const { Editor, EditorState,ContentState, RichUtils, getDefaultKeyBinding, CompositeDecorator ,convertToRaw, convertFromRaw } = Draft;

const useStyles = makeStyles((theme) => ({
  root: {
   
  },
  bar: {
    maxWidth: "100%",  
    position: 'relative',
    overflow: 'visible',
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.gray, 
    minHeight: "40px",
    height: "40px",
    zIndex : 0

  },
  toolbar: {   
    minHeight: "40px",
    height: "40px"
  },
  editor: {  
    padding:"18.5px 14px",
    "& blockquote": {
      background: "#f9f9f9",
      borderLeft: "10px solid #ccc",
      margin: "1.5em 10px",
      padding: "0.5em 10px",
      quotes: '"' 
    } 
  },

  button: {  
    color:  theme.palette.primary.main, 
    height: "34px",
    width: "34px",
    minWidth: "34px",
    borderWidth:"0px"
  },
  tooglebutton: {  
    color:  theme.palette.primary.main, 
    height: "34px",
    width: "34px",
    borderWidth:"0px"
  },
  divider: {
    margin: theme.spacing(2, 0.5),
    
  },
  dividerButton: {
    width: theme.spacing(1),
 
  }
 
 
}));


function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}



const TextoEditable = props => {

  const {handleChangeTextPiece, value, position, card , placeholder, lectura, fragmento} = props;
  const [formats, setFormats] = useState(() => []);
  const [formatsBlock, setFormatsBlock] = useState(''); 
  const editorRef =useRef(null);
  const classes = useStyles();

  //Configuración Link
  const [urlLink, setUrlLink] = useState();
  const [text, setText] = useState();
  const [anchorLinklEl, setAnchorLinklEl] = React.useState(null);
  const [anchorPopoverEl, setAnchorPopoverEl] = React.useState(null);
  const decorator = new CompositeDecorator([
    {//Decorator Link
      strategy: startegyLink,
      component: Link,
    },
    {//Decorator Popover
      strategy: startegyPopover,
      component: PopoverEdit,
    },
  ]);

  /// Inicio de estado de edición 
  let estadoInicial = EditorState.createEmpty(decorator);  
  if (value) {  

    if(typeof value === "string"){
            try {
              let jsonvalue = JSON.parse(value);
              estadoInicial = EditorState.createWithContent(convertFromRaw(jsonvalue), decorator);   ;
          } catch (e) {
            estadoInicial = EditorState.createWithContent(ContentState.createFromText(value), decorator);
          }
     
    }
    else{
      estadoInicial = EditorState.createWithContent(convertFromRaw(value), decorator); 
    }
  }
  const [editorState, setEditorState] = useState(estadoInicial);

  const onMouseDownToogle = e => {
    e.preventDefault();
  };

  // Funciones de comportamiento editor
  const onChange = editorState => {
    if(handleChangeTextPiece){
      const estadoActual =convertToRaw(editorState.getCurrentContent()); 
      handleChangeTextPiece(JSON.stringify(estadoActual), position); 
    }
    setEditorState(editorState);
  };


  const focus = () =>{ 
    editorRef.current.focus()
    actualizarAccionesFormatoEnLinea(formats);
    actualizarAccionesFormatoEnBloque();
  };

  const handleKeyCommand = (command, editorState) =>{
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }
  
  const mapKeyToEditorCommand= (e) =>{
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
       editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }


  // Formato de bloque
  const handleFormatBlock = (event, blockType) => {      
    setFormatsBlock(blockType);   
    console.log("blockType ", blockType)
    toggleBlockType(blockType);
  };  

  const actualizarAccionesFormatoEnBloque = () => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();  
 
      setFormatsBlock(blockType);    
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

 // Formato de de estilo en linea
  const handleFormat = (event, newFormats) => {  
        setFormats(newFormats);
    };
    
  const handleOptionFormat = (event, format) => {    
        toggleInlineStyle(format);
    };

    const actualizarAccionesFormatoEnLinea = () => {
      const currentStyle = editorState.getCurrentInlineStyle();   
      let arrStyleFormat = []
      currentStyle.forEach(styleFormat => {
        arrStyleFormat.push(styleFormat)
      });
      setFormats(arrStyleFormat);    
  };
  const toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
  }


  const  promptForFragmento = (e) =>{
    e.preventDefault();

    const selectionState = editorState.getSelection();
    if (!selectionState.isCollapsed()) {
      const anchorKey = selectionState.getAnchorKey();
      const currentContent = editorState.getCurrentContent();
      const currentContentBlock = currentContent.getBlockForKey(anchorKey);
      const start = selectionState.getStartOffset();
      const end = selectionState.getEndOffset();
      const selectedText = currentContentBlock.getText().slice(start, end);
      console.log(selectedText)
    }

  /*
    const selection = editorState.getSelection();
    console.log(selection)
    if (!selection.isCollapsed()) {
      //const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      console.log(startKey)
      const startOffset = editorState.getSelection().getStartOffset();
      console.log(startOffset)
     // const blockAtBeginning = contentState.getBlockForKey(startKey);
     // const extract = blockAtBeginning.getEntityAt(startOffset);
      //console.log(extract)
    }*/
  }

  /// Funciones de Link Personalizadas  
  const promptForLink = (e) =>{
    e.preventDefault();
   
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setUrlLink(url);    
      setAnchorLinklEl(e.currentTarget);     
      setTimeout(() => focus(), 0);     
    }
  }

  /// Funciones de Popover Personalizadas  
  const promptForPopover = (e) =>{
    e.preventDefault();
   
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithPopoverAtBeginning = contentState.getBlockForKey(startKey);
      const popoverKey = blockWithPopoverAtBeginning.getEntityAt(startOffset);
      let text = '';
      if (popoverKey) {
        const popoverInstance = contentState.getEntity(popoverKey);
        text = popoverInstance.getData().text;
      }
      setText(text);
      setAnchorPopoverEl(e.currentTarget);
      setTimeout(() => focus(), 0);
    }
  }

  const handleConfirmPrompt = (e, url) => {
    e.preventDefault();   
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: url}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey(); 
    let nextEditorState = EditorState.set(editorState, 
      { currentContent: contentStateWithEntity }
    );
    nextEditorState = RichUtils.toggleLink( nextEditorState, 
      nextEditorState.getSelection(), entityKey 
    );    
    onChange(nextEditorState);
    setUrlLink("");
    setAnchorLinklEl(null);
   // setTimeout(() => focus(), 0);
    
  }

  const handleConfirmPopover = (e, text) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'POPOVER',
      'MUTABLE',
      {text: text}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let nextEditorState = EditorState.set(editorState, 
      { currentContent: contentStateWithEntity }
    );
    nextEditorState = RichUtils.toggleLink( nextEditorState,
      nextEditorState.getSelection(), entityKey 
    );
    onChange(nextEditorState);
    setText("");
    setAnchorPopoverEl(null);
   // setTimeout(() => focus(), 0);
    
  }

   const removeLink = (e) => {
    e.preventDefault();    
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));   
    }
  }

/// Funciones complementarias  
  const handleUndo = () => {
    onChange(EditorState.undo(editorState))
  }

  const handleRedo = () => {
    onChange(EditorState.redo(editorState))
  }


    return (
      <>
        {lectura?
        <>  <div  className={classes.editor}>
            <Editor
                editorState={editorState}
                readOnly ={true}
            />
           </div>
       </>:
         <>
         <AppBar position="static"   className={classes.bar}  >
        <Toolbar  onMouseDown={onMouseDownToogle}  className={classes.toolbar} >  
       
        {fragmento?
          <Button           
            variant="outlined"
            className={classes.button} 
            onClick={promptForFragmento}
            > 
            <DescriptionTwoToneIcon  fontSize="small" />
          </Button>
          :
          <>
            <Divider flexItem orientation="vertical" className={classes.divider} />  
          <ToggleButtonGroup  size="small" value={formats} onChange={handleFormat} aria-label="text style formatting">
            <ToggleButton value="BOLD" aria-label="bold" className={classes.tooglebutton}  onClick={handleOptionFormat} >
              <FormatBold  fontSize="small" />
            </ToggleButton> 
            <div  className={classes.dividerButton} />   
            <ToggleButton value="ITALIC" aria-label="italic" className={classes.tooglebutton}  onClick={handleOptionFormat} >
              <FormatItalic   fontSize="small" />
            </ToggleButton>
            <div  className={classes.dividerButton} />   
            <ToggleButton value="UNDERLINE" aria-label="underline" className={classes.tooglebutton}  onClick={handleOptionFormat} >
              <FormatUnderlinedIcon  fontSize="small" />
            </ToggleButton>
            </ToggleButtonGroup>  

            <Divider flexItem orientation="vertical" className={classes.divider} />  
            <ToggleButtonGroup exclusive size="small" value={formatsBlock} onChange={handleFormatBlock} aria-label="text block formatting">
              <ToggleButton value="blockquote" aria-label="blockquote" className={classes.tooglebutton}  >
                <FormatQuoteIcon  fontSize="small" />
              </ToggleButton> 
              <div  className={classes.dividerButton} />    
              <ToggleButton value="unordered-list-item" aria-label="unordered-list-item" className={classes.tooglebutton}  >
                <FormatListBulletedIcon  fontSize="small" />
              </ToggleButton>  
              <div  className={classes.dividerButton} />    
              <ToggleButton value="ordered-list-item"ordered-list-item aria-label="ordered-list-item" className={classes.tooglebutton}  >
                <FormatListNumberedIcon  fontSize="small" />
              </ToggleButton>   
            </ToggleButtonGroup>  

            <Divider flexItem orientation="vertical" className={classes.divider} />  
            <Button           
              variant="outlined"
              className={classes.button} 
              onClick={promptForLink}
              > 
              <LinkIcon  fontSize="small" />
            </Button>

            <div  className={classes.dividerButton} />   
            <Button           
              variant="outlined"
              className={classes.button} 
              onClick={removeLink}
              > 
              <LinkOffIcon  fontSize="small" />
            </Button>

            <Divider flexItem orientation="vertical" className={classes.divider} />

            <Button
              variant="outlined"
              className={classes.button} 
              onClick={promptForPopover}
              > 
              <SmsIcon fontSize="small" />
            </Button>
          </>
        }

          {/*<Divider flexItem orientation="vertical" className={classes.divider} />            
          <Button           
            variant="outlined"
            className={classes.button} 
            onClick={() => { handleUndo()}}
            > 
           <UndoIcon  fontSize="small" />
          </Button>
          <div  className={classes.dividerButton} />   
          <Button
             variant="outlined"
             className={classes.button} 
            onClick={() => {handleRedo() }}
          >
            <RedoIcon  fontSize="small" />
        </Button>*/}
        </Toolbar>
  
    </AppBar>
       
    {anchorLinklEl !== null?
                    <LinkInputURL
                       anchor={anchorLinklEl}
                        data={{
                          url: urlLink
                         }}                    
                        onConfirm={handleConfirmPrompt}
                    />
          : null}

    {anchorPopoverEl !== null?
                    <PopoverInput
                       anchor={anchorPopoverEl}
                        data={{
                          text: text
                         }}
                        onConfirm={handleConfirmPopover}
                    />
          : null}
        <div  className={classes.editor} onClick={focus}>
          <Editor
            //blockStyleFn={getBlockStyle}
            //customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onChange={onChange}
            placeholder={placeholder}
            ref={editorRef}
           // spellCheck={true}
          />
        </div>
        </>}    
      </>
    );
  
}

export default TextoEditable