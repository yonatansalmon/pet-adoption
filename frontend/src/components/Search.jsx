import { useState, useEffect, useContext } from 'react';
import { Accordion, FormControl, InputGroup, Badge, FloatingLabel, Form } from 'react-bootstrap';
import { Switch } from 'pretty-checkbox-react';
import { Slider, MenuItem, Box, InputLabel, Select, Button, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import FormControlMUI from '@mui/material/FormControl';
import AppContext from '../context/appContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { searchPetApi } from '../api/petsApi';
import axios from 'axios';

import '../App.css';

export default function Search({ setSearchedPets }) {
  const { petList, timeOut } = useContext(AppContext);
  const [petTypes, setPetTypes] = useState([]);
  const [petData, setPetData] = useState({ type: '', name: '', weight: 70, height: 70 });
  const [status, setStatus] = useState({ status: '' });

  useEffect(() => {
    if (petList) {
      let uniquePetTypes = petList.map((pet) => pet.type).filter((pet, index, array) => array.indexOf(pet) === index);
      setPetTypes(uniquePetTypes);
    }
  }, [petList]);

  const handleStatusChange = (e) => {
    setStatus({ status: e.target.value });
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

      const res = await searchPetApi(petToSearch);
      setSearchedPets(res);
      timeOut();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='searchContainer'>
      <div className='accordionContainer'>
        <div className='basicSearchContainer'>
          <FloatingLabel controlId='floatingSelect' label='Pet Type'>
            <Form.Select label='Type' name='type' onChange={handlePetDataChange} defaultValue={'Any'}>
              <option value={'Any'}>Any</option>
              {petTypes &&
                petTypes.length > 0 &&
                petTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </Form.Select>
          </FloatingLabel>
        </div>

        <Accordion>
          <Accordion.Item eventKey='0'>
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
                    <FormControlLabel value='Any' name='any' control={<Radio size='small' />} label='Any' />

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
