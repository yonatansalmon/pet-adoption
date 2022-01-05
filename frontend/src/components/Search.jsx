import { useState, useEffect, useContext } from 'react';
import { Accordion, FormControl, InputGroup, Badge } from 'react-bootstrap';
import { Switch } from 'pretty-checkbox-react';
import { Slider, MenuItem, Box, InputLabel, Select, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import FormControlMUI from '@mui/material/FormControl';
import AppContext from '../context/appContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

import axios from 'axios';

import '../App.css';

export default function Search({setSearchedPets}) {
  const { petList } = useContext(AppContext);
  const [petTypes, setPetTypes] = useState([]);
  const [petData, setPetData] = useState({ type: '', name: '', weight: 70, height: 70 });
  const [status, setStatus] = useState({ status:'' });

  useEffect(() => {
    let uniquePetTypes = petList.map((pet) => pet.type).filter((pet, index, array) => array.indexOf(pet) === index);
    setPetTypes(uniquePetTypes);
  }, []);

  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setStatus({status:e.target.value});
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
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setSearchedPets(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='searchContainer'>
      <div className='accordionContainer'>
      <Accordion >
          <Accordion.Item eventKey='0'>
            <Accordion.Header>Basic Search</Accordion.Header>
            <Accordion.Body className='accordionBody'>
              <Box sx={{ maxWidth: 120 }}>
                <FormControlMUI fullWidth>
                  <Badge className='badgeLabel'>Pet Type:</Badge>
                  <MenuItem value={'Any'}></MenuItem>
                  <Select label='Type' name='type' onChange={handlePetDataChange} defaultValue={'Any'}>
                  <MenuItem value={'Any'}>
                    Any
                          
                        </MenuItem>
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
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
          <Accordion.Header>Advanced Search</Accordion.Header>
            <Accordion.Body>
              <>
                <Badge className='badgeLabel'>Pet Name:</Badge>

                <InputGroup className='my-3 ms-1'>
                  <FormControl
                    placeholder='Pet Name'
                    aria-label='petName'
                    aria-describedby='basic-addon1'
                    name='name'
                    onChange={handlePetDataChange}
                  />
                </InputGroup>

                <Badge className='badgeLabel'>Adoption Status:</Badge>
                <div>
                  <RadioGroup
                    className='radioContainer'
                    aria-label='gender'
                    name='controlled-radio-buttons-group'
                    value={petTypes.status}
                    onChange={handleStatusChange}
                  >
                    <FormControlLabel value='Available' name='available' control={<Radio size='small' />} label='Available' />
                    <FormControlLabel value='Fostered' name='fostered' control={<Radio size='small' />} label='Fostered' />
                    <FormControlLabel value='Adopted' name='adopted' control={<Radio size='small' />} label='Adopted' />
                  </RadioGroup>
                </div>
                <div style={{ maxWidth: '50%', display: 'flex', flexDirection: 'column' }}>
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
                </div>
              </>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      <Button className='searchBtn' variant='contained' onClick={handleSubmit}>
        Search
      </Button>
    </div>
  );
}

