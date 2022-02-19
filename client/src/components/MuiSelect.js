import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants({list,returnValue}) {
  const [cat, setCat] = React.useState('');

  const handleChange = (event) => {
    setCat(event.target.value);
    
  };
React.useEffect(() => {
  returnValue(cat)
}, [cat])

  return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Categorie</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={cat}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem className='h-10' value="">
          </MenuItem>
          {list?.map(item=>{
            return <MenuItem value={item.name}>{item.name}</MenuItem>
          })}
 
        </Select>
      </FormControl>
  );
}
