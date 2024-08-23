import React from 'react'
import { TextField } from '@mui/material'

function Signup() {
  return (
<>
<div className='border-2 flex flex-col  mx-[20vw] p-2 my-4'>
<h1 className='font-bold'>Signup</h1>
<br/>
<TextField
id="outlined-basic" label="username" variant="outlined" />

<br/>
<TextField
id="outlined-basic" label="email" variant="outlined" />
<br/>
<TextField id="outlined-basic" label="password" variant="outlined" />
</div>
</>
  )
}

export default Signup