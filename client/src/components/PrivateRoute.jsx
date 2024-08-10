import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
    const currentUser = useSelector(state => state.user)
  return (
    <div>
        {currentUser.user ? <Outlet/> : <Navigate to='/signin'/>}
    </div>
  
  )
}

export default PrivateRoute