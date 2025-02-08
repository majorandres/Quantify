import React from 'react'
// import 'bootstrap/dist/css/bootstrap'

function Login(){
    return(
        <div>
           <div>
            <form action = "">
              <div>
                <label htmlName = "userName"> User </label>
                <input type = "userName" placeholder='Enter User'/>
               
              </div>

              <div>
                <label htmlName = "password"> Password </label>
                <input type = "password" placeholder='Enter User'/>
               
              </div>
                <button>Login</button>
            </form>
           </div>
        </div>

    )
}

export default Login