import { useState, useEffect, useContext } from 'react';
import { Accordion, FormControl, InputGroup, Badge } from 'react-bootstrap';
import { Switch } from 'pretty-checkbox-react';
import { Slider, MenuItem, Box, InputLabel, Select, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import FormControlMUI from '@mui/material/FormControl';
import AppContext from '../context/appContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import axios from 'axios';

import '../App.css';

export default function AddPet({ setSearchedPets }) {
  const { petList } = useContext(AppContext);
  const [petTypes, setPetTypes] = useState([]);
  const [petData, setPetData] = useState({ type: '', name: '', weight: 70, height: 70 });
  const [status, setStatus] = useState({ status: '' });
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    let uniquePetTypes = petList.map((pet) => pet.type).filter((pet, index, array) => array.indexOf(pet) === index);
    setPetTypes(uniquePetTypes);
  }, []);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setStatus({ status: e.target.value });
  };

  const handleImageUpload = (e) => {
    console.log(e.target.files)
     setSelectedFile(e.target.files[0]);
   };

  const handlePetDataChange = (e) => {
    e.preventDefault();

    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const petToSearch = { ...petData, ...status };
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      console.log(petToSearch);

      const res = await axios.get(
        `http://localhost:8000/pets?type=${petToSearch.type}&name=${petToSearch.name}&weight=${petToSearch.weight}&height=${petToSearch.height}&adoptionStatus=${petToSearch.status}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchedPets(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='addPetContainer'>
      <Box sx={{ maxWidth: 120 }}>
        <FormControlMUI fullWidth>
          <Badge className='badgeLabel addPetBadge'>Pet Type:</Badge>
          <MenuItem value={'Any'}></MenuItem>
          <Select label='Type' name='type' onChange={handlePetDataChange} defaultValue={'Any'}>
            <MenuItem value={'Any'}>Any</MenuItem>
            {petTypes &&
              petTypes.length > 0 &&
              petTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
          </Select>
        </FormControlMUI>
      </Box>

      <Badge className='badgeLabel addPetBadge'>Pet Name:</Badge>

      <InputGroup className='petNameInputContainer' className=' petNameInputContainer my-3 ms-1'>
        <FormControl
          placeholder='Pet Name'
          aria-label='petName'
          aria-describedby='basic-addon1'
          name='name'
          className='petNameInput'
          onChange={handlePetDataChange}
        />
      </InputGroup>

      <Badge className='badgeLabel addPetBadge'>Adoption Status:</Badge>
      <div>
        <RadioGroup
          className='radioContainer'
          aria-label='gender'
          name='controlled-radio-buttons-group'
          value={petTypes.status}
          onChange={handleStatusChange}
        >
          <FormControlLabel value='Any' name='any' control={<Radio size='small' />} label='Any' />

          <FormControlLabel value='Available' name='available' control={<Radio size='small' />} label='Available' />
          <FormControlLabel value='Fostered' name='fostered' control={<Radio size='small' />} label='Fostered' />
          <FormControlLabel value='Adopted' name='adopted' control={<Radio size='small' />} label='Adopted' />
        </RadioGroup>
      </div>
      <div>
        <Badge className='badgeLabel addPetBadge'>Hypoallergenic: </Badge>

        <RadioGroup
          className='radioContainer'
          aria-label='gender'
          name='controlled-radio-buttons-group'
          value={petTypes.status}
          onChange={handleStatusChange}
        >
          <FormControlLabel value='Any' name='any' control={<Radio size='small' />} label='Any' />

          <FormControlLabel value='Available' name='available' control={<Radio size='small' />} label='Available' />
          <FormControlLabel value='Adopted' name='adopted' control={<Radio size='small' />} label='Adopted' />
        </RadioGroup>
      </div>
      <div>
        <Badge className='badgeLabel addPetBadge'>Dietary Restrictions</Badge>

        <RadioGroup
          className='radioContainer'
          aria-label='gender'
          name='controlled-radio-buttons-group'
          value={petTypes.status}
          onChange={handleStatusChange}
        >
          <FormControlLabel value='Any' name='any' control={<Radio size='small' />} label='Any' />

          <FormControlLabel value='Available' name='available' control={<Radio size='small' />} label='Available' />
          <FormControlLabel value='Adopted' name='adopted' control={<Radio size='small' />} label='Adopted' />
        </RadioGroup>
      </div>
      <div style={{ maxWidth: '50%', display: 'flex', flexDirection: 'column' }}>
        <div>
          <label htmlFor='color'>Color</label>
          <input type='color' id='color' name='color' />
        </div>
        <Badge className='badgeLabel'>Height:</Badge>

        <Slider
          size='small'
          defaultValue={70}
          value={petData.weight}
          onChange={handlePetDataChange}
          aria-label='Small'
          valueLabelDisplay='auto'
          className='slider'
          name='weight'
        />
        <Badge className='badgeLabel'>Weight:</Badge>

        <Slider
          size='small'
          defaultValue={70}
          value={petData.height}
          onChange={handlePetDataChange}
          aria-label='Small'
          valueLabelDisplay='auto'
          className='slider'
          name='height'
        />
        <Badge className='badgeLabel addPetBadge'>Pet Name:</Badge>

        <InputGroup className='breedInputContainer' className=' breedInputContainer my-3 ms-1'>
          <FormControl
            placeholder='Breed'
            aria-label='breed'
            aria-describedby='basic-addon1'
            name='breed'
            className='breed'
            onChange={handlePetDataChange}
          />
        </InputGroup>
      </div>

      <input onChange={handleImageUpload} type='file' accept='image/png, image/gif, image/jpeg' name='file' id='file'></input>
      <Button className='searchBtn' variant='contained' onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
}
