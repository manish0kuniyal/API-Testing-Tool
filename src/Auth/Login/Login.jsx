import React from 'react'
import { TextField } from '@mui/material'

function Login() {
  return (
<>
<div className='border-2 flex flex-col  mx-[20vw] p-2 my-4'>
<h1 className='font-bold'>Login</h1>
<br/>
<TextField
id="outlined-basic" label="username" variant="outlined" />
<br/>
<TextField id="outlined-basic" label="password" variant="outlined" />
</div>
</>
  )
}

export default Login