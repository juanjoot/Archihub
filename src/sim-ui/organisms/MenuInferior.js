import { useState, useEffect, createElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import * as MenusService from "../../services/MenusService";
import { Link, useLocation } from 'react-router-dom';
import * as Icons from '@material-ui/icons';
import { col_explora, col_crea, col_conoce } from './HomeDesktop';

const colors = {
  crea: col_crea.main,
  explora: col_explora.main,
  conoce: col_conoce.main,
}

const useStyles = makeStyles({
  stickToBottom: {
    height: '72px',
    maxHeight: '72px',    
    width: '100%',
    position: 'fixed',
    bottom: 0,
    backgroundColor: '#2A5080',
    zIndex: 999
  },
  labelMenu: {
    borderBottom: 'none',
    '& span': {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: 'uppercase',
      fontSize: '14px',
      marginTop: '5px',
      letterSpacing: '1px',
      color: '#AAB9CC',
      fontWeight: 500
    }
  },
  labelMenuSelected: {
    borderBottom: '2px solid',
    '& span': {
      fontFamily: "'Montserrat', sans-serif",
      textTransform: 'uppercase',
      fontSize: '14px',
      marginTop: '5px',
      letterSpacing: '1px',
      color: '#FFFFFF',
      fontWeight: 500
    }
  },
  svgIcon: {
    width: '30px',
    height: '30px'
  }
});

const Icon = ({ name }) => {
  const classes = useStyles();
  return(
    <svg className = {classes.svgIcon} >
      <use xlinkHref={`/media/cev/icons/icons.svg#${name}`}></use>
    </svg>
  )
}

const MenuInferior = props => {
  const classes = useStyles();
  const [elements, setElements] = useState([]);
  const location = useLocation();

  useEffect(() => {
    loadItems(props.section);
  }, []);

  const loadItems = async (section) => {
    let res = await MenusService.getBySection(section);
    if (res.elements) {
      setElements(res.elements);
    }
  };

  const MakeIcon = (item) => {
    if (item.img !== '')
      return <Icon name={item.img} />
    else if (item.material_icon)
      return createElement(Icons[item.material_icon], { style: { fontSize: '30', padding: '3px' }, className: item.clases });
  }

  const renderItems = elements.map((item, i) => (
    <BottomNavigationAction 
      key={i}
      className = {`${location.pathname.includes(item.tag.toLowerCase()) ? classes.labelMenuSelected: classes.labelMenu}`}  
      style={{borderColor: colors[item.tag.toLowerCase()]}}
      label={item.tag.toLowerCase()} 
      component={Link} 
      target={item.tab ? "_blank" : ""} 
      icon={MakeIcon(item)} 
      to={item.route} value={item.tag} 
    />
  ));

  return (
    <BottomNavigation
      value={props.section}
      showLabels
      className={classes.stickToBottom}
    >
      {renderItems}
    </BottomNavigation>
  );
}

export default MenuInferior