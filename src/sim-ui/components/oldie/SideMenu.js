import Informe from './Iconos/Informe'
import Nube from './Iconos/Nube'
import Casos from './Iconos/Casos'
import Grafo from './Iconos/Grafo'

import MenuIcon from './MenuIcon'

const SideMenu = () => {
    return(
        <>
            <nav className="sideMenu">
                <MenuIcon title="Patrones de texto">
                    <Informe/>
                </MenuIcon>
                <MenuIcon title="Nube de entidades">
                    <Nube/>
                </MenuIcon>
                <MenuIcon title="Resultados">
                    <Casos/>
                </MenuIcon>
            </nav>
        </>
    )
}

export default SideMenu