import { useAuthContext } from '../hooks/useAuthContext'


const Home = () => {
    const { user } = useAuthContext()
   
    return (

        <div className="home">
            {user ?
                //home page when the user is logged in
                <h2>This is a home page when user is logged in.</h2>
                :
                //home page when the user is not logged in
                <h2>This is a home page when user is NOT logged in.</h2>
            }
        </div>
    )
}

export default Home;