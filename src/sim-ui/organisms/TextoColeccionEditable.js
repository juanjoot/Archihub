import { useState, useRef, useEffect } from "react";
import * as React from "react";
import Draft from "draft-js";
//import "./rich.css";

import { makeStyles } from "@material-ui/core/styles";
import FormatBold from "@material-ui/icons/FormatBold";
import FormatItalic from "@material-ui/icons/FormatItalic";
import Divider from "@material-ui/core/Divider";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LinkIcon from "@material-ui/icons/Link";
import SmsIcon from "@material-ui/icons/Sms";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import RedoIcon from "@material-ui/icons/Redo";
import UndoIcon from "@material-ui/icons/Undo";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Button from "@material-ui/core/Button";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LinkInputURL from "./LinkIngresoURL";
import { Link, startegyLink } from "./LinkTextoEditable";
import { PopoverEdit, startegyPopover } from "./PopoverTextoEditable";
import PopoverInput from "./PopoverInput";
import { json } from "d3";
import * as RecordsService from "../../services/RecordsService";


const {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  getDefaultKeyBinding,
  CompositeDecorator,
  convertToRaw,
  convertFromRaw,
} = Draft;
const yourVariable = "algo";
const useStyles = makeStyles((theme) => ({
  root: {},
  bar: {
    maxWidth: "100%",
    position: "relative",
    overflow: "visible",
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.primary.gray,
    minHeight: "40px",
    height: "40px",
    zIndex: 0,
  },
  toolbar: {
    minHeight: "40px",
    height: "40px",
  },
  editor: {
    // maxWidth: 650,
    // margin: "0100",
    fontSize: "1.2em",
    lineHeight: "25pt",
    color: "#333",
    padding: "18.5px 14px",
    [theme.breakpoints.down("sm")]: {
      lineHeight: "20pt",
      fontSize: "1.1em",
    },
    "& blockquote": {
      // position: "relative",
      // // background: "#bfcad9",
      // color: "#333",
      // padding: "12px",
      // paddingLeft: "60px",
      // paddingRight: "60px",
      // borderRadius: "5px",
      margin: '0 auto',
      marginTop: "60px",
      marginBottom: "50px",
      maxWidth: 700,
      // display: "flex",
      [theme.breakpoints.down("sm")]: {
        padding: "25px 15px 25px 15px",
        margin: "0px",
        marginTop: "10px",
        marginBottom: "10px",
      },
    },

    '& > div > div > div > *': {
      backgroundColor: 'white',
      padding: 20
    },
    '& > div > div > div > div > div': {
      maxWidth: 650,
      margin: '0 auto'
    },

    '& > div > div > div > div > h1': {
      padding: 0,
      /* if we can clip, do it */
      '-webkit-text-fill-color': 'transparent',
      '-webkit-background-clip': 'text',

      /* what will show through the text
          ~ or ~
         what will be the background of that element */
      background: 'whatever',

      /* fallback text color
          ~ or ~
         the actual color of text, so it better work on the background */
      color: 'white'
    },

    "& blockquote span span": {
      display: "flex",
      fontWeight: "bold",
      paddingLeft: "40px",
      paddingRight: "30px",
      textAlign: "justify",
      lineHeight: "normal",
      fontStyle: "italic",
    },

    "& blockquote::before": {
      color: "#000000",
      content: "open-quote",
      fontSize: "65px",
      display: "flex",
      fontWeight: "bold",
      alignItems: "start",
      justifyContent: "start",
      height: "auto",
      position: "absolute",
      paddingTop: "2px",
      [theme.breakpoints.down("sm")]: {
        // fontSize: "40px",
        // top: "10px",
        // left: "5px",
      },
    },

    "& blockquote::after": {
      color: "#000000",
      content: "close-quote",
      display: "flex",
      fontSize: "65px",
      alignItems: "end",
      fontWeight: "bold",
      flexDirection: "column",
      // marginTop: "120px",
      [theme.breakpoints.down("sm")]: {
        // fontSize: "40px",
        // bottom: "0px",
        // right: "5px",
      },
    },
    "&  h2 span span, h1 span span ": {
      position: "relative",
      display: "inline-block",
      lineHeight: 'normal'
    },
    "&  h2 span span::before": {
      top: "14px",
      left: "6px",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      position: "absolute",
      backgroundColor: "#65a3f24a",
    },
    '& h1 span span': {
      fontSize: '2em'
    },
    '& h1 span span::before': {
      top: "14px",
      left: "6px",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      position: "absolute",
      backgroundColor: "#65a3f24a",
      fontSize: '2em'
    },

    // "& a.MuiLink-root":{
    //   // color: 'black',
    //   // fontWeight: "bold",
    //   // // backgroundColor: 'red',
    //   // textDecoration: "underline  #f8cfc5 5px;"
    // },
    "& a.MuiLink-underlineHover span": {
      color: "black",
      fontWeight: "bold",
      // backgroundColor: 'red',
      textDecoration: "none !important",
      boxShadow: "inset 0 -10px 0 #fec4cd",
      textDecorationSkipInk: "none",
    },
    "& a.MuiLink-underlineHover:hover": {
      textDecoration: "none !important",
      textDecorationSkipInk: "none",
    },
    "& ul": {
      listStyle: "none",
    },
    "& ul li": {
      display: "flex",
      alignItems: "start",
    },
    "& ul li::before": {
      content: '"•"',
      fontSize: "30px",
      fontWeight: "bold",
      marginRight: "7px",
      color: theme.palette.primary.main,
    },
    "& span[style='font-weight: bold;']": {
      position: 'relative',
      boxShadow: 'inset 0 -10px 0 #fec4cd',
      // background: 
    },
    "& h3": {
      color: theme.palette.primary.main,
    }
  },

  button: {
    color: theme.palette.primary.main,
    height: "34px",
    width: "34px",
    minWidth: "34px",
    borderWidth: "0px",
  },
  tooglebutton: {
    color: theme.palette.primary.main,
    height: "34px",
    width: "34px",
    borderWidth: "0px",
  },
  divider: {
    margin: theme.spacing(2, 0.5),
  },
  dividerButton: {
    width: theme.spacing(1),
  },
}));

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const TextoColeccionEditable = (props) => {
  const { handleChangeTextPiece, value, position, card,piece, piececover, path, placeholder, lectura } =
    props;
  const [filename, setFileName] = useState(null);
  const [formats, setFormats] = useState(() => []);
  const [formatsBlock, setFormatsBlock] = useState("");
  const editorRef = useRef(null);
  // const [classes, setClasses] = useState(() => []);
  const [image, setImage] = useState(null);
  const [recordImage, setRecordImage] = useState(null);

  // const classes = useStyles();

  // useEffect(() => {
  //   loadData();
  // }, [filename]);

  useEffect(() => {
    if (piececover) {
      if ("records" in piececover) {
        if (piececover.records.length > 0) {
          setRecordImage(piececover.records[0])
        }
      }
    } else {
      if (path)
        setFileName(path);
    }
  }, [piececover, path]);

  useEffect(() => {
    if (recordImage)
      loadImagenesResize();
  }, [recordImage]);

  useEffect(() => {
    if (image) {

    }
  }, [image]);

  const loadImagenesResize = async () => {
    try {
      if (recordImage != null) {
        let res = await RecordsService.serviceImageResize(recordImage.idmongo, 'blurcolor');
        if (res) {
          if (res.status !== 500) {
            setImage(res);
          } else
            setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
        }
      } else {

      }
    } catch (error) {
      setImage("/media/cev/pic/logos/LogoCevSpinner.svg");
    }
  };

  //Configuración Link
  const [urlLink, setUrlLink] = useState();
  const [text, setText] = useState();
  const [anchorLinklEl, setAnchorLinklEl] = React.useState(null);
  const [anchorPopoverEl, setAnchorPopoverEl] = React.useState(null);
  const decorator = new CompositeDecorator([
    {
      //Decorator Link
      strategy: startegyLink,
      component: Link,
    },
    {
      //Decorator Popover
      strategy: startegyPopover,
      component: PopoverEdit,
    },
  ]);

  /// Inicio de estado de edición
  let estadoInicial = EditorState.createEmpty(decorator);
  if (value) {
    if (typeof value === "string") {
      try {
        const cleanString = str => str.split('"')[1].replace(/'/g, '"');
        let jsonvalue = JSON.parse(value);
        
        estadoInicial = EditorState.createWithContent(
          convertFromRaw(jsonvalue),
          decorator,
        );
      } catch (e) {
        estadoInicial = EditorState.createWithContent(
          ContentState.createFromText(value),
          decorator,
        );
      }
    } else {
      estadoInicial = EditorState.createWithContent(
        convertFromRaw(value),
        decorator,
      );
    }
  }
  const [editorState, setEditorState] = useState(estadoInicial);

  const onMouseDownToogle = (e) => {
    e.preventDefault();
  };

  // Funciones de comportamiento editor
  const onChange = (editorState) => {
    const estadoActual = convertToRaw(editorState.getCurrentContent());
    handleChangeTextPiece(JSON.stringify(estadoActual), position);
    setEditorState(editorState);
  };

  const focus = () => {
    editorRef.current.focus();
    actualizarAccionesFormatoEnLinea(formats);
    actualizarAccionesFormatoEnBloque();
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
      if (newEditorState !== editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  // Formato de bloque
  const handleFormatBlock = (event, blockType) => {
    setFormatsBlock(blockType);
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
  };

  // Formato de de estilo en linea
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  const handleOptionFormat = (event, format) => {
    toggleInlineStyle(format);
  };

  const actualizarAccionesFormatoEnLinea = () => {
    const currentStyle = editorState.getCurrentInlineStyle();
    let arrStyleFormat = [];
    currentStyle.forEach((styleFormat) => {
      arrStyleFormat.push(styleFormat);
    });
    setFormats(arrStyleFormat);
  };
  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  /// Funciones de Link Personalizadas
  const promptForLink = (e) => {
    e.preventDefault();

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setUrlLink(url);
      setAnchorLinklEl(e.currentTarget);
      setTimeout(() => focus(), 0);
    }
  };

  /// Funciones de Popover Personalizadas
  const promptForPopover = (e) => {
    e.preventDefault();

    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithPopoverAtBeginning = contentState.getBlockForKey(startKey);
      const popoverKey = blockWithPopoverAtBeginning.getEntityAt(startOffset);
      let text = "";
      if (popoverKey) {
        const popoverInstance = contentState.getEntity(popoverKey);
        text = popoverInstance.getData().text;
      }
      setText(text);
      setAnchorPopoverEl(e.currentTarget);
      setTimeout(() => focus(), 0);
    }
  };

  const handleConfirmPrompt = (e, url) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: url },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey,
    );
    onChange(nextEditorState);
    setUrlLink("");
    setAnchorLinklEl(null);
    // setTimeout(() => focus(), 0);
  };

  const handleConfirmPopover = (e, text) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "POPOVER",
      "MUTABLE",
      { text: text },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    let nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    nextEditorState = RichUtils.toggleLink(
      nextEditorState,
      nextEditorState.getSelection(),
      entityKey,
    );
    onChange(nextEditorState);
    setText("");
    setAnchorPopoverEl(null);
    // setTimeout(() => focus(), 0);
  };

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  /// Funciones complementarias
  const handleUndo = () => {
    onChange(EditorState.undo(editorState));
  };

  const handleRedo = () => {
    onChange(EditorState.redo(editorState));
  };

  const useStyles = makeStyles((theme) => ({
    root: {},
    bar: {
      maxWidth: "100%",
      position: "relative",
      overflow: "visible",
      marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.primary.gray,
      minHeight: "40px",
      height: "40px",
      zIndex: 0,
    },
    toolbar: {
      minHeight: "40px",
      height: "40px",
    },
    editor: {
      // maxWidth: 650,
      margin: "0 auto",
      fontSize: "1.2em",
      lineHeight: "25pt",
      color: "#333",
      padding: "18.5px 14px",
      [theme.breakpoints.down("sm")]: {
        lineHeight: "20pt",
        fontSize: "1.1em",
      },
      "& blockquote": {
        // position: "relative",
        // // background: "#bfcad9",
        // color: "#333",
        // padding: "12px",
        // paddingLeft: "60px",
        // paddingRight: "60px",
        // borderRadius: "5px",
        margin: '0 auto',
        background: `url('${image}')`,
        marginTop: "60px",
        marginBottom: "50px",
        maxWidth: 700,
        display: 'flex',
        alignItems: 'center',
        padding: 20,
        borderRadius: 5,
        color: '#555',
        position: 'relative',
        fontWeight: 'normal',

        '&:before': {
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'rgba(255,255,255,.8)',
          content: '""',
          left: 0,
          top: 0,
          padding: 0,
          borderRadius: 5
        },
        '&:after': {
          position: 'absolute',
          content: '"”"',
          right: 0,
          top: 0,
          padding: 0,
          color: 'white',
          fontSize: 200,
          lineHeight: '200px',
          zIndex: 0
        },
        '& > *': {
          position: 'relative',
          zIndex: 1
        },
        // display: "flex",
        [theme.breakpoints.down("sm")]: {
          margin: "0px",
          marginTop: "10px",
          marginBottom: "10px",
        },
      },

      '& > div > div > div > *': {
        backgroundColor: 'white',
        padding: 20
      },
      '& > div > div > div > div > div, & > div > div > div > div > ul, & > div > div > div > div > ol, & > div > div > div > div > a': {
        maxWidth: 650,
        margin: '0 auto'
      },


      '& > div > div > div > div > h1': {
        marginTop: '15vh'
      },

      "& blockquote span span": {
        display: "flex",
        fontWeight: "normal",
        paddingLeft: "40px",
        paddingRight: "30px",
        textAlign: "justify",
        lineHeight: "normal",
        fontStyle: "italic",
      },
      "&  h2 span span, & h3 span span ": {
        position: "relative",
        display: "inline-block",
        lineHeight: 'normal',
        padding: 0,
        /* if we can clip, do it */
        '-webkit-text-fill-color': 'transparent',
        '-webkit-background-clip': 'text',

        /* what will show through the text
            ~ or ~
           what will be the background of that element */
        background: `url('${image}')`,

        /* fallback text color
            ~ or ~
           the actual color of text, so it better work on the background */
        color: 'white'
      },
      '& h1 span span': {
        fontSize: '1.4em',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.2em',
        }
      },

      '& h2 span span': {
        fontSize: '1.8em',
        maxWidth: 'calc(100% - 100px)',
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1.2em',
        }
      },

      '& h3 span span': {
        fontSize: '1.2em',
        maxWidth: 650,
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1em',
        }
      },

      '& h5 span span, & h4 span span': {
        maxWidth: 650,
        display: 'block',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
          fontSize: '1em',
        }
      },

      '& h2 span': {
        textAlign: 'center',
        display: 'block',
      },

      // "& a.MuiLink-root":{
      //   // color: 'black',
      //   // fontWeight: "bold",
      //   // // backgroundColor: 'red',
      //   // textDecoration: "underline  #f8cfc5 5px;"
      // },
      "& a": {
        textDecoration: 'none !important'
      },
      "& a.MuiLink-underlineHover span": {
        color: "#2a5080",
        fontWeight: "bold",
        // backgroundColor: 'red',
        textDecoration: "none !important",
        boxShadow: "inset 0 -10px 0 #c4daf5",
        textDecorationSkipInk: "none",
        transition: 'all 0.25s ease'
      },
      "& a.MuiLink-underlineHover span:hover": {
        textDecoration: "none !important",
        textDecorationSkipInk: "none",
        color: 'white',
        boxShadow: "inset 0 -20px 0 #2a5080",
      },
      "& ul": {
        listStyle: "none",
      },
      "& ul li": {
        display: "flex",
        alignItems: "start",
      },
      "& ul li::before": {
        content: '"•"',
        fontSize: "30px",
        fontWeight: "bold",
        marginRight: "7px",
        color: theme.palette.primary.main,
      },
      "& span[style='font-weight: bold;']": {
        position: 'relative',
        // boxShadow: 'inset 0 -10px 0 #fec4cd',
        color: '#333',
        background: `url('${image}')`,
        '-webkit-text-fill-color': 'transparent',
        '-webkit-background-clip': 'text',
        backgroundSize: 'cover'
        // color: theme.palette.primary.main
      },
      "& h3": {
        color: theme.palette.primary.main,
      }
    },

    button: {
      color: theme.palette.primary.main,
      height: "34px",
      width: "34px",
      minWidth: "34px",
      borderWidth: "0px",
    },
    tooglebutton: {
      color: theme.palette.primary.main,
      height: "34px",
      width: "34px",
      borderWidth: "0px",
    },
    divider: {
      margin: theme.spacing(2, 0.5),
    },
    dividerButton: {
      width: theme.spacing(1),
    },
  }));

  const classes = useStyles()

  return (
    <>
      {lectura ? (
        <>
          <div className={classes.editor}>
            <Editor editorState={editorState} readOnly={true} />
          </div>
        </>
      ) : (
        <>
          <AppBar position="static" className={classes.bar}>
            <Toolbar
              onMouseDown={onMouseDownToogle}
              className={classes.toolbar}
            >
              <ToggleButtonGroup
                size="small"
                value={formats}
                onChange={handleFormat}
                aria-label="text style formatting"
              >
                <ToggleButton
                  value="BOLD"
                  aria-label="bold"
                  className={classes.tooglebutton}
                  onClick={handleOptionFormat}
                >
                  <FormatBold fontSize="small" />
                </ToggleButton>
                <div className={classes.dividerButton} />
                <ToggleButton
                  value="ITALIC"
                  aria-label="italic"
                  className={classes.tooglebutton}
                  onClick={handleOptionFormat}
                >
                  <FormatItalic fontSize="small" />
                </ToggleButton>
                <div className={classes.dividerButton} />
                <ToggleButton
                  value="UNDERLINE"
                  aria-label="underline"
                  className={classes.tooglebutton}
                  onClick={handleOptionFormat}
                >
                  <FormatUnderlinedIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider
                flexItem
                orientation="vertical"
                className={classes.divider}
              />
              <ToggleButtonGroup
                exclusive
                size="small"
                value={formatsBlock}
                onChange={handleFormatBlock}
                aria-label="text block formatting"
              >
                <ToggleButton
                  value="blockquote"
                  aria-label="blockquote"
                  className={classes.tooglebutton}
                >
                  <FormatQuoteIcon fontSize="small" />
                </ToggleButton>
                <div className={classes.dividerButton} />
                <ToggleButton
                  value="unordered-list-item"
                  aria-label="unordered-list-item"
                  className={classes.tooglebutton}
                >
                  <FormatListBulletedIcon fontSize="small" />
                </ToggleButton>
                <div className={classes.dividerButton} />
                <ToggleButton
                  value="ordered-list-item"
                  ordered-list-item
                  aria-label="ordered-list-item"
                  className={classes.tooglebutton}
                >
                  <FormatListNumberedIcon fontSize="small" />
                </ToggleButton>
              </ToggleButtonGroup>

              <Divider
                flexItem
                orientation="vertical"
                className={classes.divider}
              />
              <Button
                variant="outlined"
                className={classes.button}
                onClick={promptForLink}
              >
                <LinkIcon fontSize="small" />
              </Button>

              <div className={classes.dividerButton} />
              <Button
                variant="outlined"
                className={classes.button}
                onClick={removeLink}
              >
                <LinkOffIcon fontSize="small" />
              </Button>

              <Divider
                flexItem
                orientation="vertical"
                className={classes.divider}
              />

              <Button
                variant="outlined"
                className={classes.button}
                onClick={promptForPopover}
              >
                <SmsIcon fontSize="small" />
              </Button>

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

          {anchorLinklEl !== null ? (
            <LinkInputURL
              anchor={anchorLinklEl}
              data={{
                url: urlLink,
              }}
              onConfirm={handleConfirmPrompt}
            />
          ) : null}

          {anchorPopoverEl !== null ? (
            <PopoverInput
              anchor={anchorPopoverEl}
              data={{
                text: text,
              }}
              onConfirm={handleConfirmPopover}
            />
          ) : null}
          <div className={classes.editor} onClick={focus}>
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
        </>
      )}
    </>
  );
};

export default TextoColeccionEditable;
