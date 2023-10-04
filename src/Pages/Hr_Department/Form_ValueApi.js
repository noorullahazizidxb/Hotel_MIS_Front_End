import React, { createContext, useState } from 'react'
export const Form_ValueApi = createContext()

const Form_ValueApiProvider = (props) => {
    const [val, setVal] = useState(null)
    return (
         <Form_ValueApi.Provider 
            value={{
                val,
                setVal
             }}>
               {props.children}
         </Form_ValueApi.Provider>
    )
}
export default Form_ValueApiProvider;