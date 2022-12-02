import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();








// import React, {useState} from 'react'
// import { Tab, Tabs, TabPanel, Box, TabContext, TabList} from '@mui/material';


// function SignInOutContainer() {
//     const [value, setValue] = useState(0)
//     const handleChange = ((e, newValue) => setValue(newValue))
//     return ( 
//         <Box sx={{ width: '100%' }}>
//             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                 <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                 <Tab label="Item One" index={0} />
//                 <Tab label="Item Two" index={1} />
//                 </Tabs>
//             </Box>
//             <TabPanel value={value} index={0}>
//             Item One
//             </TabPanel>
//             <TabPanel value={value} index={1}>
//             Item Two
//             </TabPanel>
//         </Box>

//     )
// }

// export default SignInOutContainer;
