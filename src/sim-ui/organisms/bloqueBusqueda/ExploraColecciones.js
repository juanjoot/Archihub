import { useParams } from "react-router-dom"
import MainLayout from "../../layout/MainLayout"
import Busqueda from "./Busqueda"

const ExploraColecciones= props => {
  const { id } = useParams()

  return (
    <MainLayout>
      <Busqueda place="colecciones" collectionId={id} />
    </MainLayout>
  )
}

export default ExploraColecciones