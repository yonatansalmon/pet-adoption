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
  const { petList, token, addPet } = useContext(AppContext);
  const [petTypes, setPetTypes] = useState([]);
  const [petImage, setPetImage] = useState();
  const [petData, setPetData] = useState({
    type: '',
    name: '',
    weight: 70,
    height: 70,
    hypoallergenic: false,
    dietaryRestrictions: false,
    color: '#1d1616',
    breed: '',
  });

  useEffect(() => {
    let uniquePetTypes = petList.map((pet) => pet.type).filter((pet, index, array) => array.indexOf(pet) === index);
    setPetTypes(uniquePetTypes);
  }, []);

  const handleImageUpload = (e) => {
    setPetImage(e.target.files[0]);
  };

  const handlePetDataChange = (e) => {
    setPetData({
      ...petData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('picture', petImage);
    for (let key in petData) {
      formData.append(key, petData[key]);
    }

    try {
      const res = await axios.post('http://localhost:8000/pets/add', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data)

      const { acknowledged, insertedId, picture } = res.data;
      if (acknowledged && insertedId) {
        addPet({ ...petData, picture });
      }
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
        <RadioGroup className='radioContainer' name='controlled-radio-buttons-group' onChange={handlePetDataChange}>
          <FormControlLabel value='any' name='adoptionStatus' control={<Radio size='small' />} label='Any' />

          <FormControlLabel value='available' name='adoptionStatus' control={<Radio size='small' />} label='Available' />
          <FormControlLabel value='fostered' name='adoptionStatus' control={<Radio size='small' />} label='Fostered' />
          <FormControlLabel value='adopted' name='adoptionStatus' control={<Radio size='small' />} label='Adopted' />
        </RadioGroup>
      </div>
      <div>
        <Badge className='badgeLabel addPetBadge'>Hypoallergenic:</Badge>

        <RadioGroup className='radioContainer' name='controlled-radio-buttons-group' onChange={handlePetDataChange}>
          <FormControlLabel value='yes' name='hypoallergenic' control={<Radio size='small' />} label='Yes' />
          <FormControlLabel value='no' name='hypoallergenic' control={<Radio size='small' />} label='No' />
        </RadioGroup>
      </div>
      <div>
        <Badge className='badgeLabel addPetBadge'>Dietary Restrictions:</Badge>

        <RadioGroup className='radioContainer' name='controlled-radio-buttons-group' onChange={handlePetDataChange}>
          <FormControlLabel value='yes' name='dietaryRestrictions' control={<Radio size='small' />} label='Yes' />
          <FormControlLabel value='no' name='dietaryRestrictions' control={<Radio size='small' />} label='No' />
        </RadioGroup>
      </div>
      <div style={{ maxWidth: '50%', display: 'flex', flexDirection: 'column' }}>
        <div className='colorContainer'>
          <Badge className='badgeLabel addPetBadge'>Color:</Badge>

          <input onChange={handlePetDataChange} type='color' id='color' name='color' />
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
        <Badge className='badgeLabel addPetBadge'>Breed:</Badge>

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
      <Button className='addPetBtn' variant='contained' onClick={handleSubmit}>
        Add Pet
      </Button>
    </div>
  );
}
