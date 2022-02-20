import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect,useState } from 'react';

export default function MuiSelect({list,returnValue,selected}) {
  const [cat, setCat] = useState('');

  useEffect(() => {returnValue(cat)}, [cat])
  useEffect(() => {setCat(selected)}, [selected])
  return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="MuiSelect-label">Categorie</InputLabel>
        <Select
          labelId="MuiSelect-label"
          id="MuiSelect-standard"
          value={cat}
          onChange={e=>setCat(e.target.value)}
          label="Category"
        >
          <MenuItem className='h-10' value=""></MenuItem>
          {list?.map(item=>{
            return <MenuItem value={item.name}>{item.name}</MenuItem>
          })}
 
        </Select>
      </FormControl>
  );
}
